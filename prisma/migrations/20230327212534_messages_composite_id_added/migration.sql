/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "messages_id_user_id_key" ON "messages"("id", "user_id");
