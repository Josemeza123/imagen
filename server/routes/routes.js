const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../image"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileUpload = multer({ storage: diskstorage }).single("image");

router.get("/", (req, res) => {
  res.send("hola");
});

router.post("/image/post", fileUpload, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("error de servidor");

    const type = req.file.mimetype;
    const nombre = req.file.originalname;
    const data = fs.readFileSync(
      path.join(__dirname, "../image/" + req.file.filename)
    );
    conn.query(
      "INSERT INTO image set ?",
      [{ type, nombre, data }],
      (err, rows) => {
        if (err) return res.status(500).send("error de servidor");
        res.send("image saved");
      }
    );
  });
});

router.get("/image/get", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("error de servidor");

    conn.query("SELECT * FROM image", (err, rows) => {
      if (err) return res.status(500).send("error de servidor");

      rows.map((img) => {
        fs.writeFileSync(
          path.join(__dirname, "../dbimages/" + img.id + ".png"),
          img.data
        );
      });
    const imageDir=  fs.readdirSync(path.join(__dirname, "../dbimages/"))

      res.json(imageDir);
      console.log(rows);
    });
  });
});

module.exports = router;
