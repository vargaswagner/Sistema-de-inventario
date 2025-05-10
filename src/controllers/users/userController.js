import { userModel } from "../../models/index.js";

const getUsers = async (req, res) => {
  const users = await userModel.findAll({
    attributes: ["id", "username", "email", "rol", "createdAt"],
  });
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, getUserById, deleteUserByID };
