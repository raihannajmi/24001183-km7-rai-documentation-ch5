const jwt = require("jsonwebtoken");
const { Users } = require("../models");
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        status: "Failed",
        message: "Token is missing !",
        isSuccess: true,
        data: null,
      });
    }

    const token = authorization.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findByPk(payload.userId);

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "You are unauthorized.",
      isSuccess: true,
      data: null,
    });
  }
};
