import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Exit from "./exitModel.js";
import Product from "./productModel.js";

const DetailExit = database.define("detail_exit", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default DetailExit;
