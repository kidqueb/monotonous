import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};


export type Invite = {
  __typename: 'Invite';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  project?: Maybe<Project>;
  team?: Maybe<Team>;
};

export enum MembershipStatuses {
  Accepted = 'ACCEPTED',
  Banned = 'BANNED',
  Pending = 'PENDING'
}

export type Mutation = {
  __typename: 'Mutation';
  confirmEmail?: Maybe<User>;
  createInvite: Invite;
  createProject: Project;
  createTeam: Team;
  deleteInvite: SuccessResponse;
  login?: Maybe<User>;
  logout?: Maybe<SuccessResponse>;
  register?: Maybe<User>;
  requestLogin?: Maybe<SuccessResponse>;
};


export type MutationConfirmEmailArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateInviteArgs = {
  email: Scalars['String'];
  projectId?: Maybe<Scalars['ID']>;
  teamId?: Maybe<Scalars['ID']>;
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
  teamId: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationDeleteInviteArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationRequestLoginArgs = {
  email: Scalars['String'];
};

export type PaginationParams = {
  __typename: 'PaginationParams';
  cursor?: Maybe<Scalars['ID']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Project = {
  __typename: 'Project';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  memberships?: Maybe<Array<Maybe<ProjectMembership>>>;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ProjectMembership = {
  __typename: 'ProjectMembership';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
};

export enum ProjectRoles {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  Viewer = 'VIEWER'
}

export type Query = {
  __typename: 'Query';
  listInvites: Array<Maybe<Invite>>;
  listTeamMemberships: Array<Maybe<TeamMembership>>;
  listTeams: Array<Maybe<Team>>;
  me?: Maybe<User>;
  project: Project;
  team: Team;
  teamMembership: TeamMembership;
};


export type QueryListInvitesArgs = {
  email?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['ID']>;
  teamId?: Maybe<Scalars['ID']>;
};


export type QueryListTeamsArgs = {
  cursor?: Maybe<Scalars['ID']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryTeamMembershipArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type SuccessResponse = {
  __typename: 'SuccessResponse';
  success: Scalars['Boolean'];
};

export type Team = {
  __typename: 'Team';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  memberships?: Maybe<Array<Maybe<TeamMembership>>>;
  name: Scalars['String'];
  projects?: Maybe<Array<Maybe<Project>>>;
  updatedAt: Scalars['Date'];
};

export type TeamMembership = {
  __typename: 'TeamMembership';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  role: TeamRoles;
  status: MembershipStatuses;
  team?: Maybe<Team>;
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
};

export enum TeamRoles {
  Admin = 'ADMIN',
  Billing = 'BILLING',
  Member = 'MEMBER'
}

export type User = {
  __typename: 'User';
  confirmed: Scalars['Boolean'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profile?: Maybe<UserProfile>;
};

export type UserProfile = {
  __typename: 'UserProfile';
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
  email: Scalars['String'];
}>;


export type ConfirmEmailMutation = (
  { __typename: 'Mutation' }
  & { confirmEmail?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id'>
    & { profile?: Maybe<(
      { __typename: 'UserProfile' }
      & Pick<UserProfile, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename: 'Mutation' }
  & { login?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id'>
    & { profile?: Maybe<(
      { __typename: 'UserProfile' }
      & Pick<UserProfile, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename: 'Mutation' }
  & { logout?: Maybe<(
    { __typename: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
  )> }
);

export type RequestLoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestLoginMutation = (
  { __typename: 'Mutation' }
  & { requestLogin?: Maybe<(
    { __typename: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
  )> }
);

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename: 'Mutation' }
  & { register?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type CreateInviteMutationVariables = Exact<{
  email: Scalars['String'];
  teamId?: Maybe<Scalars['ID']>;
  projectId?: Maybe<Scalars['ID']>;
}>;


export type CreateInviteMutation = (
  { __typename: 'Mutation' }
  & { createInvite: (
    { __typename: 'Invite' }
    & Pick<Invite, 'id'>
  ) }
);

export type DeleteInviteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteInviteMutation = (
  { __typename: 'Mutation' }
  & { deleteInvite: (
    { __typename: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename: 'Mutation' }
  & { createProject: (
    { __typename: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'updatedAt' | 'name'>
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename: 'Mutation' }
  & { createTeam: (
    { __typename: 'Team' }
    & Pick<Team, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { memberships?: Maybe<Array<Maybe<(
      { __typename: 'TeamMembership' }
      & Pick<TeamMembership, 'id' | 'role' | 'status'>
      & { user?: Maybe<(
        { __typename: 'User' }
        & Pick<User, 'id'>
        & { profile?: Maybe<(
          { __typename: 'UserProfile' }
          & Pick<UserProfile, 'id' | 'fullName'>
        )> }
      )> }
    )>>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename: 'Query' }
  & { me?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id'>
    & { profile?: Maybe<(
      { __typename: 'UserProfile' }
      & Pick<UserProfile, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type ProjectShowQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProjectShowQuery = (
  { __typename: 'Query' }
  & { project: (
    { __typename: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { memberships?: Maybe<Array<Maybe<(
      { __typename: 'ProjectMembership' }
      & Pick<ProjectMembership, 'id'>
      & { user?: Maybe<(
        { __typename: 'User' }
        & Pick<User, 'id'>
        & { profile?: Maybe<(
          { __typename: 'UserProfile' }
          & Pick<UserProfile, 'id' | 'fullName'>
        )> }
      )> }
    )>>> }
  ) }
);

export type TeamShowQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamShowQuery = (
  { __typename: 'Query' }
  & { team: (
    { __typename: 'Team' }
    & Pick<Team, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { projects?: Maybe<Array<Maybe<(
      { __typename: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )>>>, memberships?: Maybe<Array<Maybe<(
      { __typename: 'TeamMembership' }
      & Pick<TeamMembership, 'id' | 'role' | 'status'>
      & { user?: Maybe<(
        { __typename: 'User' }
        & Pick<User, 'id'>
        & { profile?: Maybe<(
          { __typename: 'UserProfile' }
          & Pick<UserProfile, 'id' | 'fullName'>
        )> }
      )> }
    )>>> }
  ) }
);

export type TeamInvitesQueryVariables = Exact<{
  teamId?: Maybe<Scalars['ID']>;
}>;


export type TeamInvitesQuery = (
  { __typename: 'Query' }
  & { listInvites: Array<Maybe<(
    { __typename: 'Invite' }
    & Pick<Invite, 'id' | 'createdAt' | 'email'>
  )>> }
);

export type TeamIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamIndexQuery = (
  { __typename: 'Query' }
  & { listTeams: Array<Maybe<(
    { __typename: 'Team' }
    & Pick<Team, 'id' | 'createdAt' | 'updatedAt' | 'name'>
  )>> }
);


export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!, $email: String!) {
  confirmEmail(token: $token, email: $email) {
    id
    profile {
      firstName
      lastName
    }
  }
}
    `;

export function useConfirmEmailMutation() {
  return Urql.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $code: String!) {
  login(email: $email, code: $code) {
    id
    profile {
      firstName
      lastName
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RequestLoginDocument = gql`
    mutation RequestLogin($email: String!) {
  requestLogin(email: $email) {
    success
  }
}
    `;

export function useRequestLoginMutation() {
  return Urql.useMutation<RequestLoginMutation, RequestLoginMutationVariables>(RequestLoginDocument);
};
export const SignupDocument = gql`
    mutation Signup($email: String!, $firstName: String!, $lastName: String!) {
  register(email: $email, firstName: $firstName, lastName: $lastName) {
    id
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const CreateInviteDocument = gql`
    mutation CreateInvite($email: String!, $teamId: ID, $projectId: ID) {
  createInvite(email: $email, teamId: $teamId, projectId: $projectId) {
    id
  }
}
    `;

export function useCreateInviteMutation() {
  return Urql.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument);
};
export const DeleteInviteDocument = gql`
    mutation DeleteInvite($id: ID!) {
  deleteInvite(id: $id) {
    success
  }
}
    `;

export function useDeleteInviteMutation() {
  return Urql.useMutation<DeleteInviteMutation, DeleteInviteMutationVariables>(DeleteInviteDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($teamId: ID!, $name: String!) {
  createProject(teamId: $teamId, name: $name) {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(name: $name) {
    id
    createdAt
    updatedAt
    name
    memberships {
      id
      role
      status
      user {
        id
        profile {
          id
          fullName
        }
      }
    }
  }
}
    `;

export function useCreateTeamMutation() {
  return Urql.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    profile {
      firstName
      lastName
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProjectShowDocument = gql`
    query ProjectShow($id: ID!) {
  project(id: $id) {
    id
    createdAt
    updatedAt
    name
    memberships {
      id
      user {
        id
        profile {
          id
          fullName
        }
      }
    }
  }
}
    `;

export function useProjectShowQuery(options: Omit<Urql.UseQueryArgs<ProjectShowQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectShowQuery>({ query: ProjectShowDocument, ...options });
};
export const TeamShowDocument = gql`
    query TeamShow($id: ID!) {
  team(id: $id) {
    id
    createdAt
    updatedAt
    name
    projects {
      id
      name
    }
    memberships {
      id
      role
      status
      user {
        id
        profile {
          id
          fullName
        }
      }
    }
  }
}
    `;

export function useTeamShowQuery(options: Omit<Urql.UseQueryArgs<TeamShowQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamShowQuery>({ query: TeamShowDocument, ...options });
};
export const TeamInvitesDocument = gql`
    query TeamInvites($teamId: ID) {
  listInvites(teamId: $teamId) {
    id
    createdAt
    email
  }
}
    `;

export function useTeamInvitesQuery(options: Omit<Urql.UseQueryArgs<TeamInvitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamInvitesQuery>({ query: TeamInvitesDocument, ...options });
};
export const TeamIndexDocument = gql`
    query TeamIndex {
  listTeams {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

export function useTeamIndexQuery(options: Omit<Urql.UseQueryArgs<TeamIndexQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamIndexQuery>({ query: TeamIndexDocument, ...options });
};