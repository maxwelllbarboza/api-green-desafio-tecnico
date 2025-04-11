import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { Boleto } from '../database/models/boleto.model';

export class PDFService {
  static async splitPDF(caminho: string): Promise<void> {
    const boletos = await Boleto.findAll();
    const pdfBuffer = fs.readFileSync(caminho);
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    for (let i = 0; i < boletos.length; i++) {
      const novoPDF = await PDFDocument.create();
      const [pagina] = await novoPDF.copyPages(pdfDoc, [i]);
      novoPDF.addPage(pagina);
      const novoBuffer = await novoPDF.save();

      fs.writeFileSync(path.join('uploads', `${boletos[i].id}.pdf`), novoBuffer);
    }
  }
}