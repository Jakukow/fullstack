const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  Post.associate = (models) => {
    Post.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };
  return Post;
};
