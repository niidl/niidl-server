/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_account_session_id_key" ON "user_account"("session_id");
