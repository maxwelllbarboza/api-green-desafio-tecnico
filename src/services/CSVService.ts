import fs from 'fs';
import csvParser from 'csv-parser';
import { Boleto } from '../database/models/boleto.model';
import { Lote } from '../database/models/lote.model';

export class CSVService {
  static async importarBoletos(caminho: string): Promise<void> {
    const stream = fs.createReadStream(caminho).pipe(csvParser({ separator: ';' }));
    const boletos: any[] = [];

    for await (const row of stream) {
      const unidade = row.unidade.padStart(4, '0');
      const lote = await Lote.findOne({ where: { nome: unidade } });
      if (!lote) continue;

      boletos.push({
        nome_sacado: row.nome,
        id_lote: lote.id,
        valor: parseFloat(row.valor),
        linha_digitavel: row.linha_digitavel,
      });
    }

    console.log("Lote de Boletos: " + boletos)

    await Boleto.bulkCreate(boletos);
  }
}