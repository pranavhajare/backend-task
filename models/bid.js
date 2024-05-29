const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Bid = sequelize.define("Bid", {
  item_id: {
    type: DataTypes.INTEGER,
    references: { model: "Items", key: "id" },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  },
  bid_amount: { type: DataTypes.DECIMAL, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Bid;
