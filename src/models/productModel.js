import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Category from "./categoryModel.js";
import Supplier from "./supplierModel.js";

const Product = database.define("products", {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Supplier, { foreignKey: "supplier_id" });

export default Product;
