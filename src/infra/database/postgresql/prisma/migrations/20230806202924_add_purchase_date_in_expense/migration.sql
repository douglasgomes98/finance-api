/*
  Warnings:

  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `invoiceDate` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseDate` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "date",
ADD COLUMN     "invoiceDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL;
