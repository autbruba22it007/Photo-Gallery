const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");

// STORAGE CONFIG

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, "uploads/");
    },
    filename: (req, file,cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage});

// UPLOAD IMAGE

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file); // debug
    console.log(req.body);

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { folder_id } = req.body;
    const filename = req.file.filename;
    const filepath = `/uploads/${filename}`;

    const result = await db.query(
      "INSERT INTO images (folder_id, filename, filepath) VALUES ($1, $2, $3) RETURNING *",
      [folder_id, filename, filepath]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("Server Error");
  }
});

router.get("/:folderId", async (req, res) => {
  try {
    const { folderId } = req.params;

    const result = await db.query(
      "SELECT * FROM images WHERE folder_id = $1 ORDER BY uploaded_at DESC",
      [folderId]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


// router.get("/", async (req, res) => {
//   try {
//     const folder_id = 8;
//     const filename = "test-image.jpg";
//     const filepath = `/uploads/${filename}`;

//     const result = await db.query(
//       "INSERT INTO images (folder_id, filename, filepath) VALUES ($1, $2, $3) RETURNING *",
//       [folder_id, filename, filepath]
//     );

//     res.json(result.rows[0]);

//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(500).send("Server Error");
//   }
// });

router.delete ("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query ("DELETE FROM images WHERE id = $1", [id]);

    res.json({message: "Image delete successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
