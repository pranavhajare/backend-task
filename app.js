const express = require("express");
const sequelize = require("./config/config");
const User = require("./models/user");
const Item = require("./models/item");
const Bid = require("./models/bid");
const Notification = require("./models/notification");

const app = express();

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
