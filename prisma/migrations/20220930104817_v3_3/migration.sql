/*
  Warnings:

  - You are about to drop the column `uploadedAvatar` on the `users` table. All the data in the column will be lost.
  - The `notifications` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "name" TEXT,
ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uploadedAvatar",
DROP COLUMN "notifications",
ADD COLUMN     "notifications" JSONB[];
