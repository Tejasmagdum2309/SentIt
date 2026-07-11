import prisma from "../config/prisma.js";

export const createUser = async ({ name, email }) => {
  return prisma.user.create({
    data: {
      name,
      email,
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