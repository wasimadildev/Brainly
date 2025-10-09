/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isShared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shareId" TEXT,
ADD COLUMN     "sharedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Note_shareId_key" ON "Note"("shareId");
