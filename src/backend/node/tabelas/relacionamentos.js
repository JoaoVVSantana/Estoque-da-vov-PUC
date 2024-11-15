import {
    alerta,
    alteracao,
    doacao,
    doador,
    estoque,
    gerente,
    historico,
    item,  
    database,
  
  } from './../../packages.js';

item.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
item.hasOne(doador, {foreignKey:'id_doador', as: 'doador'});
item.hasMany(alerta,{foreignKey:'id_alerta', as:'alertas'});

historico.hasMany(alteracao, { foreignKey: 'id_alteracao', as: 'alteracoes' });
historico.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });

gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'estoqueUm' });
gerente.hasMany(alteracao, { foreignKey: 'id_gerente', as: 'alteracoes' });

estoque.hasMany(item, { foreignKey: 'id_estoque', as: 'itens' });
estoque.hasMany(doador, { foreignKey: 'id_doador', as: 'doadores' });
estoque.hasMany(alteracao, { foreignKey: 'id_estoque', as: 'alteracoes' });
estoque.hasOne(historico, {foreignKey:'id_historico', as:'historico'});
estoque.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });
estoque.hasMany(alerta, { foreignKey: 'id_gerente', as: 'alertas' });

doador.hasMany(doacao, { foreignKey: 'doacoesFeitas', as: 'doacoes' });

doacao.belongsTo(doador, {primaryKey:'quemDoou', as:'doador'});
doacao.hasMany(item, { foreignKey: 'itemDoado', as: 'itens' });

alteracao.belongsTo(historico, { foreignKey: 'id_historico', as: 'historico' });
alteracao.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });

alerta.belongsTo(item, { foreignKey: 'id_item', as: 'itens' });
alerta.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });

export {
    alerta,
    alteracao,
    doacao,
    doador,
    estoque,
    gerente,
    historico,
    item,
}