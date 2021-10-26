/*
  Warnings:

  - You are about to drop the column `givenName` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `UserModel` table. All the data in the column will be lost.
  - Made the column `bio` on table `UserModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `UserModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `UserModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "givenName",
DROP COLUMN "imageUrl",
ADD COLUMN     "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "family_name" VARCHAR(50) NOT NULL DEFAULT E'',
ADD COLUMN     "given_name" VARCHAR(50) NOT NULL DEFAULT E'',
ADD COLUMN     "locale" VARCHAR(10) NOT NULL DEFAULT E'en',
ADD COLUMN     "nickname" VARCHAR(50) NOT NULL DEFAULT E'',
ADD COLUMN     "picture" VARCHAR(255) NOT NULL DEFAULT E'',
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT E'',
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" SET DEFAULT E'',
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DEFAULT E'';
