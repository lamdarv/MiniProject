const Peminjaman = require("../models/peminjaman");
const Inventory = require("../models/inventory");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DIR = './dokumen/';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, DIR);
	},
	filename: (req, file, cb) => {
	  const fileName = file.originalname.toLowerCase().split(' ').join('-');
	  cb(null, uuidv4() + '-' + fileName);
	}
  });

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/pdf" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf format allowed!"));
    }
  }
});

exports.createPinjam = async (req, res) => {
    console.log(req.body);
    try {

    const { id } = req.params;
    
    // Cari postingan berdasarkan ID
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ message: 'not found' });
    }

    upload.single("file")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(400).json("Multer Error: " + err.message);
        } else if (err) {
          console.log(err);
          return res.status(400).json("Error: " + err.message);
        } 

    // Peroleh data pengunggahan file dari 'req.file' setelah menggunakan multer
    const uploadedFile = req.file;

    const url = req.protocol + '://' + req.get('host')
    const pinjam = new Peminjaman({
      nama: req.body.nama,
      tanggal: req.body.tanggal,
      tujuan: req.body.tujuan,
      file: url + '/dokumen/' + uploadedFile.filename,
      inventoryId: inventory,
      userId: req.user._id, // Menggunakan ID pengguna yang sedang login
      check: "pending",
    });

    const schemaPinjam = await pinjam.save();
    res.json(schemaPinjam);
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("error");
  }
};

  
  
  
  
  exports.approvePeminjaman = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const peminjaman = await Peminjaman.findById(id);
	  if (!peminjaman) {
		return res.status(404).json({ message: 'not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  peminjaman.check = 'approved';
	  await peminjaman.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		peminjamanId: peminjaman._id,
		userId: req.user._id,
		action: 'approve',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'Peminjaman approved', inventory });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error approving post' });
	}
  };
  
  

  exports.rejectPeminjaman = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const peminjaman = await Peminjaman.findById(id);
	  if (!peminjaman) {
		return res.status(404).json({ message: 'not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  peminjaman.check = 'rejected';
	  await peminjaman.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		peminjamanId: peminjaman._id,
		userId: req.user._id,
		action: 'reject',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'peminjaman rejected', post });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error rejected post' });
	}
  };
  
  

  exports.getAllApproved = async (req, res) => {
	try {
	  const schemaGetAll = await Peminjaman.find({ check: "approved" });
	  res.json(schemaGetAll);
	} catch (e) {
	  console.error(e);
	  res.status(500).send("error");
	}
  };

  exports.getAllRejected = async (req, res) => {
	try {
	  const schemaGetAll = await Peminjaman.find({ check: "rejected" });
	  res.json(schemaGetAll);
	} catch (e) {
	  console.error(e);
	  res.status(500).send("error");
	}
  };
  
exports.getAll = async (req, res) => {
	try {
		const schemaGetAll = await Peminjaman.find();
		res.json(schemaGetAll);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.get = async (req, res) => {
	try {
		const schemaGet = await Peminjaman.findOne({ _id: req.params.id });
		res.json(schemaGet);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.update = async (req, res) => {
	try {
		  const schemaUpdate = await Peminjaman.updateOne(
			{ _id: req.params.id },
			{
			  nama: req.body.nama,
			  tanggal: req.body.tanggal,
			  tujuan: req.body.tujuan,
			  check: req.body.check,
			  file: req.file ? req.file.filename : undefined,
			}
		  );
		  res.json(schemaUpdate);
	  } catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.delete = async (req, res) => {
	try {
		const schemaDelete = await Inventory.deleteOne({ _id: req.params.id });
		res.json(schemaDelete);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};
