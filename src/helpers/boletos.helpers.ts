import { Op } from "sequelize";

export const construirFiltros = (query: any) => {
  const { nome, valor_inicial, valor_final, id_lote } = query;
  const where: any = {};

  if (nome) where.nome_sacado = { [Op.iLike]: `%${nome}%` };
  if (valor_inicial) where.valor = { [Op.gte]: valor_inicial };
  if (valor_final) where.valor = { ...(where.valor || {}), [Op.lte]: valor_final };
  if (id_lote) where.id_lote = id_lote;

  return where;
};
