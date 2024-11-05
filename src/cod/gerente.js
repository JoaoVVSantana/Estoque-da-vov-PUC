const Gerente = sequelize.define('Gerente', {
  id_gerente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  alertas: {
    type: DataTypes.ARRAY(require('./alerta')), // Exemplo simplificado, mas pode ser uma relação com outra tabela de alertas
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