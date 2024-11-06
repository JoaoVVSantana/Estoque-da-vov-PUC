const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const {FOREIGNKEYS} = require('sequelize/lib/query-types');

const Alteracao = sequelize.define('Alteracao',{
    id_estoque_alter:{
        type:DataTypes.INTEGER,
        FOREIGNKEYS:true,
        
    },
    id_item_alter:{
        type:DataTypes.INTEGER,
        FOREIGNKEYS:true,
    },
    tipo_alteracao:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },
    quantidade_alterada:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    data_alteracao:{
    type:DataTypes.DATE,
    allowNull:false,
    }
}, 
{
    tableName: 'alteracoes',
    timestamps: false,
  });


    

module.exports = Alteracao;
