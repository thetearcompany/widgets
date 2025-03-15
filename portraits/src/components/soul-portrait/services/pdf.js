"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePortraitPDF = generatePortraitPDF;
const jspdf_1 = __importDefault(require("jspdf"));
const html2canvas_1 = __importDefault(require("html2canvas"));
async function generatePortraitPDF(portrait, containerRef) {
    // Utwórz nowy dokument PDF w formacie A4
    const pdf = new jspdf_1.default('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Dodaj nagłówek
    pdf.setFontSize(24);
    pdf.setTextColor(75, 85, 99); // text-gray-600
    pdf.text('Portret Duszy', pageWidth / 2, 20, { align: 'center' });
    // Dodaj styl
    pdf.setFontSize(12);
    pdf.setTextColor(79, 70, 229); // text-indigo-600
    pdf.text(`Styl: ${portrait.style.name}`, pageWidth / 2, 30, { align: 'center' });
    try {
        // Konwertuj kontener na canvas
        const canvas = await (0, html2canvas_1.default)(containerRef, {
            scale: 2,
            useCORS: true,
            logging: false,
        });
        // Konwertuj canvas na obrazek
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        // Oblicz wymiary obrazka, zachowując proporcje
        const imgWidth = pageWidth - 40; // marginesy 20mm z każdej strony
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        // Dodaj obrazek
        pdf.addImage(imgData, 'JPEG', 20, 40, imgWidth, imgHeight);
        // Dodaj opis
        const textY = imgHeight + 60;
        pdf.setFontSize(12);
        pdf.setTextColor(55, 65, 81); // text-gray-700
        // Podziel tekst na linie
        const splitText = pdf.splitTextToSize(portrait.description, pageWidth - 40);
        pdf.text(splitText, 20, textY);
        // Dodaj datę
        const date = new Date(portrait.createdAt).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        pdf.setFontSize(10);
        pdf.setTextColor(107, 114, 128); // text-gray-500
        pdf.text(`Wygenerowano: ${date}`, 20, pageHeight - 20);
        // Zapisz PDF
        pdf.save('portret-duszy.pdf');
    }
    catch (error) {
        console.error('Błąd podczas generowania PDF:', error);
        throw error;
    }
}
