import { Boleto } from "../database/models/boleto.model";
export interface IBoletoRepository {
  findAll(filter: any): Promise<Boleto[]>;
  bulkCreate(data: Partial<Boleto>[]): Promise<void>;
}
