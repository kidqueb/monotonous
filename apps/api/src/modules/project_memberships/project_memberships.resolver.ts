import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberRoles } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CurrentUser } from '../auth/current_user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../users/users.model';
import { AddMemberToProjectInput } from './project_memberships.dto';
import { ProjectMembership } from './project_memberships.model';

@Resolver(of => ProjectMembership)
export class ProjectMembershipsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(returns => ProjectMembership)
  @UseGuards(JwtAuthGuard)
  async addMemberToProject(
    @CurrentUser() user: User,
    @Args('input') input: AddMemberToProjectInput,
  ) {
    const membership = await this.prisma.teamMembership.findUnique({
      where: { id: input.teamMembershipId },
    });

    if (!membership) {
      throw new BadRequestException('Team membership doesnt exist');
    }

    const admin = await this.prisma.teamMembership.findFirst({
      where: {
        role: MemberRoles.ADMIN,
        userId: user.id,
        teamId: membership.teamId,
      },
    });

    if (!admin) {
      throw new ForbiddenException();
    }

    return this.prisma.projectMembership.create({
      data: {
        projectId: input.projectId,
        membershipId: membership.id,
        role: MemberRoles.MEMBER,
      },
    });
  }

  @Mutation(returns => ProjectMembership)
  @UseGuards(JwtAuthGuard)
  async removeMemberFromProject(
    @CurrentUser() user: User,
    @Args('projectMembershipId') projectMembershipId: string,
  ) {
    const admin = await this.prisma.teamMembership.findFirst({
      where: {
        role: MemberRoles.ADMIN,
        userId: user.id,
      },
    });

    if (!admin) {
      throw new ForbiddenException();
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: { id: projectMembershipId },
    });

    if (!membership) {
      throw new NotFoundException();
    }

    return this.prisma.projectMembership.delete({
      where: { id: projectMembershipId },
    });
  }
}
