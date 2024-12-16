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
    contato:{
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
doador.atualizarContato = async function (doadorA, contatoAtt) {
    doadorA.contato=contatoAtt;
    await doadorA.save();
}

export default  doador;