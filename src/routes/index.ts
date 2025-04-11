import { Router } from "express";
import multer from "multer";
import { BoletoController } from "../controllers/BoletoController";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post(
  "/importar-csv",
  upload.single("file"),
  BoletoController.importarCSV
);
router.post(
  "/importar-pdf",
  upload.single("file"),
  BoletoController.importarPDF
);
router.get('/boletos', BoletoController.listar);

export default router;
