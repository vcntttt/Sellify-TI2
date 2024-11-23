import jsPDF from "jspdf";

export function PDF(venta: {
  numero_documento: string;
  fecha: Date;
  cliente: string;
  formaPago: string;
  tipoRegistro: string;
  total: number;
  productos: { nombre: string; cantidad: number; descripcion?: string }[];
}) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Sellify S.A", 105, 15, { align: "center" });
  doc.setFontSize(10);
  doc.text("RUT: 12345678-9", 105, 20, { align: "center" });
  doc.text("Teléfono: +56 9 1234 5678", 105, 30, { align: "center" });


  doc.setFontSize(12);
  doc.text(`N° Boleta: ${venta.numero_documento}`, 10, 40);
  doc.text(`Fecha: ${venta.fecha.toLocaleDateString()}`, 10, 45);
  doc.text(`Cliente: ${venta.cliente}`, 10, 50);
  doc.text(`Forma de Pago: ${venta.formaPago}`, 10, 55);


  let y = 70;
  y += 10;

  doc.setFontSize(10);
  doc.text("Producto", 10, y);
  doc.text("Cantidad", 80, y);
  y += 5;


  doc.setDrawColor(200);
  doc.line(10, y, 200, y);
  y += 5;


  venta.productos.forEach((producto) => {
    doc.text(producto.nombre, 10, y);
    doc.text(`${producto.cantidad}`, 80, y);
    y += 5;


    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });


  y += 10;
  doc.setFontSize(12);
  doc.text(`Total: $${Math.round(venta.total)}`, 150, y);


  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.rect(50, 260, 110, 20);
  doc.setFontSize(8);
  doc.text("Código de Barras", 105, 270, { align: "center" });

  doc.setFontSize(10);
  doc.text("Gracias por su compra", 105, 290, { align: "center" });


  doc.save(`boleta_${venta.numero_documento}.pdf`);
}
