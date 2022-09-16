/*
  Warnings:

  - You are about to drop the column `User1` on the `Blocks` table. All the data in the column will be lost.
  - You are about to drop the column `User2` on the `Blocks` table. All the data in the column will be lost.
  - Added the required column `BlockedId` to the `Blocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Blocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blocks" DROP COLUMN "User1",
DROP COLUMN "User2",
ADD COLUMN     "BlockedId" INTEGER NOT NULL,
ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_BlockedId_fkey" FOREIGN KEY ("BlockedId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
