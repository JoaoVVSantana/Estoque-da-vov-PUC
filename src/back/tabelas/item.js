import {
  DataTypes,
  sequelize,
  alerta,
  doador,
  estoque,
  item
} from 'src/packages';

const item = sequelize.define('item', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Medicamento', 'Alimento perecível', 'Alimento não perecível'),
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: estoque,
      key: 1,
    },
    allowNull: false,
  },
});

// #region relacionamentos
item.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
item.hasMany(alerta, { foreignKey: 'alerta', as: 'alertas' });
item.hasOne(doador, {foreignKey:'id_doador', as: 'doador'});
// #endregion


// #region Métodos
criaAlertaVencimento = async function (){ 
  const itens = await item.findAll({ where: { id_estoque: this.id_estoque } });
  for (const item of itens) {
     const diasParaVencimento = (new Date(item.validade) - new Date()) / (1000 * 60 * 60 * 24);
     
     if (diasParaVencimento < 15) {
       // Cria um alerta 
       await alerta.create({
         conteudo: `O item ${item.nome} está próximo da data de vencimento.`,
         motivo: 'Validade Próxima',
         data_criacao: new Date(),
         id_item: item.id_item,
         id_estoque: 1,
         id_gerente: 1,
       });

    return alerta;

  }
}
};

criaAlertaBaixaQuantidade = async function () { // Método pra criar alerta de estoque baixo pro gerente
  const itens = await this.getItens();
  const itensEmBaixa = itens.filter(item => item.estaEmBaixaQuantidade(item.nome));
  
  for (const item of itensEmBaixa) {
    await alerta.create({
      conteudo: `O item ${item.nome} está com estoque baixo.`,
      motivo: 'Baixa Quantidade',
      data_criacao: new Date(),
      id_estoque: this.id_estoque,
      id_gerente: this.id_gerente,
    });
  }
};

estaEmBaixaQuantidadePorNome = async function (nomeDoItem) {
  const itensVerificados = retornaQuantidadePorNome(nomeDoItem);//Busca em todos os itens pelo nome
  
  if(itensVerificados<5) return true;
  else return false;
  
};

todosItensEmBaixaQuantidade = async function () {
  const todosItens = await this.getItens();
  const itensEmBaixa = todosItens.filter(item => item.estaEmBaixaQuantidade(item.nome));

  return itensEmBaixa;

  
}
retornaQuantidadePorNome = async function (nomeDoItem) {
  const totalDeItens = await item.count({ where: { nome: nomeDoItem } });

  return totalDeItens;
};

listaDeItensDoNome = async function (nomeDoItem) {
  const listaDeItens = await item.findAll({where: {nome: nomeDoItem} });
  return listaDeItens;
};

// #endregion


module.exports = item;
