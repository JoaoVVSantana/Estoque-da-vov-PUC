const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const item = require('./item');

const doador = sequelize.define ('doador', {
        id_doador:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        doacoes:{
            type:DataTypes.item,
            references:{
                model:item,
                key:'id_item',
            },
            allowNull:true,

        },

},
{
    tableName: 'doadores',
    timestamps: false,
  });

// #region relacionamentos
doador.hasMany(doacao, { foreignKey: 'id_doacao', as: 'doacoes' });
// #endregion