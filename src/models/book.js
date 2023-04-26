'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
    }
  };
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    isSold: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false
  });
  return Book;
};