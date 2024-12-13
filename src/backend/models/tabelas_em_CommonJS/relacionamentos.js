const { alerta, alteracao, doador, estoque, gerente, item, loteDeItens } = require('../../packages.js');

// Relacionamentos entre as tabelas
gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'Estoque Principal', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
gerente.hasMany(alteracao, { foreignKey: 'id_gerente', as: 'Alteracoes Feitas', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
gerente.hasMany(alerta, { foreignKey: 'id_gerente', as: 'Alertas Recebidos', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


estoque.hasMany(doador, { foreignKey: 'id_estoque', as: 'Doadores do lar', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
estoque.hasMany(alteracao, { foreignKey: 'id_estoque', as: 'Alteracoes do Estoque', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
estoque.hasMany(loteDeItens, { foreignKey: 'id_estoque', as: 'Lotes de Itens', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
loteDeItens.hasMany(item, { foreignKey: 'id_lote', as: 'Itens do Lote', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
loteDeItens.belongsTo(estoque, { foreignKey: 'id_estoque'});

doador.hasMany(item, { foreignKey: 'id_doador', as: 'Quantidade de Itens Doados', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

estoque.belongsTo(gerente, { foreignKey: 'id_gerente'});
alteracao.belongsTo(estoque, { foreignKey: 'id_estoque'});
item.belongsTo(loteDeItens, { foreignKey: 'id_lote'});
item.belongsTo(doador, { foreignKey: 'id_doador'});
alerta.belongsTo(item, { foreignKey: 'id_item'});

module.exports = { alerta, alteracao, doador, estoque, gerente, loteDeItens, item };
