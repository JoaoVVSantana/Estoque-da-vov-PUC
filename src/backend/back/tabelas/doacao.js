const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const item = require('./item');
const doador = require('../doador');

const doacao = sequelize.define ('doacao', {
        id_doacao:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_doador: {
            type: DataTypes.INTEGER,
            references: {
              model: doador,
              key: 'id_doador',
            },
            allowNull: false,
          },
          id_item: {
            type: DataTypes.INTEGER,
            references: {
              model: item,
              key: 'id_item',
            },
            allowNull: false,
          },

},
{
    tableName: 'doacao',
    timestamps: false,
  });

// #region relacionamentos
doacao.belongsTo(doador, {primaryKey:'id_doador', as:'doador'});
doacao.belongsTo(item, { foreignKey: 'id_item', as: 'item' });
// #endregion