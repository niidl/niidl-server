-- CreateTable
CREATE TABLE "Projects" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repo_url" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);
