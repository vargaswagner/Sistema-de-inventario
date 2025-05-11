import { DataTypes } from "sequelize";
import database from "../config/database.js";
import User from "./userModel.js";
import Supplier from "./supplierModel.js";
import DetailEntrance from "./detailEntranceModel.js";

const Entrance = database.define("entrances", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Entrance;
