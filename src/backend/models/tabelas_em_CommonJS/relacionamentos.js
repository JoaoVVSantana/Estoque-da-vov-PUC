const { alerta, alteracao, doador, estoque, gerente, item, loteDeItens } = require('../../packages.js');

// Relacionamentos entre as tabelas
item.belongsTo(loteDeItens);
item.belongsTo(doador);
item.hasMany(alerta, { foreignKey: 'id_item', as: 'Alertas Criados', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });

loteDeItens.hasMany(item, { foreignKey: 'id_lote', as: 'Itens do Lote', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
loteDeItens.belongsTo(estoque);

gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'Estoque Principal', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

estoque.hasMany(loteDeItens, { foreignKey: 'id_estoque', as: 'Itens no estoque', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
estoque.hasMany(doador, { foreignKey: 'id_estoque', as: 'Doadores do lar', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
estoque.hasMany(alteracao, { foreignKey: 'id_estoque', as: 'Alteracoes do Estoque', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
estoque.belongsTo(gerente);

doador.hasMany(item, { foreignKey: 'id_doador', as: 'Quantidade de Itens Doados', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

alteracao.belongsTo(estoque);
alerta.belongsTo(item);


module.exports = { alerta, alteracao, doador, estoque, gerente, loteDeItens, item };
