import database from "../../config/database.js";
import {
  detailEntranceModel,
  detailExitModel,
  entranceModel,
  exitModel,
  productModel,
} from "../../models/index.js";

const createExitProduct = async (req, res) => {
  const { user_id, date, client, observations, products } = req.body;
  const transaction = await database.transaction();

  try {
    const exitP = await exitModel.create(
      { user_id, date, client, observations },
      { transaction }
    );

    // Recorrer productos
    for (const item of products) {
      const product = await productModel.findByPk(item.product_id, {
        transaction,
      });

      if (!product || product.stock < item.amount) {
        throw new Error(
          `Stock insuficiente para producto ID ${item.product_id}`
        );
      }
      product.stock -= item.amount;
      await product.save({ transaction });

      // Crear detalle

      await detailExitModel.create(
        {
          product_id: item.product_id,
          amount: item.amount,
          exit_id: exitP.id,
          unit_price: item.unit_price,
        },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(201).json({ message: "Salida registrada correctamente", exitP });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createExitProduct };
