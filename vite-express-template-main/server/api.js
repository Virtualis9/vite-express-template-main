// server/index.js

const express = require("express");
const users = [
    {
        "id": 1,
        "name": "Gerald"
    },
    {
        "id": 2,
        "name": "Sam"
    },
    {
        "id": 3,
        "name": "Holly"
    },
    {
        "id": 4,
        "name": "Twitch"
    }
];

const projects = [
    {
        "id": 1,
        "name": "PMF Calculator"
    },
    {
        "id": 2,
        "name": "Electronic risk assessments"
    },
    {
        "id": 3,
        "name": "Gas Simulation game"
    },
    {
        "id": 4,
        "name": "Electronic stores order sheet"
    },
    {
        "id": 5,
        "name": "John dick game"
    },
    {
        "id": 6,
        "name": "Printing Website"
    },



]


function getInput(input){
    console.log(input)

}

const app = express();

const PORT = 3001;

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.get("/api/projects", (req, res ) => {
    return res.json(projects);
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));