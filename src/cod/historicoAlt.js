const { DataTypes } = require('sequelize');
const sequelize = require('../database');



const HistoricoAlteracoes = sequelize.define('Historico',{
    id_historico:{
        primarykey:true,
        type:DataTypes.INTEGER,
        autoincrement:true,
    },
    alteracoes:{
        type:DataTypes.ARRAY(sequelize.require('./alteracao')),
        FOREIGNKEYS:true,
    },
    retiradas:{
        type:DataTypes.ARRAY(sequelize.require('./alteracao')),
        FOREIGNKEYS:true,
    },
    insercoes:{
        type:DataTypes.ARRAY(sequelize.require('./alteracao')),
        FOREIGNKEYS:true,
    },
},

{
    tableName: 'historico',
    timestamps: false,
  });
module.exports = HistoricoAlteracoes;
