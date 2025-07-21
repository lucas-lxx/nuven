const prisma = require("../config/prisma");
class User {
  constructor() {}
  static async create(data) {
    return await prisma.user.create({ data });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
}

module.exports = User;
