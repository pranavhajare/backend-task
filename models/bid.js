export default (sequelize, DataTypes) => {
  const Bid = sequelize.define("Bid", {
    bidAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Bid;
};
