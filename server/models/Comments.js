const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};
