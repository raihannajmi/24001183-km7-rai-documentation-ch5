const { Auths, Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await Auths.findOne({
      where: { email },
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
    });
    // "Chelsie68@gmail.com" "$2b$10$LWzhG7ZRs8M4XFmDbevzTexnlIrJecVeL/KbzHys2pmqILDtJ457."
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not exist",
        isSuccess: false,
        data: null,
      });
    }

    if (user && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          id: data.id,
          username: data.user.username,
          email: data.email,
          userId: data.user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Login Success",
        isSuccess: true,
        data: { username: data.user.name, token },
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Wrong Password",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Berhasil login",
      isSuccess: false,
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
