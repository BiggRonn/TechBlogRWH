const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { User } = require('.');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,

    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
    }

  },
  {
    
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);