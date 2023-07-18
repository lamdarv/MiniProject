const express = require("express");
const peminjamanController = require("../controllers/peminjaman");
const router = express.Router();

router.get("/:id", peminjamanController.get);
router.get("/", peminjamanController.getAll);
router.post("/pinjam/:id", peminjamanController.createPinjam);
router.patch("/:id", peminjamanController.update);
router.delete("/:id", peminjamanController.delete);

router.post("/approve/:id", peminjamanController.approvePeminjaman);
router.post("/reject/:id", peminjamanController.rejectPeminjaman);
router.get("/approve/:check", peminjamanController.getAllApproved);
router.get("/reject/:check", peminjamanController.getAllRejected);

// Rute untuk mengakses file PDF
router.get("/dokumen/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../dokumen", filename);
  res.sendFile(filePath);
});

module.exports = router;
