import prisma from "../config/prisma.js";
import { createHttpError } from "../config/http-error.js";
import path from "node:path";
import xlsx from "xlsx";

const publicCampaignSelect = {
  id: true,
  campaignName: true,
  campaignDescription: true,
  emailSubject: true,
  emailBody: true,
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
  emailSubject,
  emailBody,
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
      ...(emailSubject !== undefined ? { emailSubject } : {}),
      ...(emailBody !== undefined ? { emailBody } : {}),
    },
    select: publicCampaignSelect,
  });
};

export const parseCampaignUploadFile = async ({ campaignId, userId, file }) => {
  if (!campaignId) {
    throw createHttpError(400, "campaignId is required");
  }

  if (!file) {
    throw createHttpError(400, "file is required");
  }

  if (!file.buffer || file.buffer.length === 0) {
    throw createHttpError(400, "Uploaded file is empty");
  }

  const fileExtension = path.extname(file.originalname || "").toLowerCase();

  if (![".csv", ".xlsx"].includes(fileExtension)) {
    throw createHttpError(400, "Only .csv and .xlsx files are supported");
  }

  const campaign = await prisma.campaign.findFirst({
    where: {
      id: campaignId,
      userId,
    },
    select: {
      id: true,
      emailBody: true,
    },
  });

  if (!campaign) {
    return null;
  }

  const workbook = xlsx.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames?.[0];
  if (!sheetName) {
    throw createHttpError(400, "Uploaded file does not contain any sheets");
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(worksheet, { defval: null });

  if (rows.length === 0) {
    throw createHttpError(400, "Uploaded file has no rows");
  }

   const hasEmailColumn = Object.keys(rows[0] || {}).some(
    (columnName) => columnName.trim().toLowerCase() === "email"
  );

  if (!hasEmailColumn) {
    throw createHttpError(400, "Uploaded file must include an email column");
  }

   // Logic chk
    const requiredVariables = [
  ...campaign.emailBody.matchAll(/\{\{(.*?)\}\}/g),
   ].map((match) => match[1]);
  
   const requiredColumns = ["email", ...requiredVariables];

   const sheetColumns = Object.keys(rows[0]);

   if(!sheetColumns){
    throw createHttpError(400, "Uploaded file has no columns");
   }

   // Remove duplicates in case someone uses {{email}} in the template
   const uniqueRequiredColumns = [...new Set(requiredColumns)];

   const missingColumns = uniqueRequiredColumns.filter(
  (column) => !sheetColumns.includes(column)
);

if (missingColumns.length > 0) {
  throw createHttpError(
    400,
    `Missing required column(s): ${missingColumns.join(", ")}`
  );
}


  return {
    campaignId,
    rowCount: rows.length,
    rows,
    sheetName,
  };
};