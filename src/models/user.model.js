const prisma = require("../config/prisma");
class User {
  constructor() {}
  static create(data) {
    return prisma.user.create({ data });
  }
}

module.exports = User;
