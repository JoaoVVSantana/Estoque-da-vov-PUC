import {
    DataTypes,
  } from './../../packages.js';
  import database from '../../db/database.js';
  const doador = database.define ('doador', {
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
    doacoesFeitas:{ //FK
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    id_estoque:{
        type: DataTypes.STRING,
        allowNull:false,
    },

},
{
tableName: 'doadores',
timestamps: false,
});

// #region relacionamentos

// #endregion

doador.criarDoador = async function (nome,email) {
const doadorNovo = await doador.create({
  nome: nome,
  email: email,
  id_estoque:1,
});
return doadorNovo;
}

export default  doador;