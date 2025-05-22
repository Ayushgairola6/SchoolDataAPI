How to Test the School API
This guide will help you test the two main endpoints of the School API:

Add School (POST /api/addSchool)

List Schools Nearby (GET /api/listSchools/:latitude/:longitude?maxDistance=x)

Prerequisites
Node.js installed on your machine

Your API server running and accessible (e.g., https://schooldataapi.onrender.com)

Postman installed (recommended for API testing)

Testing Steps
1. Start the API Server (if testing locally)
If you’re running the API locally, navigate to your project folder and start the server:

bash
Copy code
npm install         # install dependencies if you haven't already
node index.js       # or your start command to run the server
Make sure the server is running without errors.

2. Import Postman Collection
Download the provided Postman collection JSON file (e.g., SchoolAPICollection.json).

Open Postman and click Import in the top left.

Select the JSON file and import it.

You will see two requests in the collection: Add School and List Schools Nearby.

3. Test Add School API
Select the Add School request.

Go to the Body tab → raw → ensure JSON is selected.

Use the example payload:

json
Copy code
{
  "schoolName": "Green Valley Public School",
  "address": "123 Green Street, Dehradun",
  "latitude": 30.3165,
  "longitude": 78.0322
}
Click Send.

Expected response:

json
Copy code
{
  "status": true,
  "message": "School added successfully"
}
If you send invalid data (e.g., missing fields or wrong types), you should get a 400 error with:

json
Copy code
{
  "status": false,
  "message": "Invalid data"
}
4. Test List Schools Nearby API
Select the List Schools Nearby request.

Update the URL parameters latitude, longitude and optional query maxDistance if you want.

Example URL:

ruby
Copy code
https://schooldataapi.onrender.com/api/listSchools/30.3165/78.0322?maxDistance=5
Click Send.

Expected successful response:

json
Copy code
{
  "status": true,
  "data": [
    {
      "schoolName": "Green Valley Public School",
      "address": "123 Green Street, Dehradun",
      "latitude": 30.3165,
      "longitude": 78.0322,
      "distance": 0.0
    },
    ...
  ]
}
If invalid coordinates or maxDistance are sent, you should get a 400 response with:

json
Copy code
{
  "status": false,
  "message": "Invalid coordinates or distance"
}
5. Additional Tips
Use Postman’s Tests tab to write assertions for automated checking if you want to automate testing.

You can add more schools via Add School to expand your test dataset.

Adjust maxDistance to test different radius filters.

