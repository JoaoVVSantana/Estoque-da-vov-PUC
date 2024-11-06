const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Alerta = sequelize.define('Alerta',
    {
        conteudo:{
            type:DataTypes.sequelize.require('./item'),

        },
        motivo:{
            type:DataTypes.STRING,
        },
        data_criacao:{
            type:DataTypes.DATE,
        },
    }
)

module.exports = Alerta;
