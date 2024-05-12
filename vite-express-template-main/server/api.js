// server/index.js

const express = require("express");

const tasks = [
{
    "id": 1,
    
    
}]

const projects = [
    {
        "id": 1,
        "name": "PMF Calculator",
        "state": false,
        
    },
    {
        "id": 2,
        "name": "Electronic risk assessments",
        "state": false
    },
    {
        "id": 3,
        "name": "Gas Simulation game",
        "state": false
    },
    {
        "id": 4,
        "name": "Electronic stores order sheet",
        "state": false
    },
    {
        "id": 5,
        "name": "John dick game",
        "state": true
    },
    {
        "id": 6,
        "name": "Printing Website",
        "state": false
    },
    {
        "id": 7,
        "name": "HAVS QR code tracker ",
        "state": false
    }



]


function getInput(input){
    console.log(input)

}

const app = express();

const PORT = 3001;

app.get("/api/tasks", (req, res) => {
    return res.json(tasks);
});

app.get("/api/projects", (req, res ) => {
    return res.json(projects);
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));