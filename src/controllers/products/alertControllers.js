import productModel from "../../models/productModel.js";
import database from "../../config/database.js";

const Op = database.Sequelize.Op;

const getLowStockAlerts = async (req, res) => {
  try {
    const products = await productModel.findAll({
      where: {
        stock: {
          [Op.lt]: 10, // puedes ajustar este número
        },
      },
    });

    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos con stock bajo" });
  }
};

export default getLowStockAlerts;
