/*
  Warnings:

  - You are about to drop the column `player1` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `player2` on the `MatchHistory` table. All the data in the column will be lost.
  - Added the required column `player1Id` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2Id` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mode` on the `MatchHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MODE" AS ENUM ('CLASSIC', 'TAGTEAM', 'ONEVONE', 'AIBUGGY', 'AIDRVEGA');

-- AlterTable
ALTER TABLE "MatchHistory" DROP COLUMN "player1",
DROP COLUMN "player2",
ADD COLUMN     "player1Id" INTEGER NOT NULL,
ADD COLUMN     "player2Id" INTEGER NOT NULL,
ADD COLUMN     "player3Id" INTEGER,
ADD COLUMN     "player4Id" INTEGER,
DROP COLUMN "mode",
ADD COLUMN     "mode" "MODE" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "achievement" BOOLEAN[] DEFAULT ARRAY[false, false, false, false, false, false, false, false]::BOOLEAN[];
