-- CreateTable
CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Login" TEXT NOT NULL,
    "DefaultAvatar" TEXT NOT NULL,
    "UploadedAvatar" TEXT,
    "Token" TEXT NOT NULL,
    "Refresh_token" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Notifications" JSONB,
    "Wins" INTEGER NOT NULL DEFAULT 0,
    "Losses" INTEGER NOT NULL DEFAULT 0,
    "Level" INTEGER NOT NULL DEFAULT 0,
    "Two_factor_auth" BOOLEAN NOT NULL DEFAULT false,
    "LastModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "Id" SERIAL NOT NULL,
    "Player1" INTEGER NOT NULL,
    "Player2" INTEGER NOT NULL,
    "Score1" INTEGER NOT NULL DEFAULT 0,
    "Score2" INTEGER NOT NULL DEFAULT 0,
    "Mode" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "Id" SERIAL NOT NULL,
    "User1" INTEGER NOT NULL,
    "User2" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Blocks" (
    "Id" SERIAL NOT NULL,
    "User1" INTEGER NOT NULL,
    "User2" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Channels" (
    "Id" SERIAL NOT NULL,
    "Access" TEXT NOT NULL,
    "OwnerId" INTEGER NOT NULL,
    "AdministratorsId" JSONB,
    "UsersId" JSONB,
    "Password" TEXT,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "BannedMutedUsers" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Action" TEXT NOT NULL,
    "ActionTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delay" INTEGER NOT NULL,

    CONSTRAINT "BannedMutedUsers_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "Id" SERIAL NOT NULL,
    "SenderId" INTEGER NOT NULL,
    "ChannelId" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Id_key" ON "Users"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Login_key" ON "Users"("Login");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Token_key" ON "Users"("Token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Refresh_token_key" ON "Users"("Refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Status_key" ON "Users"("Status");
