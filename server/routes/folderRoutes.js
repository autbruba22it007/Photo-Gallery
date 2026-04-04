const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE FOLDER
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await db.query(
      "INSERT INTO folders(name) VALUES($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// DELETE FOLDER
router.delete("/:id", async(req, res) => {
  try {
    const {id} = req.params;

    await db.query("DELETE FROM folders  WHERE id = $1",[id]);

    res.json({ message: "Folder delete successfully"});
  } catch (err){
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// UPDATE FOLDER NAME
router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    const result = await db.query(
      "UPDATE folders SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


// GET ALL FOLDERS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM folders ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;