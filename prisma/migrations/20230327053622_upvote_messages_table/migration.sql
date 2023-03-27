/*
  Warnings:

  - You are about to drop the `upvotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `upvotes` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_project_id_fkey";

-- DropForeignKey
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_user_name_fkey";

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "upvotes";

-- CreateTable
CREATE TABLE "upvotes_threads" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "upvotes_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvotes_messages" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "message_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "upvotes_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "upvotes_threads" ADD CONSTRAINT "upvotes_threads_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes_threads" ADD CONSTRAINT "upvotes_threads_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes_threads" ADD CONSTRAINT "upvotes_threads_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user_account"("user_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes_messages" ADD CONSTRAINT "upvotes_messages_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes_messages" ADD CONSTRAINT "upvotes_messages_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvotes_messages" ADD CONSTRAINT "upvotes_messages_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user_account"("user_name") ON DELETE CASCADE ON UPDATE CASCADE;
