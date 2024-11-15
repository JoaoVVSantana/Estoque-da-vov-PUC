const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const item = require('./item');
const alteracao = require('./alteracao');
const alerta = require('./alerta');
const historico = require('./historico');
const gerente = require('./gerente');

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


estoque.prototype.retirarItem = async function (itemId, quantidadeRetirada) {

  const itemEncontrado = await item.findOne({ where: { id_item: itemId, id_estoque: this.id_estoque } }); // Caça o item pelo id
  if(!itemEncontrado){
    throw new Error('Esse item não existe no estoque ');
  }
  else {
    if(itemEncontrado.quantidade<quantidadeRetirada){
      throw new Error ('Impossível retirar essa quantidade, estoque de item insuficiente. ')
    }
    else{
      itemEncontrado.removerQuantidade(quantidadeRetirada) // Atualizar a quantidade do item no estoque
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
estoque.prototype.inserirItem = async function (itemId, quantidadeInserida) {

  const itemEncontrado = await item.findOne({ where: { id_item: itemId, id_estoque: this.id_estoque } }); // Caça o item pelo id
  if(!itemEncontrado){
    throw new Error('Esse item não existe no estoque ');
  }
  else {
      itemEncontrado.adicionarQuantidade(quantidadeInserida); // Atualizar a quantidade do item no estoque
      this.armazenamento_disponivel-=quantidadeInserida; // Atualizar o espaço disponível do estoque
      await itemEncontrado.save();

      await alteracao.create({
        descricao: `Inserção de ${quantidadeInserida} unidade(s) do item ${itemEncontrado.nome}`,
        quantidade: quantidadeInserida,
        data_alteracao: new Date(),
        tipo: 'entrada',
        id_estoque:this.id_estoque,
      });
    
  }

}


// #endregion



module.exports = estoque;
