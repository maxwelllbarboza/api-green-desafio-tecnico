import { Router } from "express";
import multer from "multer";
import { BoletoController } from "./controllers/BoletoController";
import { importFile } from "./middlewares/importFile";
import { uploadConfig } from "./middlewares/multerConfig";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/importar", uploadConfig.single("file"), importFile);
router.get("/boletos", BoletoController.listarBoletos);

export default router;
