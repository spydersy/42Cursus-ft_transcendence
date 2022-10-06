/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_channelId_fkey";

-- DropForeignKey
ALTER TABLE "channelsUsers" DROP CONSTRAINT "channelsUsers_channelId_fkey";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "channelId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "channels_id_seq";

-- AlterTable
ALTER TABLE "channelsUsers" ALTER COLUMN "channelId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
