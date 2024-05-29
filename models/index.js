import { Sequelize } from 'sequelize';
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
  Item: require('./item')(sequelize, Sequelize),
  Bid: require('./bid')(sequelize, Sequelize),
  Notification: require('./notification')(sequelize, Sequelize),
};

db.User.hasMany(db.Bid);
db.Bid.belongsTo(db.User);

db.Item.hasMany(db.Bid);
db.Bid.belongsTo(db.Item);

db.User.hasMany(db.Notification);
db.Notification.belongsTo(db.User);

export default db;