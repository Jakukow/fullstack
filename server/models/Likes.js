const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Likes = sequelize.define("Likes");

  return Likes;
};
