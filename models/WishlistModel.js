module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
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
      tableName: "sd_wishlist",
    }
  );

  return Wishlist;
};
