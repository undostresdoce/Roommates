const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "roommates",
  password: "",
  port: 5432,
});

module.exports = pool;

//notebycvmi: me falta, edit nodemailer-hacer, revisar conexión a la bbdd, nuevamente falló pgadmin/
