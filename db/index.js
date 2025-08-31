import dotenv from "dotenv";
dotenv.config(); 

import { Sequelize } from 'sequelize';
import chalk from 'chalk';

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  define: {
    freezeTableName: true, // Tabellennamen exakt wie im Model
  },
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(chalk.bgYellow(('PostgreSQL connected')));
  } catch (error) {
    console.error(chalk.bgRed('Unable to connect to PostgreSQL:', error));
  }
}

connectDB();

export default sequelize;
