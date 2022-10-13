-- CreateEnum
CREATE TYPE "SOCKET" AS ENUM ('GAME', 'ONLLINE');

-- CreateTable
CREATE TABLE "websockets" (
    "id" SERIAL NOT NULL,
    "socketId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "SOCKET" NOT NULL,

    CONSTRAINT "websockets_pkey" PRIMARY KEY ("id")
);
