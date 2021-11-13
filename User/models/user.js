const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model { }

const initUserTable = (sequelize) => {
  return User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    mapper_id: {
      type: DataTypes.STRING
    },
    account: DataTypes.VIRTUAL
  },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'user' // We need to choose the model name
    });
}

module.exports = {
  initUserTable,
  User
}