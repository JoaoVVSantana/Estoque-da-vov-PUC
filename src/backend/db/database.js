import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config('../build/.env');

//npm install sequelize

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // importante para evitar erros com SSL
    },
  },
});
export default database;
