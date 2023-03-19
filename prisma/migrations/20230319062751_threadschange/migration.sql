/*
  Warnings:

  - You are about to drop the column `threads_id` on the `messages` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10000)` to `VarChar(9999)`.
  - Added the required column `thread_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_type` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_threads_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "threads_id",
ADD COLUMN     "thread_id" INTEGER NOT NULL,
ALTER COLUMN "creation_time" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "project_type" VARCHAR(64) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(9999);

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "content" VARCHAR(9999) NOT NULL,
ADD COLUMN     "title" VARCHAR(64) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "project_type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(64) NOT NULL,

    CONSTRAINT "project_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_type_type_key" ON "project_type"("type");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_type_fkey" FOREIGN KEY ("project_type") REFERENCES "project_type"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
