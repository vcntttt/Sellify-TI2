import { Venta } from '@/types/ventas';
import jsPDF from 'jspdf';

export function PDF(venta: Venta) {
    const doc = new jsPDF();

    doc.roundedRect(60, 15, 90, 20, 3, 3);
    doc.setFontSize(12);
    doc.text('RUT: 99.999.999-9', 87, 23.5);
    doc.text('N° Boleta: 555555', 87, 28);

    doc.setFontSize(16);
    doc.text('Pepitos S.A', 90, 55);

    doc.setFontSize(12);
    doc.text(`Cliente: ${venta.cliente}`, 35, 70);
    doc.text(`Fecha: ${venta.fecha.toLocaleDateString()}`, 35, 75);
    doc.text(`Forma de Pago: ${venta.formaPago}`, 35, 80);

    {/*doc.setFontSize(12);
    doc.text('Producto', 35, 105);
    doc.text('Cantidad', 85, 105);
    doc.text('Precio', 120, 105);
    doc.text('Monto', 160, 105);
    */}

    const yPosition = 150;
    doc.text(`Tipo de Documento: ${venta.tipoRegistro}`, 150, yPosition);
    doc.text(`Total: ${venta.total}`, 150, yPosition + 5);

    doc.roundedRect(50, yPosition + 15, 110, 30, 3, 3);
    doc.text('Código de barras', 90, yPosition + 31);

    doc.setFontSize(10);
    doc.text('Timbre electronico SII', 90, yPosition + 51);
    doc.text('Res. nº de año', 95, yPosition + 56);

    doc.save('boleta.pdf');
};
