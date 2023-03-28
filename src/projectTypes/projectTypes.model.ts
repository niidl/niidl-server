import { db } from '../utils/db.server';

type projectTypes = {
  type: string;
};

export async function getAllProjectTypes(): Promise<projectTypes[]> {
  return db.project_type.findMany({
    select: {
      type: true,
    },
  });
}
