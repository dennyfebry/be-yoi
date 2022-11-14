module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.DOUBLE,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "sd_cart",
    }
  );

  return Cart;
};
