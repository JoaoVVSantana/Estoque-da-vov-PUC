const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const Item = sequelize.define('Item', {
  id_estoque:{
    FOREIGNKEYS:true,
    type: DataTypes.INTEGER,
  },
  id_item:{
    primarykey:true,
    type: DataTypes.INTEGER,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doador_id: {
    type: DataTypes.INTEGER,
    references: { model: 'Doadores', key: 'id' },
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Medicamento', 'Alimento perecível', 'Alimento não perecível'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Item.prototype.verificarVencimento = function () {
   if(diasParaVencimento < 30) return true;
   else return false; //produtos que vencem em menos de 30 dias
};

Item.prototype.calculoDeVencimento = function (){
  
};

Item.prototype.estaEmBaixa = function () {
  return this.quantidade < 10; // quantidade mínima
};

Item.prototype.criaAlerta = async function (){
  //pensar numa forma de criar esses alertas: rodar uma rotina toda semana?
  const item = await Item.findByPk(itemId);
  const vencendo = Item.verificarVencimento();
  if(vencendo) {
    Alerta.prototype.create({
      conteudo:'',

    })
  }
  else {

  }
}



module.exports = Item;
