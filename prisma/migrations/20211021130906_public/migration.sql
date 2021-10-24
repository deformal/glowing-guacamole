/*
  Warnings:

  - You are about to drop the `User_Model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User_Model";

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT E'',
    "name" VARCHAR(20) NOT NULL,
    "givenName" VARCHAR(50) NOT NULL,
    "isLoggedIn" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(100),
    "address" VARCHAR(100),
    "phone" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_userId_key" ON "UserModel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");
