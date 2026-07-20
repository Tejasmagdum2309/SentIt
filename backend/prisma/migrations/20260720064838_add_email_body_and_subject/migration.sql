-- CreateEnum
CREATE TYPE "CampaignEmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "emailBody" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emailSubject" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "CampaignEmail" (
    "id" TEXT NOT NULL,
    "status" "CampaignEmailStatus" NOT NULL DEFAULT 'PENDING',
    "messageId" TEXT,
    "sentAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignEmail" ADD CONSTRAINT "CampaignEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignEmail" ADD CONSTRAINT "CampaignEmail_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
