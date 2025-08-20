const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json()); // <-- This is required to parse JSON body
const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'mugdhotest'
})

app.get('/names', (req, res) => {
  const sql = "SELECT * FROM `murgi`";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// POST new name
app.post('/names', (req, res) => {
  const { Name, AGE } = req.body;
  const sql = "INSERT INTO `murgi` (`Name`, `AGE`) VALUES (?, ?)";
  db.query(sql, [Name, AGE], (err, result) => {
    if (err) return res.json(err);
    // return the inserted row
    const newItem = { ID: result.insertId, Name, AGE };
    return res.json(newItem);
  });
});


// DELETE a name
app.delete('/names/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM `murgi` WHERE ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Deleted successfully" });
  });
});


// Update a name
app.put('/names/:id', (req, res) => {
  const { id } = req.params;
  const { Name, AGE } = req.body;

  if (!Name || !AGE) return res.status(400).json({ error: "Name and AGE are required" });

  const sql = "UPDATE `murgi` SET `Name` = ?, `AGE` = ? WHERE `ID` = ?";
  db.query(sql, [Name, AGE, id], (err, result) => {
    if (err) return res.json(err);
    return res.json({ ID: id, Name, AGE });
  });
});





app.get('/', (req, res) => {
  return res.json("From BACkend Side");
})

app.listen(4000, () => {
  console.log("listening");
})