-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "dueDay" INTEGER NOT NULL,
    "closingDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);
