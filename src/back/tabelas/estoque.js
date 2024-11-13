import {
  DataTypes,
  sequelize,
  alteracao,
  doador,
  estoque,
  gerente,
  historico,
  item
} from 'src/packages';

const estoque = sequelize.define('estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'estoques',
  timestamps: false,
});

// #region relacionamentos
estoque.hasMany(item, { foreignKey: 'id_estoque', as: 'itens' });
estoque.hasMany(doador, { foreignKey: 'id_doador', as: 'doadores' });
estoque.hasMany(alteracoes, { foreignKey: 'id_estoque', as: 'alteracoes' });
estoque.hasOne(historico, {foreignKey:'id_historico', as:'historico'});
estoque.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });

// #endregion

// #region Métodos


estoque.retirarItemDoEstoque = async function (nomeDoItem, quantidadeRetirada) {

  const itemEncontrado = await item.findOne({ where: { nome:nomeDoItem, id_estoque: this.id_estoque } }); // Caça o item pelo nome
  if(!itemEncontrado){
    throw new Error('Esse item não existe no estoque ');
  }
  else {
    if(itemEncontrado.retornaQuantidadePorNome(nomeDoItem)< quantidadeRetirada){
      throw new Error ('Impossível retirar essa quantidade, estoque de item insuficiente. ')
    }
    else{
      
      this.armazenamento_disponivel+=quantidadeRetirada; // Atualizar o espaço disponível do estoque
      await itemEncontrado.save();

      await alteracao.create({
        descricao: `Retirada de ${quantidadeRetirada} unidade(s) do item ${itemEncontrado.nome}`,
        quantidade: quantidadeRetirada,
        data_alteracao: new Date(),
        tipo: 'saída',
        id_estoque:this.id_estoque,
      });
    }
  }

}
estoque.prototype.inserirItemNoEstoque = async function (nome, quantidadeInserida, validade) {

  const itemParaInserir = await item.findOne({ where: { nome: nome, id_estoque: this.id_estoque } }); // Caça o item pelo id
  if(!itemParaInserir){
    itemParaInserir = await item.create({ nome, quantidadeInserida, validade });
  }
  
      itemParaInserir.adicionarQuantidade(quantidadeInserida); // Atualizar a quantidade do item no estoque
      this.armazenamento_disponivel-=quantidadeInserida; // Atualizar o espaço disponível do estoque
      await itemParaInserir.save();

      await alteracao.create({
        descricao: `Inserção de ${quantidadeInserida} unidade(s) do item ${itemEncontrado.nome}`,
        quantidade: quantidadeInserida,
        data_alteracao: new Date(),
        tipo: 'entrada',
        id_estoque:this.id_estoque,
      });
    
  

}


// #endregion



module.exports = estoque;
