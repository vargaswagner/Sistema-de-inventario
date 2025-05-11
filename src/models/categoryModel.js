import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Product from "./productModel.js";

const Category = database.define("categories", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
