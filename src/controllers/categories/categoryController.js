import { categoryModel } from "../../models/index.js";

const getCategories = async (req, res) => {
  const categories = await categoryModel.findAll();
  res.status(200).send(categories);
};

const createCategory = async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);

    res.send({
      data: category,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByPk(req.params.id);
    console.log(category.id);
    if (!category) {
      return res.status(404).send({ msg: "Category no encontrado" });
    }

    await category.update(req.body);

    res.status(200).send({ data: category });
  } catch (error) {
    res.send({ error: error });
  }
};

const deleteCategoryByID = async (req, res) => {
  try {
    const category = await categoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Categoria no encontrado" });
    }

    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCategories, createCategory, updateCategory, deleteCategoryByID };
