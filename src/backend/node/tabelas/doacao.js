import {
  DataTypes,
  doador,  

} from './../../packages.js';
import database from '../../../db/database.js';
const doacao = database.define ('doacao', {
  id_doacao:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  quemDoou: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemDoado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
{
tableName: 'doacoes',
timestamps: false,
});

// #region relacionamentos

// #endregion

doacao.registrarDoacao = async function (id_doador, id_item) {
const doadorAtual = await doador.findByPk(id_doador);
const novaDoacao = await doacao.create({
id_doador : doadorAtual.id_doador,
id_item: id_item
})
}
export default  doacao;