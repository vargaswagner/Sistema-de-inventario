import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import database from "../config/database.js";
import Entrance from "./entranceModel.js";
import Exit from "./exitModel.js";

const User = database.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "almacenero", "vendedor"),
      allowNull: false,
      defaultValue: "almacenero",
    },
    confirmado: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      // afterCreate: async (user) => {
      //   await userDetailModel.create({
      //     user_id: user.id,
      //   });
      // },
    },
  }
);

export default User;
