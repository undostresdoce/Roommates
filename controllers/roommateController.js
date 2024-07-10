const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const axios = require("axios");

const addRoommate = async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    const roommate = {
      id: uuidv4(),
      nombre: `${user.name.first} ${user.name.last}`,
      debe: 0,
      recibe: 0,
    };

    let data = JSON.parse(fs.readFileSync("./roommates.json"));
    data.roommates.push(roommate);
    fs.writeFileSync("./roommates.json", JSON.stringify(data));
    res.status(201).json({ message: "Roommate added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding roommate" });
  }
};

const getRoommates = (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./roommates.json"));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving roommates" });
  }
};

module.exports = { addRoommate, getRoommates };
