import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import pdfParse from "pdf-parse";
import { Boleto } from "../database/models/boleto.model";
import { BadRequestError } from "../helpers/api-erros";

export class PDFService {
  static async splitPDF(caminho: string): Promise<void> {
    const pdfBuffer = fs.readFileSync(caminho);
    const pdfDoc = await PDFDocument.load(pdfBuffer);    
    const pdfData = await pdfParse(pdfBuffer);
    const nomesExtraidos: string[] = [];
    const paginaPorNome: { [nome: string]: number } = {};
    

    const texto = pdfData.text;
    const nomesUnicos = texto
      .split('\n')
      .map(linha => linha.trim())
      .filter(nome => nome.length > 0 && isNaN(Number(nome))); 

    nomesUnicos.forEach((nome, index) => {
      if (!nomesExtraidos.includes(nome)) {
        nomesExtraidos.push(nome);
        paginaPorNome[nome] = index;
      }
    });
    
    const boletos = await Boleto.findAll({
      where: {
        nome_sacado: nomesExtraidos,
      },
    });

    if (boletos.length === 0) {
      throw new BadRequestError("Nenhum boleto encontrado com os nomes extraídos. Verifique o arquivo enviado.");
    }

    for (const boleto of boletos) {
      const nome = boleto.nome_sacado;
      const paginaIndex = paginaPorNome[nome];
      if (paginaIndex === undefined) {        
        continue;
      }
      const novoPDF = await PDFDocument.create();
      const [pagina] = await novoPDF.copyPages(pdfDoc, [paginaIndex]);
      novoPDF.addPage(pagina);

      const novoBuffer = await novoPDF.save();
      const nomeArquivo = `${boleto.id}.pdf`;
      fs.writeFileSync(path.join("uploads", nomeArquivo), novoBuffer);
      
    }
  }
}
