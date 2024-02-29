import mysql, { type ConnectionOptions } from "mysql2/promise";

const config: ConnectionOptions = {
  uri: process.env.DATABASE_URL,
  decimalNumbers: true,
  timezone: "Z",
};

export default await mysql.createConnection(config);