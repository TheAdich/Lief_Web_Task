-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RESOLVED', 'INPROGRESS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Injury" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reportTime" TEXT NOT NULL,
    "injuryTime" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INPROGRESS',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Injury_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InjuryDes" (
    "id" TEXT NOT NULL,
    "bodyPart" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "injuryId" TEXT NOT NULL,

    CONSTRAINT "InjuryDes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InjuryDes" ADD CONSTRAINT "InjuryDes_injuryId_fkey" FOREIGN KEY ("injuryId") REFERENCES "Injury"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
