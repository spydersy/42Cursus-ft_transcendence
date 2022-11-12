-- CreateEnum
CREATE TYPE "RELATION" AS ENUM ('FRIENDS', 'PENDING');

-- CreateEnum
CREATE TYPE "MODE" AS ENUM ('CLASSIC', 'AIBUGGY');

-- CreateEnum
CREATE TYPE "CHANNEL" AS ENUM ('DM', 'PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateEnum
CREATE TYPE "PERMISSION" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RESTRICTION" AS ENUM ('BANNED', 'MUTED', 'NULL');

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "defaultAvatar" TEXT NOT NULL,
    "achievement" BOOLEAN[] DEFAULT ARRAY[false, false, false, false, false, false]::BOOLEAN[],
    "wins" INTEGER[] DEFAULT ARRAY[0, 0]::INTEGER[],
    "losses" INTEGER[] DEFAULT ARRAY[0, 0]::INTEGER[],
    "level" INTEGER NOT NULL DEFAULT 0,
    "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuthSecret" TEXT,
    "lastModification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" "RELATION" NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blockedId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" SERIAL NOT NULL,
    "player1Id" INTEGER NOT NULL,
    "player2Id" INTEGER NOT NULL,
    "score1" INTEGER NOT NULL DEFAULT 0,
    "score2" INTEGER NOT NULL DEFAULT 0,
    "mode" "MODE" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" TEXT NOT NULL,
    "access" "CHANNEL" NOT NULL,
    "name" TEXT,
    "picture" TEXT,
    "password" TEXT,
    "nbMessages" INTEGER NOT NULL DEFAULT 0,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channelsUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "permission" "PERMISSION" NOT NULL,
    "restriction" "RESTRICTION" NOT NULL DEFAULT 'NULL',
    "restrictionTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "channelsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayName_key" ON "users"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "channelsUsers_userId_channelId_key" ON "channelsUsers"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
