import { DataTypes } from "sequelize";
import database from "../config/database.js";
import User from "./userModel.js";
import DetailExit from "./detailExitModel.js";

const Exit = database.define("exits", {
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
  client: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Exit;
