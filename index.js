import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import './Model/datbase.js'
import "./Model/schools.js";
import { Router } from './Routes/Router.js';
const app = express();

app.use(express.json());
app.use("/api/", Router);

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Server has connected");
})