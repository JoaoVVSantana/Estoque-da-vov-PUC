//Requer npm install sequelize express dotenv
const { DataTypes, Sequelize } = require('sequelize');
const express = require('express');
const dotenv = require('dotenv').config();
const sequelize = require('../db/database');

//Middlewares
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//API
const router = express.Router();
const itemRoutes = require('./API/itemRoutes');
const doacaoRoutes = require('./API/doacaoRoutes');
const authRoutes = require('./API/authRoutes');
const estoqueRoutes = require('./API/estoqueRoutes');
const autenticarToken = require('../middlewares/authMiddleware');

//APP
const app = express();
const PORT = process.env.PORT || 3000;

//Tabelas
const alerta = require('./tabelas/alerta');
const alteracao = require('./tabelas/alteracao');
const doacao = require('./tabelas/doacao');
const doador = require('./tabelas/doador');
const estoque = require('./tabelas/estoque');
const gerente = require('./tabelas/gerente');
const historico = require('./historico');
const item = require('./tabelas/item');

module.exports = {
    express,
    DataTypes,
    Sequelize,
    sequelize,
    dotenv,
    cors,
    jwt,
    bcrypt,
    router,
    itemRoutes,
    doacaoRoutes,
    authRoutes,
    estoqueRoutes,
    autenticarToken,
    app,
    PORT,
    alerta,
    alteracao,
    doacao,
    doador,
    estoque,
    gerente,
    historico,
    item
  };