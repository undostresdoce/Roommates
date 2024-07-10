const express = require("express");
const bodyParser = require("body-parser");
const {
  getRoommates,
  addRoommate,
} = require("./controllers/roommateController");
const {
  getGastos,
  addGasto,
  updateGasto,
  deleteGasto,
} = require("./controllers/gastoController");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/roommate", addRoommate);
app.get("/roommates", getRoommates);

app.get("/gastos", getGastos);
app.post("/gasto", addGasto);
app.put("/gasto", updateGasto);
app.delete("/gasto", deleteGasto);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
