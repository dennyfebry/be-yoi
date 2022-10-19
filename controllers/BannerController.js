const fs = require("fs");
const uploadFile = require("../middlewares/Upload");
const { Banner } = require("../models");
const controller = {};

controller.insertData = async (req, res) => {
  try {
    // upload file
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    req.body.fileName = req.file.originalname;
    req.body.filePath = req.file.path;

    // insert to db
    const banner = await Banner.create(req.body);

    res.status(200).send({
      status: "success",
      message: "Data has been saved!",
      data: banner,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(400).send({
      status: "error",
      message: err.message,
    });

    // res.status(500).send({
    //   message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    // });
  }
};

controller.updateData = async (req, res) => {
  try {
    const id = req.params.id;

    // get data by id
    let banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    // remove file
    if (banner.filePath !== null) {
      fs.unlink(banner.filePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    // upload file
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    req.body.fileName = req.file.originalname;
    req.body.filePath = req.file.path;

    // insert to db
    banner = await banner.update(req.body);

    res.status(200).send({
      status: "success",
      message: "Your data has been updated!",
      data: banner,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

controller.getData = async (req, res) => {
  try {
    // get data
    let banners = await Banner.findAll();

    if (!banners) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Success get all data",
      data: banners,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

controller.getDataById = async (req, res) => {
  try {
    const id = req.params.id;

    // get data by id
    let banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Success get data",
      data: banner,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

controller.deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    // get data by id
    let banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).send({
        status: "error",
        message: "Data not found!",
      });
    }

    // remove file
    if (banner.filePath !== null) {
      fs.unlink(banner.filePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    // delete from db
    await banner.destroy();

    return res.status(200).send({
      status: "success",
      message: "Success delete data",
      data: banner,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = controller;
