import PDFDocument from 'pdfkit';
import { Boleto } from '../database/models/boleto.model';
import { Buffer } from 'buffer';

export class RelatorioService {
  static async gerarRelatorio(boletos: Boleto[]): Promise<string> {
    const doc = new PDFDocument();
    const buffers: any[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.fontSize(14).text('Relatório de Boletos', { align: 'center' });
    doc.moveDown();

    boletos.forEach((b) => {
      doc.text(`ID: ${b.id} | Sacado: ${b.nome_sacado} | Lote: ${b.id_lote} | Valor: R$ ${b.valor} | Linha: ${b.linha_digitavel}`);
      doc.moveDown();
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData.toString('base64'));
      });
    });
  }
}