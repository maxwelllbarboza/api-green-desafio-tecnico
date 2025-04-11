import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "./index";
import { Lote } from "./lote.model";

export class Boleto extends Model<
  InferAttributes<Boleto>,
  InferCreationAttributes<Boleto>
> {
  declare id: number;
  declare nome_sacado: string;
  declare id_lote: number;
  declare valor: number;
  declare linha_digitavel: string;
  declare ativo: boolean;
  declare criado_em: Date;
}

Boleto.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_sacado: { type: DataTypes.STRING },
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: { type: DataTypes.DECIMAL },
    linha_digitavel: { type: DataTypes.STRING },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: "boleto", tableName: "boletos", timestamps: false }
);

Boleto.belongsTo(Lote, { foreignKey: "id_lote" });
