/*
  Warnings:

  - The primary key for the `Blocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BlockedId` on the `Blocks` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Blocks` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Blocks` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Blocks` table. All the data in the column will be lost.
  - The primary key for the `Friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiverId` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `SenderId` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Friends` table. All the data in the column will be lost.
  - The primary key for the `MatchHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Date` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Mode` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Player1` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Player2` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Score1` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `Score2` on the `MatchHistory` table. All the data in the column will be lost.
  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ChannelId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `SenderId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the `BannedMutedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blockedId` to the `Blocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Blocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RELATION" AS ENUM ('FRIENDS', 'PENDING');

-- CreateEnum
CREATE TYPE "CHANNEL" AS ENUM ('DM', 'PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateEnum
CREATE TYPE "PERMISSION" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RESCTRICTION" AS ENUM ('BANNED', 'MUTED', 'RECHECK', 'NULL');

-- DropForeignKey
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_BlockedId_fkey";

-- DropForeignKey
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_ReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_SenderId_fkey";

-- AlterTable
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_pkey",
DROP COLUMN "BlockedId",
DROP COLUMN "Date",
DROP COLUMN "Id",
DROP COLUMN "UserId",
ADD COLUMN     "blockedId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Blocks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_pkey",
DROP COLUMN "Id",
DROP COLUMN "ReceiverId",
DROP COLUMN "SenderId",
DROP COLUMN "Status",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL,
ADD COLUMN     "status" "RELATION" NOT NULL,
ADD CONSTRAINT "Friends_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_pkey",
DROP COLUMN "Date",
DROP COLUMN "Id",
DROP COLUMN "Mode",
DROP COLUMN "Player1",
DROP COLUMN "Player2",
DROP COLUMN "Score1",
DROP COLUMN "Score2",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "mode" TEXT NOT NULL,
ADD COLUMN     "player1" INTEGER NOT NULL,
ADD COLUMN     "player2" INTEGER NOT NULL,
ADD COLUMN     "score1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score2" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_pkey",
DROP COLUMN "ChannelId",
DROP COLUMN "Content",
DROP COLUMN "Id",
DROP COLUMN "SenderId",
ADD COLUMN     "channelId" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL,
ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "BannedMutedUsers";

-- DropTable
DROP TABLE "Channels";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "defaultAvatar" TEXT NOT NULL,
    "uploadedAvatar" TEXT,
    "notifications" JSONB,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuthSecret" TEXT,
    "lastModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "access" "CHANNEL" NOT NULL,
    "password" TEXT,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channelsUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "permission" "PERMISSION" NOT NULL,
    "restriction" "RESCTRICTION" NOT NULL,
    "restrictionTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "channelsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayName_key" ON "users"("displayName");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
