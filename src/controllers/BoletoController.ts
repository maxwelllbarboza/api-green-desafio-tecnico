import { Request, Response } from "express";
import { CSVService } from "../services/CSVService";
import { PDFService } from "../services/PDFService";
import { RelatorioService } from "../services/RelatorioService";
import { Boleto } from "../database/models/boleto.model";
import { construirFiltros } from "../helpers/boletos.helpers";
import { paginar } from "../helpers/paginacao.helper";

export class BoletoController {
  static async importarCSV(req: Request, res: Response): Promise<void> {
    const path = req.file!.path;
    await CSVService.importarBoletos(path);
    res.send({ message: "Boletos importados com sucesso." });
  }

  static async importarPDF(req: Request, res: Response): Promise<void> {
    const path = req.file!.path;
    await PDFService.splitPDF(path);
    res.send({ message: "PDFs divididos com sucesso." });
  }

  static async listarBoletos(req: Request, res: Response): Promise<void> {
    try {
      const where = construirFiltros(req.query);
      const { pagina, limite, offset } = paginar(req.query);
  
      const { count, rows: boletos } = await Boleto.findAndCountAll({
        where,
        limit: limite,
        offset,
        order: [["id", "ASC"]],
      });
  
      if (req.query.relatorio === "1") {
        const base64 = await RelatorioService.gerarRelatorio(boletos);
        res.json({ base64 });
        return;
      }
  
      res.json({
        boletos,
        total: count,
        pagina,
        totalPaginas: Math.ceil(count / limite),
        
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }  
}
