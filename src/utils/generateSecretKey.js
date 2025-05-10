import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo .env
const envPath = resolve(__dirname, "../../.env");

// Leer el contenido actual del archivo .env
let envFileContent = "";
if (fs.existsSync(envPath)) {
  envFileContent = fs.readFileSync(envPath, { encoding: "utf8" });
}

// Función para generar claves seguras
const generateSecret = () => crypto.randomBytes(20).toString("hex");

// Lista de claves a generar o actualizar
const keys = {
  //   SECRET_KEY: generateSecret(),
  ACCESS_TOKEN_SECRET: generateSecret(),
  REFRESH_TOKEN_SECRET: generateSecret(),
};

// Para cada clave, actualizar si ya existe, o agregarla al final
Object.entries(keys).forEach(([key, value]) => {
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(envFileContent)) {
    envFileContent = envFileContent.replace(regex, `${key}=${value}`);
    console.log(`${key} actualizado en el archivo .env`);
  } else {
    envFileContent += `\n${key}=${value}`;
    console.log(`${key} agregado al archivo .env`);
  }
});

// Escribir cambios en el archivo .env
fs.writeFileSync(envPath, envFileContent, { encoding: "utf8" });
console.log(".env actualizado correctamente.");
