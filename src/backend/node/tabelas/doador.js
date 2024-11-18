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
    quantidadeItensDoados:{ 
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

doador.atualizarItensDoados = async function (doadorA) {
    doadorA.quantidadeItensDoados+=1;
    await doadorA.save();
}


export default  doador;