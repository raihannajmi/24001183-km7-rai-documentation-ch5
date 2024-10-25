const { Users } = require("../models");
const { Op } = require("sequelize");

const findUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {}
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const getAllUser = async (req, res) => {
  try {
    const { name, age, address, role, page = 1, perPage = 10 } = req.query;

    const condition = {};
    if (name) condition.name = { [Op.iLike]: `%${name}%` };
    if (age) condition.age = age;
    if (address) condition.address = { [Op.iLike]: `%${address}%` };
    if (role) condition.role = { [Op.iLike]: `%${role}%` };

    const limit = parseInt(perPage, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const { count, rows: shops } = await Users.findAndCountAll({
      where: condition,
      limit,
      offset,
    });

    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    res.status(200).json({
      data: shops,
      meta: {
        totalData,
        page: parseInt(page, 10),
        perPage: limit,
        totalPages,
        statusCode: 200,
        message: "Data was successfully retrieved!",
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
  getAllUser,
};
