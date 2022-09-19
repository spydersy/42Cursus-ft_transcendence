/*
  Warnings:

  - You are about to drop the `Blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Relation" AS ENUM ('FRIENDS', 'PENDING', 'BLOCK', 'NULL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_BlockedId_fkey";

-- DropForeignKey
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_ReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_SenderId_fkey";

-- DropTable
DROP TABLE "Blocks";

-- DropTable
DROP TABLE "Friends";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "defaultAvatar" TEXT NOT NULL,
    "uploadedAvatar" TEXT,
    "Notifications" JSONB,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuthSecret" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userRelations" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "blockedUser" INTEGER,
    "status" "Relation" NOT NULL,

    CONSTRAINT "userRelations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_displayName_key" ON "user"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "userRelations_id_key" ON "userRelations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userRelations_senderId_receiverId_key" ON "userRelations"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "userRelations" ADD CONSTRAINT "userRelations_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userRelations" ADD CONSTRAINT "userRelations_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
