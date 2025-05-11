import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Entrance from "./entranceModel.js";
import Product from "./productModel.js";

const DetailEntrance = database.define("detail_entrance", {
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

export default DetailEntrance;
