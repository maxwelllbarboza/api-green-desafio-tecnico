import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import  sequelize from './index';

export class Lote extends Model<InferAttributes<Lote>, InferCreationAttributes<Lote>> {
  declare id: number;
  declare nome: string;
  declare ativo: boolean;
  declare criado_em?: Date;
}

Lote.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'lote', tableName: 'lotes', timestamps: false }
);