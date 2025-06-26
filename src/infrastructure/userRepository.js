import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userRepository = {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  async save(userData) {
    return await prisma.user.create({
      data: userData,
    });
  },
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
  async update(id, userData) {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  },
  async delete(id) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
export { userRepository };
