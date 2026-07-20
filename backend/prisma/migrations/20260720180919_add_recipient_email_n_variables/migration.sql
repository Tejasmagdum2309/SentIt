/*
  Warnings:

  - Added the required column `recipientEmail` to the `CampaignEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variables` to the `CampaignEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CampaignEmail" ADD COLUMN     "recipientEmail" TEXT NOT NULL,
ADD COLUMN     "variables" JSONB NOT NULL;
