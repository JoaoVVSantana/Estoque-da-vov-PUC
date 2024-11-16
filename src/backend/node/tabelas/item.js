import {
  database,
  DataTypes,
  alerta,
} from './../../packages.js';


const item = database.define('item', {
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
    type: DataTypes.STRING, // Antigo ENUM, testar se dá pra fazer assim
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
   
    allowNull: false,
  },
  id_doador: {
    type:DataTypes.INTEGER,
    allowNull:true,
  }
},
{
  tableName: 'itens',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos
item.todosItensPertoDoVencimento = async function  () { 

  const itens = await item.findAll();

  for (const item of itens) {
     const diasParaVencimento = (new Date(item.validade) - new Date()) / (1000 * 60 * 60 * 24);
     
    if (item.tipo=='medicamento' && diasParaVencimento < 30) {
      const alertaMedicamento = await alerta.criarAlerta(item,'Vencimento de medicamento',`O medicamento ${item.nome} vence em 30 dias, verificar no estoque. ` );

    return alertaMedicamento;
    }
    else if (item.tipo=='Alimento Perecível' && diasParaVencimento < 10) {
      const alertaPerecivel = await alerta.criarAlerta(item,'Vencimento de perecível',`O alimento perecível ${item.nome} vence em 10 dias, verificar no estoque. ` );
      return alertaPerecivel;
    }
    else if (item.tipo=='Alimento não Perecível' && diasParaVencimento < 15) {
      const alertaNPerecivel = await alerta.criarAlerta(item,'Vencimento de não perecível',`O alimento não perecível ${item.nome} vence em 15 dias, verificar no estoque. ` );
      return alertaNPerecivel;
    }
  }
};

item.todosItensBaixaQuantidade = async function () { // Método pra criar alerta de estoque baixo pro gerente
  const itens = await item.findAll();
  const itensEmBaixa = itens.filter(item => item.estaEmBaixaQuantidade(item.nome));
  
  for (const item of itensEmBaixa) {
    criarAlerta(item,'Baixa Quantidade no Estoque',`Poucas unidades de ${item.nome} no estoque. `);
  }
};

item.criarAlerta = async function (itemAlertado, motivoAlertado, conteudoAlertado) {
  const novoAlerta = await alerta.create({
    conteudo: conteudoAlertado,
    motivo: motivoAlertado,
    data_criacao: new Date(),
    id_item: itemAlertado.id_item,
    id_estoque: 1,
    id_gerente: 1,
  });
  return novoAlerta;
};


item.estaEmBaixaQuantidadePorNome = async function (nomeDoItem)  {
  const itensVerificados = await retornaQuantidadePorNome(nomeDoItem); //Busca em todos os itens pelo nome
  
  if(itensVerificados<5) return true;
  else return false;
  
};

item.retornaTodosItensDeBaixaQuantidade = async function   (){
  const todosItens = await item.findAll();
  const itensEmBaixa = todosItens.filter(item => item.estaEmBaixaQuantidade(item.nome));

  return itensEmBaixa;

};
item.retornaQuantidadePorNome = async function  (nomeDoItem) {
  const totalDeItens = await item.count({ where: { nome: nomeDoItem } });

  return totalDeItens;
};

item.retornaTodosItensPorNome = async function  (nomeDoItem) {
  const listaDeItens = await item.findAll({where: {nome: nomeDoItem} });
  return listaDeItens;
};

item.retornaTodosItensRegistrados = async function  () {
  const listaDeItens = await item.findAll();
  return listaDeItens;
};

item.criarItemNoEstoque = async function (nomeI, validadeI, tipoI) {
  const itemNovo = await item.create({
    nome: nomeI,
    validade: validadeI,
    tipo: tipoI,
    id_estoque:1
  });
  return itemNovo;
};

// #endregion

export default  item;
