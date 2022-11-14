const fs = require("fs");
const Validator = require("fastest-validator");
const db = require("../config/Database");
const { Wishlist } = require("../models");

const controller = {};

const v = new Validator();


controller.getData = async (req, res) => {
    try {
      let wishlists = await Wishlist.findAll();
  
      if (!wishlists) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Success get all data",
        data: wishlists,
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
      let wishlists = await Wishlist.findByPk(id);
  
      if (!wishlists) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Success get data",
        data: wishlists,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };

controller.insertData = async (req, res) => {
    try {
      // insert to db
      const wishlists = await Wishlist.create(req.body);
  
      res.status(200).send({
        status: "success",
        message: "Data has been saved!",
        data: wishlists,
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
      let wishlists = await Wishlist.findByPk(id);
  
      if (!wishlists) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      // delete from db
      await wishlists.destroy();
  
      return res.status(200).send({
        status: "success",
        message: "Success delete data",
        data: wishlists,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };

module.exports = controller;
