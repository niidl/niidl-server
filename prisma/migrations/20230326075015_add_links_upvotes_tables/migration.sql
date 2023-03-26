/*
  Warnings:

  - You are about to drop the column `project_id` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[github_url]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `github_url` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_profile_picture` to the `user_account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_project_id_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "project_id",
ADD COLUMN     "github_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_account" ADD COLUMN     "github_profile_picture" VARCHAR(64) NOT NULL;

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "url" VARCHAR(64) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvotes" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "upvotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_github_url_key" ON "projects"("github_url");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_user_name_key" ON "user_account"("user_name");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user_account"("user_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_github_url_fkey" FOREIGN KEY ("github_url") REFERENCES "projects"("github_url") ON DELETE CASCADE ON UPDATE CASCADE;
