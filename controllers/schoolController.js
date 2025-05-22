import { connection } from "../Model/datbase.js";

export const AddSchoolData = async (req, res) => {
    try {
        // incoming data from the client

        const { schoolName, address, latitude, longitude } = req.body;

        //  validation for strings and integer values
        if (
            !schoolName || schoolName.trim() === "" || typeof schoolName !== "string" ||
            !address || address.trim() === "" || typeof address !== "string" ||
            latitude === undefined || typeof latitude !== "number" || isNaN(latitude) ||
            longitude === undefined || isNaN(longitude) || typeof longitude !== "number"
        ) {
            return res.status(400).json({ status: false, message: "Invalid data" });
        }

        const InsertQuery = `INSERT INTO schools (name,address,latitude,longitude) VALUES(?,?,?,?)`;
        const [result] = await connection.promise().query(InsertQuery, [schoolName, address, latitude, longitude]);

        if (!result || result.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Error while creating a school entry" });
        }
        return res.json({ status: true, message: "School entry has been created" });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


export const GetSchoolData = async (req, res) => {
    try {
        
        const { latitude, longitude } = req.params;
        // the range set by the user
        const { maxDistance } = req.query;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const distanceLimit = parseFloat(maxDistance) || 5;
        //  validation for strings and integer values

        if (
            isNaN(lat) || isNaN(lon) || isNaN(distanceLimit) ||
            lat < -90 || lat > 90 ||
            lon < -180 || lon > 180 ||
            distanceLimit <= 0
        ) {
            return res.status(400).json({ status: false, message: "Invalid coordinates or distance" });
        }

        const SearchQuery = `
            SELECT *, 
                (6371 * ACOS(
                    COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) + 
                    SIN(RADIANS(?)) * SIN(RADIANS(latitude))
                )) AS distance
            FROM schools
            HAVING distance <= ?
            ORDER BY distance ASC
        `;

        const [result] = await connection.promise().query(SearchQuery, [lat, lon, lat, distanceLimit]);

        if (result.length === 0) {
            return res.status(200).json({ status: true, message: "No schools are found near your location" })
        }

        return res.status(200).json({ status: true, data: result });



        // GET /api/schools/30.1234/78.1234?maxDistance=10



    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}