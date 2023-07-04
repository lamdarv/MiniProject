const Post = require("../models/post");

exports.create = async (req, res) => {
    const schema = new Post({
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      tgl_kepemilikan: req.body.tgl_kepemilikan,
      list_peminjam: req.body.list_peminjam,
      status: req.body.status,
      user: req.user._id, // Menggunakan ID pengguna yang sedang login
    });
    try {
      const schemaCreate = await schema.save();
      res.json(schemaCreate);
    } catch (e) {
      console.error(e);
      res.status(500).send("error");
    }
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
		const schemaUpdate = await Post.updateOne(
			{ _id: req.params.id },
			{
				nama: req.body.nama,
				deskripsi: req.body.deskripsi,
				tgl_kepemilikan: req.body.tgl_kepemilikan,
				list_peminjam: req.body.list_peminjam,
				status: req.body.status,
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
		const schemaDelete = await Post.deleteOne({ _id: req.params.id });
		res.json(schemaDelete);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};
