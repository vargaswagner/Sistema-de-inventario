import pdfMake from "pdfmake";
import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { categoryModel, productModel } from "../../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fuentes requeridas por pdfmake
const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../../fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "../../fonts/Roboto/Roboto-Medium.ttf"),
    italics: path.join(__dirname, "../../fonts/Roboto/Roboto-Italic.ttf"),
    bolditalics: path.join(
      __dirname,
      "../../fonts/Roboto/Roboto-MediumItalic.ttf"
    ),
  },
};

const printer = new PdfPrinter(fonts);

export const generateInventoryPDF = async (req, res) => {
  try {
    const products = await productModel.findAll({
      include: {
        model: categoryModel,
        as: "category",
        attributes: ["name"],
      },
    });

    const tableBody = [
      [
        { text: "N°", bold: true, fontSize: 13, alignment: "center" },
        { text: "Nombre", bold: true, fontSize: 13, alignment: "center" },
        { text: "Categoría", bold: true, fontSize: 13, alignment: "center" },
        { text: "Stock", bold: true, fontSize: 13, alignment: "center" },
        { text: "Precio", bold: true, fontSize: 13, alignment: "center" },
      ],
      ...products.map((p, index) => [
        { text: (index + 1).toString().padStart(4, "0"), alignment: "center" },
        p.name || "No disponible",
        p.category?.name || "Sin categoría",
        { text: p.stock.toString(), alignment: "center" },
        { text: `S/. ${p.price}`, alignment: "center" },
      ]),
    ];

    const docDefinition = {
      content: [
        {
          text: "📦 Inventario de Productos",
          style: "header",
          alignment: "center",
          fontSize: 18,
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: [40, "*", "*", "auto", "auto"],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        tableExample: { margin: [0, 5, 0, 15] },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      res.contentType("application/pdf");
      res.send(result);
    });

    pdfDoc.end();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({ error: "No se pudo generar el PDF" });
  }
};
