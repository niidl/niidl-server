/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `threads` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "threads_id_user_id_key" ON "threads"("id", "user_id");
