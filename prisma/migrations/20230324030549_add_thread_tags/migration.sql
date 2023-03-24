/*
  Warnings:

  - Added the required column `isPinned` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread_tag` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvotes` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "isPinned" BOOLEAN NOT NULL,
ADD COLUMN     "thread_tag" VARCHAR(32) NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "thread_tags" (
    "id" SERIAL NOT NULL,
    "thread_tag_name" VARCHAR(32) NOT NULL,

    CONSTRAINT "thread_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "thread_tags_thread_tag_name_key" ON "thread_tags"("thread_tag_name");

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_thread_tag_fkey" FOREIGN KEY ("thread_tag") REFERENCES "thread_tags"("thread_tag_name") ON DELETE RESTRICT ON UPDATE CASCADE;
