const Validator = require("fastest-validator");
const db = require("../config/Database");
const controller = {};

const v = new Validator();

controller.getData = async (req, res) => {
  
    try {
        let sql = `SELECT *
                    FROM
                    wpr4_cocart_carts cc
                    WHERE cc.cart_key = '${req.params.id}'`;
        db.query(sql,(error,result) => {
            if (error) throw error
            
            res.status(200).json({
                status: true,
                totalData: result.length,
                data: result
            });
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error,
        });
    }
};

controller.addData = async (req, res) => {
    const schema = {
        userID: {
            type: "string",
            empty: true,
        }
    };

    const validate = v.validate(req.body, schema);

    // if (validate.length) {
    //     return res.status(400).json(validate);
    // } else {
    //     try {
    //     let values = [
    //         req.body.userID,
    //     ];

    //     console.log(values);
        
    //     let userID = req.body.userID ;
    //     let sql = ``;
    //     db.query(sql,(error,result) => {
    //         if (error) throw error
    //         res.status(200).json({
    //             status: true,
    //             totalData: result.length,
    //             data: result
    //         });
    //     });
    //     } catch (error) {
    //     res.status(400).json({
    //         status: false,
    //         message: error,
    //     });
    //     }
    // }
};

controller.updateData = async (req, res) => {
   
};

controller.deleteData = async (req, res) => {
   
};

module.exports = controller;
