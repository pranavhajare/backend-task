const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Notification = sequelize.define("Notification", {
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  },
  message: { type: DataTypes.STRING, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Notification;
