/*
  Warnings:

  - Added the required column `is_github` to the `taglibrary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_language` to the `taglibrary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "taglibrary" ADD COLUMN     "is_github" BOOLEAN NOT NULL,
ADD COLUMN     "is_language" BOOLEAN NOT NULL;
