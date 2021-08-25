"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./users.js");
const marvelModel = require("./marvel.model");
const DataCollection = require("./data-collection");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: true,
          rejectUnauthorized: false,
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const marvelMovie = marvelModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  marvelMovie: new DataCollection(marvelMovie),
  users: userModel(sequelize, DataTypes),
};
