const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getGastos = (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./gastos.json"));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving gastos" });
  }
};

const addGasto = (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    const gasto = {
      id: uuidv4(),
      roommate,
      descripcion,
      monto,
    };

    let data = JSON.parse(fs.readFileSync("./gastos.json"));
    data.gastos.push(gasto);

    let roommatesData = JSON.parse(fs.readFileSync("./roommates.json"));
    const roommateIndex = roommatesData.roommates.findIndex(
      (r) => r.nombre === roommate
    );
    if (roommateIndex >= 0) {
      roommatesData.roommates[roommateIndex].debe += monto;
      fs.writeFileSync("./roommates.json", JSON.stringify(roommatesData));
    }

    fs.writeFileSync("./gastos.json", JSON.stringify(data));
    res.status(201).json({ message: "Gasto added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding gasto" });
  }
};

const updateGasto = (req, res) => {
  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;

    let data = JSON.parse(fs.readFileSync("./gastos.json"));
    const gastoIndex = data.gastos.findIndex((g) => g.id === id);
    if (gastoIndex >= 0) {
      data.gastos[gastoIndex] = { id, roommate, descripcion, monto };
      fs.writeFileSync("./gastos.json", JSON.stringify(data));
      res.status(200).json({ message: "Gasto updated successfully" });
    } else {
      res.status(404).json({ error: "Gasto not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating gasto" });
  }
};

const deleteGasto = (req, res) => {
  try {
    const { id } = req.query;

    let data = JSON.parse(fs.readFileSync("./gastos.json"));
    data.gastos = data.gastos.filter((g) => g.id !== id);
    fs.writeFileSync("./gastos.json", JSON.stringify(data));

    res.status(200).json({ message: "Gasto deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting gasto" });
  }
};

module.exports = { getGastos, addGasto, updateGasto, deleteGasto };
