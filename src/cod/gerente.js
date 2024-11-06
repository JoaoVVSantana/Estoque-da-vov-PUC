const { DataTypes } = require('sequelize');

const Gerente = sequelize.define('Gerente', {
  id_gerente:{
    primarykey:true,
    type: DataTypes.INTEGER,
    autoincrement:true,
  },
  nome: {
    type: DataTypes.STRING,
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  alertas: {
    type: DataTypes.ARRAY(require('./alerta')), 
    allowNull: true,
  },
  avisos_automaticos: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, 
{
  tableName: 'gerente',
  timestamps: false,
});

module.exports = Gerente;