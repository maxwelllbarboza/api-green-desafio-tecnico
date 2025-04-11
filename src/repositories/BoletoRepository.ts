import { IBoletoRepository } from "../interfaces/IBoletoRepository";
import { Boleto } from "../database/models/boleto.model";
import { InferCreationAttributes } from "sequelize";

export class BoletoRepository implements IBoletoRepository {
  async findAll(filter: any) {
    return Boleto.findAll({ where: filter });
  }

  async bulkCreate(data: InferCreationAttributes<Boleto>[]) {
    await Boleto.bulkCreate(data);
  }
}
