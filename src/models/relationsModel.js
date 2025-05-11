import Category from "./categoryModel.js";
import DetailEntrance from "./detailEntranceModel.js";
import DetailExit from "./detailExitModel.js";
import Entrance from "./entranceModel.js";
import Exit from "./exitModel.js";
import Product from "./productModel.js";
import Supplier from "./supplierModel.js";
import User from "./userModel.js";

User.hasMany(Entrance, { foreignKey: "user_id" });
User.hasMany(Exit, { foreignKey: "user_id" });

Category.hasMany(Product, { foreignKey: "category_id", as: "products" });

Entrance.belongsTo(User, { foreignKey: "user_id" });
Entrance.belongsTo(Supplier, { foreignKey: "supplier_id" });
Entrance.hasMany(DetailEntrance, { foreignKey: "entrance_id" });

Supplier.hasMany(Entrance, { foreignKey: "supplier_id" });

Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Product.hasMany(DetailEntrance, { foreignKey: "product_id" });
Product.hasMany(DetailExit, { foreignKey: "product_id" });

Exit.belongsTo(User, { foreignKey: "user_id" });
Exit.hasMany(DetailExit, { foreignKey: "exit_id" });

DetailExit.belongsTo(Product, { foreignKey: "product_id" });
DetailExit.belongsTo(Exit, { foreignKey: "exit_id" });

DetailEntrance.belongsTo(Product, { foreignKey: "product_id" });
DetailEntrance.belongsTo(Entrance, { foreignKey: "entrance_id" });
