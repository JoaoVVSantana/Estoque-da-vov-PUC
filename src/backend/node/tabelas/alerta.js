import {
  DataTypes,
} from './../../packages.js';
import database from '../../db/database.js';


const alerta = database.define('alerta', {
  id_alerta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  id_item: {
    type: DataTypes.INTEGER,
    references:{
      model: 'item',
      key: 'id_item',
    },
    allowNull: true,  
  },
  id_gerente: {
    type: DataTypes.INTEGER,
    references:{
      model: 'gerente',
      key: 'id_gerente',
    },
    defaultValue: 1,
  },
}, {
  tableName: 'alertas',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos
alerta.criarAlerta = async function (itemAlertado, motivoAlertado, conteudoAlertado) {
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
// #endregion
export default alerta;

