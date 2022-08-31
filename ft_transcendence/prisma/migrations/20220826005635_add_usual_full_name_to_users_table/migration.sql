/*
  Warnings:

  - You are about to drop the column `Refresh_token` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Two_factor_auth` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[RefreshToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `RefreshToken` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UsualFullName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_Refresh_token_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "Refresh_token",
DROP COLUMN "Two_factor_auth",
ADD COLUMN     "RefreshToken" TEXT NOT NULL,
ADD COLUMN     "TwoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "UsualFullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_RefreshToken_key" ON "Users"("RefreshToken");
