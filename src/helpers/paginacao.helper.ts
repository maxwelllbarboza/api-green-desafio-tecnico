export const paginar = (query: any) => {
    const pagina = Number(query.pagina) || 1;
    const limite = Number(query.limite) || 10;
    const offset = (pagina - 1) * limite;
  
    return { pagina, limite, offset };
  };
  