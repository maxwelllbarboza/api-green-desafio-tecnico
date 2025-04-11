import { Request, Response, NextFunction } from "express";
import { BoletoController } from "../controllers/BoletoController";
import { BadRequestError } from "../helpers/api-erros";
import path from "path";

export const importFile = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError("Nenhum arquivo enviado.");
    return;
  }

  const mimetype = file.mimetype;
  const ext = path.extname(file.originalname).toLowerCase();

  if (mimetype === "text/csv" || ext === ".csv") {
    return BoletoController.importarCSV(req, res);
  }

  if (mimetype === "application/pdf" || ext === ".pdf") {
    return BoletoController.importarPDF(req, res);
  }

  throw new BadRequestError("Tipo de arquivo não suportado.");
  return;
};
