/*
  Warnings:

  - You are about to drop the column `RefreshToken` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Token` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_RefreshToken_key";

-- DropIndex
DROP INDEX "Users_Status_key";

-- DropIndex
DROP INDEX "Users_Token_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "RefreshToken",
DROP COLUMN "Token";
