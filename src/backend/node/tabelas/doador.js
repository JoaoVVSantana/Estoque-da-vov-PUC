import {
    database,
    DataTypes,
  } from './../../packages.js';

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
});
return doadorNovo;
}

export default  doador;