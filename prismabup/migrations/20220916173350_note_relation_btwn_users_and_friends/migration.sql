/*
  Warnings:

  - You are about to drop the column `User1` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `User2` on the `Friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UsualFullName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ReceiverId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_Login_key";

-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "User1",
DROP COLUMN "User2",
ADD COLUMN     "ReceiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_UsualFullName_key" ON "Users"("UsualFullName");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
