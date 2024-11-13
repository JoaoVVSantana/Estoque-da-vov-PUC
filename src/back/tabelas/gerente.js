import {
  DataTypes,
  sequelize,
  alerta,
  alteracao,
  estoque,
  gerente
} from 'src/packages';

const gerente = sequelize.define('gerente', {
  id_gerente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'gerentes',
  timestamps: false,
});

// #region relacionamentos
gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'estoque' });
gerente.hasMany(alerta, { foreignKey: 'id_gerente', as: 'alertas' });
gerente.hasMany(alteracao, { foreignKey: 'id_gerente', as: 'alteracoes' });
// #endregion

// #region Métodos

// Não sei se vamos usar isso, ver mais pra frente
gerente.prototype.cadastrarItem = async function (nome,validade,tipo){
  

}

gerente.prototype.registrarDoacao = async function (nomeDoador, itemDoado,quantidadeDoada) {
  
}

gerente.prototype.verDoacoes = async function () {
  
}

gerente.prototype.verItensEmFalta = async function () {
  
}

gerente.prototype.gerarRelatorioDeEstoque = async function (id_estoque) {
  
}
// #endregion
module.exports = gerente;
