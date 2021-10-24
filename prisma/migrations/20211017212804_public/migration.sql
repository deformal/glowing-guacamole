/*
  Warnings:

  - Added the required column `email` to the `testing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testing" ADD COLUMN     "email" VARCHAR(25) NOT NULL;
