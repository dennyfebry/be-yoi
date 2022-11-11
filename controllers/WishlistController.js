const Validator = require("fastest-validator");
const uploadFile = require("../middlewares/Upload");
const { Wishlist, Product, User } = require("../models");
const UserModel = require("../models/UserModel");
const controller = {};
const v = new Validator();

// GET
controller.getDataByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    Product.hasMany(Wishlist);
    Wishlist.belongsTo(Product);

    // get data by user id
    let wishlist = await Wishlist.findAll({
      include: Product,
      where: {
        userId: userId,
      },
      attributes: ["id", "userId", "createdAt", "updatedAt"],
    });

    if (!wishlist) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Success get data",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

// INSERT
controller.insertData = async (req, res) => {
  const schema = {
    userId: {
      type: "number",
      positive: true,
      integer: true,
    },
    productId: {
      type: "number",
      positive: true,
      integer: true,
    },
  };

  const validate = await v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    // insert to db
    const wishlist = await Wishlist.create(req.body);

    res.status(200).send({
      status: "success",
      message: "Success insert data!",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

// UPDATE
controller.updateData = async (req, res) => {
  const schema = {
    wishlistID: {
      type: "number",
      positive: true,
      integer: true,
    },
  };

  const validate = await v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    const id = req.params.id;

    // get data by id
    let wishlist = await Wishlist.findByPk(id);

    if (!wishlist) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    // insert to db
    wishlist = await wishlist.update(req.body);

    res.status(200).send({
      status: "success",
      message: "Your data has been updated!",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

// DELETE
controller.deleteData = async (req, res) => {
  try {
    // get data
    let wishlist = await Wishlist.findAll();

    if (!wishlist) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Success get all data",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = controller;
