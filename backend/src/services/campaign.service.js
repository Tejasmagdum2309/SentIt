import prisma from "../config/prisma.js";

const publicCampaignSelect = {
  id: true,
  campaignName: true,
  campaignDescription: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
};

export const getCampaignsByUserId = async (userId) => {
  return prisma.campaign.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: publicCampaignSelect,
  });
};

export const createCampaign = async ({
  campaignName,
  campaignDescription,
  userId,
}) => {
  return prisma.campaign.create({
    data: {
      campaignName,
      campaignDescription,
      userId,
    },
    select: publicCampaignSelect,
  });
};

export const updateCampaignById = async ({
  id,
  userId,
  campaignName,
  campaignDescription,
}) => {
  const existingCampaign = await prisma.campaign.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingCampaign) {
    return null;
  }

  return prisma.campaign.update({
    where: {
      id,
    },
    data: {
      ...(campaignName ? { campaignName } : {}),
      ...(campaignDescription !== undefined ? { campaignDescription } : {}),
    },
    select: publicCampaignSelect,
  });
};