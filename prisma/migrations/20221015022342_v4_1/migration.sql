/*
  Warnings:

  - The primary key for the `websockets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `websockets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[socketId]` on the table `websockets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userLogin` to the `websockets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "websockets" DROP CONSTRAINT "websockets_pkey",
DROP COLUMN "id",
ADD COLUMN     "userLogin" TEXT NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'ONLLINE',
ADD CONSTRAINT "websockets_pkey" PRIMARY KEY ("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "websockets_socketId_key" ON "websockets"("socketId");
