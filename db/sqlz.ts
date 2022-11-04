import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sqlz = new Sequelize({
    dialect: "postgres",
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST
})

export default sqlz;