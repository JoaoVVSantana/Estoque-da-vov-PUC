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
        defaultValue:0,
    },
    id_estoque:{
        type: DataTypes.STRING,
        references:{
            model: 'estoque',
            key: 'id_estoque',
        },
        allowNull:false,
    },
    

},
{
tableName: 'doadores',
timestamps: false,
});

// #region relacionamentos

// #endregion

doador.atualizarItensDoados = async function (doadorA, quantidade) {
    const doacoesAnteriores = parseInt(doadorA.quantidadeItensDoados) || 0;
    doadorA.quantidadeItensDoados = doacoesAnteriores + parseInt(quantidade);
    await doadorA.save();
}
doador.atualizarEmail = async function (doadorA, emailAtt) {
    doadorA.email=emailAtt;
    await doadorA.save();
}

export default  doador;