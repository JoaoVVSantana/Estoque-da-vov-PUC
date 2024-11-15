import {
  
  database,
  DataTypes,
  alteracao,
  item
} from './../../packages.js';

const estoque = database.define('estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  historico: {
    type: DataTypes.INTEGER,
  
    allowNull:true,
  },
  listaItens: {
    type: DataTypes.INTEGER,
   
    allowNull:false,
  },
  listaAlertas: {
    type: DataTypes.INTEGER,
    
    allowNull:false,
  }

}, {
  tableName: 'estoqueUm',
  timestamps: false,
});

// #region relacionamentos


// #endregion

// #region Métodos


estoque.retirarItemDoEstoque = async function (id_item) {

  const itemEncontrado = await item.findByPk(id_item);
  if(!itemEncontrado){
    throw new Error('Esse item não existe no estoque ');
  }
  else {
      this.armazenamento_disponivel+=1; // Atualizar o espaço disponível do estoque
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
estoque.inserirItemNoEstoque = async function (itemParaInserir) {

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


export default  estoque;
