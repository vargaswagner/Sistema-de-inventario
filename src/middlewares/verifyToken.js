import jwt from "jsonwebtoken";

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token =
    req.header("Authorization") &&
    req.header("Authorization").replace("Bearer ", "");
  //   const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ error: "Token requerido" });
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = verified.id;
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};

const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {
    const user = req.user; // debe venir del middleware de autenticación con JWT

    if (!user || !rolesPermitidos.includes(user.rol)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: permiso insuficiente" });
    }

    next();
  };
};

const validateAccess = {
  verifyToken,
  verifyRole,
};

export default validateAccess;
