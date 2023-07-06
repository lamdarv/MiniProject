const Post = require("../models/post");
const Notification = require("../models/Notification");

exports.create = async (req, res) => {
	const schema = new Post({
	  nama: req.body.nama,
	  deskripsi: req.body.deskripsi,
	  tgl_kepemilikan: req.body.tgl_kepemilikan,
	  list_peminjam: req.body.list_peminjam,
	  status: req.body.status, // Setel status menjadi "pending" secara default
	  peminjam: req.user._id, // Menggunakan ID pengguna yang sedang login
	  check:"pending"
	});
	try {
	  const schemaCreate = await schema.save();
	  res.json(schemaCreate);
	} catch (e) {
	  console.error(e);
	  res.status(500).send("error");
	}
  };
  
  
  exports.approvePost = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const post = await Post.findById(id);
	  if (!post) {
		return res.status(404).json({ message: 'Post not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  post.check = 'approved';
	  await post.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		postId: post._id,
		userId: req.user._id,
		action: 'approve',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'Post approved', post });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error approving post' });
	}
  };
  
  

  exports.rejectPost = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const post = await Post.findById(id);
	  if (!post) {
		return res.status(404).json({ message: 'Post not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  post.check = 'rejected';
	  await post.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		postId: post._id,
		userId: req.user._id,
		action: 'reject',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'Post rejected', post });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error rejected post' });
	}
  };
  
  

  exports.getAllApproved = async (req, res) => {
	try {
	  const schemaGetAll = await Post.find({ status: "approved" });
	  res.json(schemaGetAll);
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
