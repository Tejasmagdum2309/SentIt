-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'SENT');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "campaignStatus" "CampaignStatus" NOT NULL DEFAULT 'DRAFT';
