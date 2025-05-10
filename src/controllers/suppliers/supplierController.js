import { supplierModel } from "../../models/index.js";

const getSuppliers = async (req, res) => {
  const suppliers = await supplierModel.findAll();
  res.status(200).send(suppliers);
};

const createSupplier = async (req, res) => {
  try {
    const supplier = await supplierModel.create(req.body);

    res.send({
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const pathSupplier = async (req, res) => {
  try {
    const supplier = await supplierModel.findByPk(req.params.id);
    console.log(supplier.id);
    if (!supplier) {
      return res.status(404).send({ msg: "Proveedor no encontrado" });
    }

    await supplier.update(req.body);

    res.status(200).send({ data: supplier });
  } catch (error) {
    res.send({ error: error });
  }
};

const deleteSupplierByID = async (req, res) => {
  try {
    const supplier = await supplierModel.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).send({ error: "Proveedor no encontrado" });
    }

    await supplier.destroy();
    res.json({ message: "Proveedor deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getSuppliers, createSupplier, pathSupplier, deleteSupplierByID };
