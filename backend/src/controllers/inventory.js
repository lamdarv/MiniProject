const Inventory = require("../models/inventory");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DIR = './public/';

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
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

exports.create = async (req, res) => {
	try {
		upload.single("gambar")(req, res, async function (err) {
		  if (err instanceof multer.MulterError) {
			console.log(err);
			return res.status(400).json("Multer Error: " + err.message);
		  } else if (err) {
			console.log(err);
			return res.status(400).json("Error: " + err.message);
		  }
		  const url = req.protocol + '://' + req.get('host')
		  const schema = new Inventory({
			nama: req.body.nama,
			deskripsi: req.body.deskripsi,
			tgl_kepemilikan: req.body.tgl_kepemilikan,
			list_peminjam: req.body.list_peminjam,
			status: req.body.status,
			gambar: url + '/public/' + req.file.filename,
			user: req.user._id, // Menggunakan ID pengguna yang sedang login
		  });
	
		  const schemaCreate = await schema.save();
		  res.json(schemaCreate);
		//   const imageUrl = 'URL_GAMBAR'; 
		//   res.json({ url: imageUrl });
		});
	  } catch (e) {
		console.error(e);
		res.status(500).send("error");
	  }
  };
  

  
exports.getAll = async (req, res) => {
	try {
		const schemaGetAll = await Inventory.find();
		res.json(schemaGetAll);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.get = async (req, res) => {
	try {
		const schemaGet = await Inventory.findOne({ _id: req.params.id });
		res.json(schemaGet);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.update = async (req, res) => {
	try {
		upload.single("gambar")(req, res, async function (err) {
		  if (err instanceof multer.MulterError) {
			console.log(err);
			return res.status(400).json("Multer Error: " + err.message);
		  } else if (err) {
			console.log(err);
			return res.status(400).json("Error: " + err.message);
		  }

		  const url = req.protocol + '://' + req.get('host')
		  const schemaUpdate = await Inventory.updateOne(
			{ _id: req.params.id },
			{
			  nama: req.body.nama,
			  deskripsi: req.body.deskripsi,
			  tgl_kepemilikan: req.body.tgl_kepemilikan,
			  list_peminjam: req.body.list_peminjam,
			  status: req.bodystatus,
			  gambar: url + '/public/' + req.file.filename,
			  user: req.user._id, // Menggunakan ID pengguna yang sedang login
			  check: req.user.check
			}
		  );
		  res.json(schemaUpdate);
		});
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
