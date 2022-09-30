-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_ReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_SenderId_fkey";

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "ReceiverId" DROP NOT NULL,
ALTER COLUMN "SenderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "Users"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "Users"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
