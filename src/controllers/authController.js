import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userModel } from "../models/index.js";
import database from "../config/database.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/authentication.js";

const Op = database.Sequelize.Op;

const register = async (req, res) => {
  // validate the user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
    });

    try {
      res.json({
        data: user,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  // validaciones
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "E-mail not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    // Payload común para ambos tokens
    const payload = {
      id: user.id,
      username: user.nombre,
      rol: user.rol,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "2h",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // No accesible a través de JavaScript
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "Strict", // Ayuda a prevenir CSRF
      maxAge: 2 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (2 horas)
    });

    // Enviar una respuesta de éxito
    res.status(200).send({
      accessToken: accessToken,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Si no existe el refresh token, devolver error
  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided!" });
  }

  try {
    // Verificar el refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token!" });
      }

      // Crear un nuevo access token
      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username, rol: user.rol },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Usar HTTPS en producción
    sameSite: "Strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, refresh, logout };
