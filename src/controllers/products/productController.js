import { productModel } from "../../models/index.js";

const getProducts = async (req, res) => {
  const products = await productModel.findAll();
  res.status(200).send(products);
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);

    res.send({
      data: product,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const pathProduct = async (req, res) => {
  try {
    const product = await productModel.findByPk(req.params.id);
    console.log(product.id);
    if (!product) {
      return res.status(404).send({ msg: "Producto no encontrado" });
    }

    await product.update(req.body);

    res.status(200).send({ data: product });
  } catch (error) {
    res.send({ error: error });
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const product = await productModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  pathProduct,
  deleteProductByID,
};
