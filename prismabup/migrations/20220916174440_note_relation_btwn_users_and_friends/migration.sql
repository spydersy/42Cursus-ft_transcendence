/*
  Warnings:

  - A unique constraint covering the columns `[Login]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_Login_key" ON "Users"("Login");
