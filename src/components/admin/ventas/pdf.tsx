import jsPDF from 'jspdf';

export function PDF() {
    const doc = new jsPDF();

    doc.roundedRect(60, 15, 90, 20, 3, 3);
    doc.setFontSize(12);
    doc.text('RUT: 99.999.999-9', 87, 23.5);
    doc.text('N° Boleta: 555555', 87, 30.5);

    doc.setFontSize(16);
    doc.text('Pepitos S.A', 90, 55);

    doc.setFontSize(12);
    doc.text('Fecha: 19 de septiembre 2024', 35, 75);
    doc.text('Hora: 14:00', 35, 85);

    doc.setFontSize(12);
    doc.text('Producto', 35, 105);
    doc.text('Cantidad', 85, 105);
    doc.text('Precio', 120, 105);
    doc.text('Monto', 160, 105);

    doc.text('Manzanas', 35, 115);
    doc.text('6', 92, 115);
    doc.text('500', 122, 115);
    doc.text('3570', 162, 115);

    doc.text('Plátanos', 35, 125);
    doc.text('10', 91, 125);
    doc.text('300', 122, 125);
    doc.text('3750', 162, 125);

    doc.text('Naranjas', 35, 135);
    doc.text('10', 91, 135);
    doc.text('300', 122.5, 135);
    doc.text('3750', 162, 135);

    doc.text('IVA 2850', 150, 150);
    doc.text('Monto total 17.850', 150, 160);

    doc.roundedRect(50, 195, 110, 30, 3, 3);
    doc.text('Código de barras', 90, 210);

    doc.setFontSize(10);
    doc.text('Timbre electronico SII', 90, 255);
    doc.text('Res. nº de año', 95, 275);

    doc.save('boleta.pdf');
};
