const fs = require("fs");
const Validator = require("fastest-validator");
const db = require("../config/Database");
const { Cart } = require("../models");

const controller = {};

const v = new Validator();

// controller.getData = async (req, res) => {
  
//     try {
//         let sql = `SELECT *
//                     FROM
//                     wpr4_cocart_carts cc
//                     WHERE cc.cart_key = '${req.params.id}'`;
//         db.query(sql,(err,result) => {
//             if (err) throw err
            
//             res.status(200).json({
//                 status: true,
//                 totalData: result.length,
//                 data: result
//             });
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: false,
//             message: err,
//         });
//     }
// };

controller.getData = async (req, res) => {
    try {
      let carts = await Cart.findAll();
  
      if (!carts) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Success get all data",
        data: carts,
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
      let carts = await Cart.findByPk(id);
  
      if (!carts) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Success get data",
        data: carts,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };

// controller.addData = async (req, res) => {
//     const schema = {
//         userID: {
//             type: "string",
//             empty: true,
//         }
//     };

//     const validate = v.validate(req.body, schema);

//     if (validate.length) {
//         return res.status(400).json(validate);
//     } else {
//         try {
//         let values = [
//             req.body.userID,
//             req.body.productID,
//             req.body.total,
//         ];

//         console.log(values);
        
//         let userID = req.body.userID ;
//         let productID = req.body.productID ;
//         let total = req.body.total ;
//         let sql = `INSERT INTO cart_list
//         (
//             user_id, product_id, total
//         )
//         VALUES
//         (
//             ?, ?, ?
//         )`;
//         db.query(sql, [userID , productID, total, city, country , password], function (err, result) {
//             if (err) {
//                 throw err
//             } else {
//                 res.status(200).json({
//                     status: true,
//                     message: `1 record successfully inserted into db`,
//                     data: values
//                 });
//             }
//         });
//         } catch (err) {
//         res.status(400).json({
//             status: false,
//             message: err,
//         });
//         }
//     }
// };

controller.insertData = async (req, res) => {
    try {
      // insert to db
      const cart = await Cart.create(req.body);
  
      res.status(200).send({
        status: "success",
        message: "Data has been saved!",
        data: cart,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };



// controller.updateData = async (req, res) => {
//     const schema = {
//         userID: {
//             type: "string",
//             empty: true,
//         }
//     };

//     const validate = v.validate(req.body, schema);

//     if (validate.length) {
//         return res.status(400).json(validate);
//     } else {
//         let id = req.params.id;
//         let values = req.body;
//         let sql = `UPDATE cart_list SET ? WHERE cart_id= ?`;
//         db.query(sql, [values, id], function (err, result) {
//             if (err) throw err;
//             res.status(200).json({
//                 status: true,
//                 message: `1 record successfully updated into db`,
//                 data: values
//             });
//         });
//     }
// };

controller.updateData = async (req, res) => {
    try {
      const id = req.params.id;
  
      // get data by id
      let cart = await Cart.findByPk(id);
  
      if (!cart) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      // insert to db
      cart = await cart.update(req.body);
  
      res.status(200).send({
        status: "success",
        message: "Your data has been updated!",
        data: cart,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };

// controller.deleteData = async (req, res) => {
//     let id = req.params.id;
//     let sql = 'DELETE FROM cart_list WHERE cart_id = ?';
//     db.query(sql, [id], function (err, result) {
//         if (err) throw err;
//         res.status(200).json({
//             status: true,
//             message: `1 record successfully delete into db`
//         });
//   });
// };

controller.deleteData = async (req, res) => {
    try {
      const id = req.params.id;
  
      // get data by id
      let cart = await Cart.findByPk(id);
  
      if (!cart) {
        return res.status(404).send({
          status: "error",
          message: "Data not found!",
        });
      }
  
      // delete from db
      await cart.destroy();
  
      return res.status(200).send({
        status: "success",
        message: "Success delete data",
        data: cart,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    }
  };

module.exports = controller;
