import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import cors from "cors";
import route from "./routes/routes.js";

const app = express();

const db = mysql.createPool({
  host: 'bvcymhrq4n5yygspnwvr-mysql.services.clever-cloud.com',
  user: 'uyps6mbvy2gk7aeq',
  password: 'zFvxd3HKtuLHxHmox9xK',
  database: 'bvcymhrq4n5yygspnwvr',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
  ssl: {
    // This bypasses the self-signed certificate warning
    rejectUnauthorized: false
  }
});


db.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL pool connection failed:", err);
    } else {
        console.log("MySQL pool connected successfully");
        connection.release();
    }
});

app.use(bodyparser.json());
app.use(cors());

app.get("/hi", (req, res) => {
    res.send("Hello world");
});
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(3000, () => {
    console.log("The application is running on port 3000");
});

export default db;
