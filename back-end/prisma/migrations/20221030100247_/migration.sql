/*
  Warnings:

  - The values [TAGTEAM,ONEVONE] on the enum `MODE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MODE_new" AS ENUM ('CLASSIC', 'AIBUGGY', 'AIDRVEGA');
ALTER TABLE "MatchHistory" ALTER COLUMN "mode" TYPE "MODE_new" USING ("mode"::text::"MODE_new");
ALTER TYPE "MODE" RENAME TO "MODE_old";
ALTER TYPE "MODE_new" RENAME TO "MODE";
DROP TYPE "MODE_old";
COMMIT;
