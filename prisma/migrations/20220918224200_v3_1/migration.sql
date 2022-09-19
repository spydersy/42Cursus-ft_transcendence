/*
  Warnings:

  - A unique constraint covering the columns `[receiverId,senderId]` on the table `userRelations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userRelations_receiverId_senderId_key" ON "userRelations"("receiverId", "senderId");
