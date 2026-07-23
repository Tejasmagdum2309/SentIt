/*
  Warnings:

  - You are about to alter the column `campaignName` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `campaignDescription` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `emailSubject` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "campaignName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "campaignDescription" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "emailSubject" SET DATA TYPE VARCHAR(200);
