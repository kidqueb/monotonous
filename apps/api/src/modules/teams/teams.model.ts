import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/lib/base_model';
import { Invite } from '../invites/invites.model';
import { Project } from '../projects/projects.model';
import { TeamMembership } from '../team_memberships/team_memberships.model';

@ObjectType()
export class Team extends BaseModel {
  name: string;
  memberships?: TeamMembership[];
  projects?: Project[];
  invites?: Invite[];
}
