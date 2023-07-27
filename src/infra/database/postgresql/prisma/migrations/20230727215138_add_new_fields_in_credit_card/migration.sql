/*
  Warnings:

  - You are about to drop the column `color` on the `CreditCard` table. All the data in the column will be lost.
  - Added the required column `limitAvailable` to the `CreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitUsed` to the `CreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentLimitUsed` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "color",
ADD COLUMN     "bankId" TEXT,
ADD COLUMN     "limitAvailable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limitUsed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "percentLimitUsed" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
