import express from 'express';
import { AddSchoolData, GetSchoolData } from '../controllers/schoolController.js';
export const Router = express.Router();


Router.post("/addSchool", AddSchoolData)
    .get("/listSchools/:latitude/:longitude", GetSchoolData);