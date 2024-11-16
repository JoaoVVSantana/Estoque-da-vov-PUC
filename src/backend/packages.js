//Requer npm install sequelize express dotenv

import { DataTypes} from 'sequelize';
import database from '../db/database.js';

//API
import autenticarToken from './middlewares/autenticarToken.js';
import authRoutes from './node/API/authRoutes.js';
import itemRoutes from './node/API/itemRoutes.js';
import doacaoRoutes from './node/API/doacaoRoutes.js';
import alteracaoRoutes from './node/API/alteracaoRoutes.js';

import estoqueRoutes from './node/API/estoqueRoutes.js';


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
    database,
    autenticarToken,
    estoqueRoutes,
    authRoutes,
    alteracaoRoutes,
    itemRoutes,
    doacaoRoutes,
    alerta,
    alteracao,
    doacao,
    doador,
    estoque,
    gerente,
    historico,
    item,
  
  };