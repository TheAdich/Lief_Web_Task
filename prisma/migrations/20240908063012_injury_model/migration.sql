/*
  Warnings:

  - Added the required column `injuryDate` to the `Injury` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportDate` to the `Injury` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Injury" ADD COLUMN     "injuryDate" TEXT NOT NULL,
ADD COLUMN     "reportDate" TEXT NOT NULL;
