import jsPDF from "jspdf";

interface Product {
  name: string;
  quantity: number;
  totalPrice: number;
}

interface BoletaData {
  cajero: string;
  products: Product[];
  total: number;
  iva: number;
}

export function Boleta({ cajero, products, total, iva }: BoletaData) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const doc = new jsPDF();

  doc.roundedRect(60, 15, 90, 20, 3, 3);
  doc.setFontSize(12);
  doc.text("RUT: 99.999.999-9", 87, 23.5);
  doc.text("N° Boleta: 555555", 87, 30.5);

  doc.setFontSize(16);
  doc.text("Sellify", 90, 55);

  doc.setFontSize(12);
  doc.text(`Fecha: ${formattedDate}`, 35, 75);
  doc.text(`Hora: ${formattedTime}`, 35, 85);
  doc.text(`Cajero: ${cajero}`, 35, 95);

  doc.setFontSize(12);
  doc.text("Producto", 35, 105);
  doc.text("Cantidad", 85, 105);
  doc.text("Precio", 120, 105);
  doc.text("Monto", 160, 105);

  let yPosition = 115;
  let monto = 0;
  products.forEach((product) => {
    doc.text(`${product.name}`, 34.5, yPosition);
    doc.text(`${product.quantity}`, 91.5, yPosition);
    doc.text(`${product.totalPrice}`, 121.5, yPosition);
    monto += product.totalPrice;
    doc.text(`${monto}`, 161.5, yPosition);
    yPosition += 10;
  });

  yPosition += 10;
  doc.text(`IVA: $${iva}`, 150, yPosition);
  yPosition += 10;
  doc.text(`Total: $${total}`, 150, yPosition);

  yPosition += 25;
  doc.roundedRect(50, yPosition, 110, 30, 3, 3);
  yPosition += 16;
  doc.text("Código de barras", 90, yPosition);

  yPosition += 25;
  doc.setFontSize(10);
  doc.text("Timbre electronico SII", 90, yPosition);
  yPosition += 5;
  doc.text("Res. nº de año", 95, yPosition);

  doc.save("boleta.pdf");
}
