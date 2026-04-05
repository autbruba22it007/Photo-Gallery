const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");  


const app = express();

// Auto-create uploads folder
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());


const folderRoutes = require("./routes/folderRoutes");
app.use("/api/folders", folderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const imageRoutes = require("./routes/imageRoutes");
app.use("/api/images", imageRoutes);

// app.get("/", (req, res) => {
//    res.send("Backend Running 🔥");
// });

app.listen(5000, () => {
   console.log("Server running on port 5000");
});