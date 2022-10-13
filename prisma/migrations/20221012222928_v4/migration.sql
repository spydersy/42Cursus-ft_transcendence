/*
  Warnings:

  - You are about to drop the column `notifications` on the `users` table. All the data in the column will be lost.
  - The `wins` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `losses` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `websockets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NOTIFICATION" AS ENUM ('REQUEST', 'ACCEPT', 'MESSAGE', 'GAMEINVITAION');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "notifications",
DROP COLUMN "wins",
ADD COLUMN     "wins" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0]::INTEGER[],
DROP COLUMN "losses",
ADD COLUMN     "losses" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0]::INTEGER[];

-- DropTable
DROP TABLE "websockets";

-- DropEnum
DROP TYPE "SOCKET";

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NOTIFICATION" NOT NULL,
    "displayName" TEXT,
    "login" TEXT,
    "defaultAvatar" TEXT,
    "channelName" TEXT,
    "channelType" "CHANNEL",
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
