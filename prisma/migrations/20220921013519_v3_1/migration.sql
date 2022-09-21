/*
  Warnings:

  - A unique constraint covering the columns `[userId,channelId]` on the table `channelsUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "channelsUsers" DROP CONSTRAINT "channelsUsers_channelId_fkey";

-- CreateTable
CREATE TABLE "_channelsTochannelsUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_channelsTochannelsUsers_AB_unique" ON "_channelsTochannelsUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_channelsTochannelsUsers_B_index" ON "_channelsTochannelsUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "channelsUsers_userId_channelId_key" ON "channelsUsers"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "_channelsTochannelsUsers" ADD CONSTRAINT "_channelsTochannelsUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channelsTochannelsUsers" ADD CONSTRAINT "_channelsTochannelsUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "channelsUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
