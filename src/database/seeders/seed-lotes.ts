import { sequelize } from "../config/database";
import { Lote } from "../models/lote.model";

async function seedLotes() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const lotes = [
      { id: 3, nome: "0017", ativo: true },
      { id: 6, nome: "0018", ativo: true },
      { id: 7, nome: "0019", ativo: true },
    ];

    for (const lote of lotes) {
      await Lote.upsert(lote);
    }

    console.log("✅ Seed de lotes concluída com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao executar seed:", error);
  } finally {
    await sequelize.close();
  }
}

seedLotes();
