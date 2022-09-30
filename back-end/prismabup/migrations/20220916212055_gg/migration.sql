/*
  Warnings:

  - You are about to drop the column `senderId` on the `Friends` table. All the data in the column will be lost.
  - Added the required column `SenderId` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_senderId_fkey";

-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "senderId",
ADD COLUMN     "SenderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
