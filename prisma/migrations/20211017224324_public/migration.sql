/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `testing` will be added. If there are existing duplicate values, this will fail.
  - The required column `userId` was added to the `testing` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "testing" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "testing_userId_key" ON "testing"("userId");
