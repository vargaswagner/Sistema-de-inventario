import database from "../../config/database.js";
import {
  detailEntranceModel,
  entranceModel,
  productModel,
} from "../../models/index.js";

const createEntranceProduct = async (req, res) => {
  const { user_id, supplier_id, date, observations, products } = req.body;
  const transaction = await database.transaction();

  try {
    const entrance = await entranceModel.create(
      { user_id, supplier_id, date, observations },
      { transaction }
    );

    // Recorrer productos
    for (const item of products) {
      const product = await productModel.findByPk(item.product_id, {
        transaction,
      });

      if (!product) {
        throw new Error(`Producto con ID ${item.productoId} no encontrado`);
      }
      // Actualizar stock
      if (product) {
        product.stock += item.amount;
        await product.save({ transaction });
      }
      // Crear detalle
      await detailEntranceModel.create(
        {
          product_id: item.product_id,
          amount: item.amount,
          entrance_id: entrance.id,
          unit_price: item.unit_price,
        },
        { transaction }
      );
    }

    await transaction.commit();
    res
      .status(201)
      .json({ message: "Entrada registrada exitosamente", entrance });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear entrada:", error); // esto es clave para depurar
    res.status(400).json({ error: error.message });
  }
};

export { createEntranceProduct };
