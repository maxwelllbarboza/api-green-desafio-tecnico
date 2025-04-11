import fs from "fs";
import csvParser from "csv-parser";
import { Boleto } from "../database/models/boleto.model";
import { Lote } from "../database/models/lote.model";
import { ConflictError } from "../helpers/api-erros";

export class CSVService {
  static async importarBoletos(caminho: string): Promise<void> {
    const stream = fs
      .createReadStream(caminho)
      .pipe(csvParser({ separator: ";" }));

    const boletos: any[] = [];
    let duplicados = 0;
    let total = 0;

    for await (const row of stream) {
      total++;
      const unidade = row.unidade.padStart(4, "0");
      const lote = await Lote.findOne({ where: { nome: unidade } });
      if (!lote) continue;

      const linhaDigitavel = row.linha_digitavel;

      const boletoExistente = await Boleto.findOne({
        where: {
          linha_digitavel: linhaDigitavel,
          id_lote: lote.id,
        },
      });

      if (boletoExistente) {
        duplicados++;
        continue;
      }

      boletos.push({
        nome_sacado: row.nome,
        id_lote: lote.id,
        valor: parseFloat(row.valor),
        linha_digitavel: row.linha_digitavel,
      });
    }
    if (duplicados === total) {
      throw new ConflictError(
        "Arquivo já importado anteriormente. Nenhum novo boleto foi adicionado."
      );
    }
    await Boleto.bulkCreate(boletos, { ignoreDuplicates: true });
  }
}
