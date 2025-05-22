import { connection } from "./datbase.js"


const createSchoolTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS schools(
       id SERIAL PRIMARY KEY,
       name VARCHAR(500),
       address VARCHAR(500),
       latitude FLOAT,
       longitude FLOAT
    )`;

        


    try {
        await connection.promise().query(query);

        // await connection.promise().query(query);
        console.log("table has been created");
    } catch (error) {
        console.error("Error while creating schoolstable", error);
    }
}

createSchoolTable();