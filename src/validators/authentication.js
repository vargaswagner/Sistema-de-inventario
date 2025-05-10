import Joi from "@hapi/joi";

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
      "string.empty": "El nombre de usuario no puede estar vacío",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
    }),
    email: Joi.string().min(6).max(255).required().email().messages({
      "string.email": "El correo electrónico debe ser válido",
      "string.empty": "El correo electrónico no puede estar vacío",
    }),
    password: Joi.string()
      .min(6)
      .max(255)
      .pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$'))
      .required()
      .messages({
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.pattern.base":
          "La contraseña debe contener al menos un carácter especial",
      }),

    rol: Joi.string().valid("admin", "almacenero", "vendedor").required(),
    confirmado: Joi.bool(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email().messages({
      "string.email": "El correo electrónico debe ser válido",
      "string.empty": "El correo electrónico no puede estar vacío",
    }),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation };
