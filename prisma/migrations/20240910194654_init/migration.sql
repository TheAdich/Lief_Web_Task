-- DropForeignKey
ALTER TABLE "InjuryDes" DROP CONSTRAINT "InjuryDes_injuryId_fkey";

-- AddForeignKey
ALTER TABLE "InjuryDes" ADD CONSTRAINT "InjuryDes_injuryId_fkey" FOREIGN KEY ("injuryId") REFERENCES "Injury"("id") ON DELETE CASCADE ON UPDATE CASCADE;
