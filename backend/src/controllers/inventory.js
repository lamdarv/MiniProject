const Post = require("../models/inventory");
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
    cb(null, uuidv4() + '-' + path.extname(file.originalname))
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
	
		  const schema = new Post({
			nama: req.body.nama,
			deskripsi: req.body.deskripsi,
			tgl_kepemilikan: req.body.tgl_kepemilikan,
			list_peminjam: req.body.list_peminjam,
			status: req.body.status,
			gambar: req.file ? req.file.filename : undefined,
			user: req.user._id, // Menggunakan ID pengguna yang sedang login
		  });
	
		  const schemaCreate = await schema.save();
		  res.json(schemaCreate);
		});
	  } catch (e) {
		console.error(e);
		res.status(500).send("error");
	  }
    // const schema = new Post({
    //   nama: req.body.nama,
    //   deskripsi: req.body.deskripsi,
    //   tgl_kepemilikan: req.body.tgl_kepemilikan,
    //   list_peminjam: req.body.list_peminjam,
    //   status: req.body.status,
	//   gambar: req.body.gambar,
    //   user: req.user._id, // Menggunakan ID pengguna yang sedang login
    // });
    // try {
    //   const schemaCreate = await schema.save();
    //   res.json(schemaCreate);
    // } catch (e) {
    //   console.error(e);
    //   res.status(500).send("error");
    // }
  };
  

exports.getAll = async (req, res) => {
	try {
		const schemaGetAll = await Post.find();
		res.json(schemaGetAll);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};

exports.get = async (req, res) => {
	try {
		const schemaGet = await Post.findOne({ _id: req.params.id });
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
	
		  const schemaUpdate = await Post.updateOne(
			{ _id: req.params.id },
			{
			  nama: req.body.nama,
			  deskripsi: req.body.deskripsi,
			  tgl_kepemilikan: req.body.tgl_kepemilikan,
			  list_peminjam: req.body.list_peminjam,
			  status: req.bodystatus,
			  gambar: req.file ? req.file.filename : undefined,
			}
		  );
		  res.json(schemaUpdate);
		});
	  } catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
	// try {
	// 	const schemaUpdate = await Post.updateOne(
	// 		{ _id: req.params.id },
	// 		{
	// 			nama: req.body.nama,
	// 			deskripsi: req.body.deskripsi,
	// 			tgl_kepemilikan: req.body.tgl_kepemilikan,
	// 			list_peminjam: req.body.list_peminjam,
	// 			status: req.body.status,
	// 			gambar: req.body.gambar,
	// 		}
	// 	);
	// 	res.json(schemaUpdate);
	// } catch (e) {
	// 	console.error(e);
	// 	res.status(500).send("error");
	// }
};

exports.delete = async (req, res) => {
	try {
		const schemaDelete = await Post.deleteOne({ _id: req.params.id });
		res.json(schemaDelete);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};
