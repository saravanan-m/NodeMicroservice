module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("account", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    user_mapper_id: {
      type: DataTypes.STRING
    },
    transaction: DataTypes.VIRTUAL
  });
  return Account;
};