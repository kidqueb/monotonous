import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@urql/core";

import { useCreateProjectMutation, useTeamShowQuery } from "graphql_client";

gql`
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

export default function TeamShow() {
  const router = useRouter();
  const { teamId } = router.query as { teamId: string };
  const [{ data }, getTeam] = useTeamShowQuery({
    variables: { id: teamId },
    pause: !teamId,
  });
  const [createMeta, createProject] = useCreateProjectMutation();
  const [name, setName] = useState("");

  useEffect(() => {
    if (teamId) getTeam({ id: teamId });
  }, [teamId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await createProject({ teamId, name });
      setName("");
      getTeam();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container flex">
      <div className="w-2/3">
        <nav className="mb-10 bg-gray-800">
          <Link href={`/teams/${teamId}/invites`}>Invites</Link>
        </nav>

        <h1 className="text-2xl mb-10">{data?.team?.name}</h1>

        {data?.team?.projects && (
          <div className="mt-10">
            <h2 className="font-bold">Projects</h2>
            <ul>
              {data.team.projects.map((project) => {
                return (
                  <li key={project.id}>
                    <h3>
                      <Link href={`/projects/${project.id}`}>
                        {project.name}
                      </Link>
                    </h3>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {data?.team?.memberships && (
          <div className="mt-10">
            <h2 className="font-bold">Team Members</h2>
            <ul>
              {data.team.memberships.map((membership) => {
                return (
                  <li key={membership.id}>
                    <p>{membership.user?.profile?.fullName}</p>
                  </li>
                );
              })}
            </ul>

            <Link href={`/teams/${teamId}/invites/new`}>
              Invite a new member
            </Link>
          </div>
        )}
      </div>
      <form className="flex-1" onSubmit={handleSubmit}>
        <h2 className="text-sm mb-10">Create Project</h2>
        <p>
          <label>Project Name:</label>
          <input
            type="text"
            value={name}
            className="bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </p>

        <button type="submit" disabled={createMeta.fetching}>
          Create Project
        </button>
      </form>
    </div>
  );
}