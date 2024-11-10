const prisma = require("../db");

const getAllUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
};

const getUsersById = async (id) => {
  const users = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!users) {
    throw Error("User not found");
  }

  return users;
};

const createUser = async (newUser) => {
  const user = await prisma.users.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    },
  });

  return user;
};

const deleteUser = async (id) => {
  await getUsersById(id);

  await prisma.users.delete({
    where: {
      id,
    },
  });
};

const updateUserById = async (id, user) => {
  if (!user.username || !user.email) {
    throw Error("Username, email and password are required");
  }
  const newUser = await prisma.users.update({
    where: {
      id,
    },
    data: {
      username: user.username,
      email: user.email
    },
  });
  return newUser;
};

const patchUserById = async (id, user) => {
  if (!user.username || !user.email || !user.password) {
    throw Error("Username, email and password are required");
  }
  const newUser = await prisma.users.update({
    where: {
      id,
    },
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
  return newUser;
};

const getUsersByEmail = async (email) => {
  const user = await prisma.users.findMany({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUserById,
  patchUserById,
  getUsersByEmail,
};
