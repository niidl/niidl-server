import { db } from '../utils/db.server';

type Contributor = {
  id: number;
  user_id: number;
  project_id: number;
};

export async function getContributorsByProjectId(
  id: number
): Promise<Contributor[] | null> {
  return db.contributors.findMany({
    where: {
      project_id: id,
    },
    select: {
      id: true,
      user_id: true,
      project_id: true,
      user_acc: {
        select: {
          user_name: true,
        },
      },
    },
  });
}

export async function getSpecificContributor(
  id: number
): Promise<Contributor | null> {
  return db.contributors.findUnique({
    where: {
      id: id,
    },
  });
}

export async function create(
  payload: Omit<Contributor, 'id'>
): Promise<Contributor> {
  return db.contributors.create({
    data: payload,
    select: {
      id: true,
      user_id: true,
      project_id: true,
    },
  });
}
