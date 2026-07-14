import prisma from "../config/prisma.js";

export const createUser = async ({
  name,
  email,
  googleId,
  picture,
  refreshToken,
}) => {
  return prisma.user.create({
    data: {
      googleId,
      name,
      email,
      picture,
      ...(refreshToken ? { refreshToken } : {}),
    },
  });
};

export const upsertUserByGoogleId = async ({
  googleId,
  name,
  email,
  picture,
  refreshToken,
}) => {
  return prisma.user.upsert({
    where: {
      googleId,
    },
    create: {
      googleId,
      name,
      email,
      picture,
      ...(refreshToken ? { refreshToken } : {}),
    },
    update: {
      email,
      name,
      picture,
      ...(refreshToken ? { refreshToken } : {}),
    },
  });
};

export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};