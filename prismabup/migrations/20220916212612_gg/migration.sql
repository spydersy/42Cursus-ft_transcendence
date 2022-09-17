/*
  Warnings:

  - Made the column `ReceiverId` on table `Friends` required. This step will fail if there are existing NULL values in that column.
  - Made the column `SenderId` on table `Friends` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_ReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_SenderId_fkey";

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "ReceiverId" SET NOT NULL,
ALTER COLUMN "SenderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
