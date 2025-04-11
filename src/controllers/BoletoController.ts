import { Request, Response } from "express";
import { CSVService } from "../services/CSVService";
import { PDFService } from "../services/PDFService";
import { RelatorioService } from "../services/RelatorioService";
import { Boleto } from "../database/models/boleto.model";
import { Op } from "sequelize";

export class BoletoController {
  static async importarCSV(req: Request, res: Response): Promise<void> {
    try {
      const path = req.file?.path;
      if (!path) {
        res.status(400).send("CSV não enviado");
        return;
      }
      await CSVService.importarBoletos(path);
      res.send("Boletos importados com sucesso.");
    } catch (e) {
      res.status(500).send(e);
    }
  }

  static async importarPDF(req: Request, res: Response): Promise<void> {
    try {
      const path = req.file?.path;
      if (!path) {
        res.status(400).send("PDF não enviado");
        return;
      }
      await PDFService.splitPDF(path);
      res.send("PDFs divididos com sucesso.");
    } catch (e) {
      res.status(500).send(e);
    }
  }

  static async listar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, valor_inicial, valor_final, id_lote, relatorio } =
        req.query;

      const where: any = {};
      if (nome) where.nome_sacado = { [Op.iLike]: `%${nome}%` };
      if (valor_inicial) where.valor = { [Op.gte]: valor_inicial };
      if (valor_final)
        where.valor = { ...(where.valor || {}), [Op.lte]: valor_final };
      if (id_lote) where.id_lote = id_lote;

      const boletos = await Boleto.findAll({ where });

      if (relatorio === "1") {
        const base64 = await RelatorioService.gerarRelatorio(boletos);
        res.json({ base64 });
        return;
      }

      res.json(boletos);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
