import { Sequelize } from 'src/packages';

//npm install sequelize

const database = new Sequelize('lardavovo', 'lardavovo1', '7Th6l0Od3Vw3VxqfF3FvYw4nvsC0cedF', {
  host: 'dpg-csq9h62j1k6c738f5010-a.oregon-postgres.render.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // importante para evitar erros com SSL
    },
  },
});
export default database;
