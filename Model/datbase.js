import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

// Replace with your actual MySQL service URI
const uri = process.env.SERVICE_URI;

// Use the named import for createConnection
export const connection = mysql.createConnection(uri);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
    console.log("Connected to the cloud database as id", connection.threadId);
});

