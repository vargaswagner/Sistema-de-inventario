import App from "./app.js";

const port = process.env.PORT || 8080;

App.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
