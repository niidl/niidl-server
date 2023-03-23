/*
  Warnings:

  - Added the required column `session_id` to the `user_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_account" ADD COLUMN     "session_id" VARCHAR(16) NOT NULL;
