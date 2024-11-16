//Requer npm install sequelize express dotenv
import { DataTypes} from 'sequelize';

//Tabelas
import alerta from './node/tabelas/alerta.js';
import alteracao from './node/tabelas/alteracao.js';
import doacao from './node/tabelas/doacao.js';
import doador from './node/tabelas/doador.js';
import estoque from './node/tabelas/estoque.js';
import gerente from './node/tabelas/gerente.js';
import historico from './node/tabelas/historico.js';
import item from './node/tabelas/item.js';

export {
    DataTypes,
    alerta,
    alteracao,
    doacao,
    doador,
    estoque,
    gerente,
    historico,
    item,
  
  };