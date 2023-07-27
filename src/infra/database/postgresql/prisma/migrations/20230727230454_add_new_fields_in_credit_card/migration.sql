/*
  Warnings:

  - You are about to drop the column `color` on the `CreditCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "color",
ADD COLUMN     "bankId" TEXT,
ADD COLUMN     "limitAvailable" DOUBLE PRECISION,
ADD COLUMN     "limitUsed" DOUBLE PRECISION,
ADD COLUMN     "percentLimitUsed" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
