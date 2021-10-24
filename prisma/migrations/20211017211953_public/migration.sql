/*
  Warnings:

  - You are about to drop the `Testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Testing";

-- CreateTable
CREATE TABLE "testing" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testing_pkey" PRIMARY KEY ("id")
);
