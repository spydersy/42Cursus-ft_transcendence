/*
  Warnings:

  - You are about to drop the `_channelsTochannelsUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_channelsTochannelsUsers" DROP CONSTRAINT "_channelsTochannelsUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_channelsTochannelsUsers" DROP CONSTRAINT "_channelsTochannelsUsers_B_fkey";

-- DropTable
DROP TABLE "_channelsTochannelsUsers";

-- AddForeignKey
ALTER TABLE "channelsUsers" ADD CONSTRAINT "channelsUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
