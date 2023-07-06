const Inventory = require("../models/inventory");
const Notification = require("../models/Notification");

exports.create = async (req, res) => {
	const schema = new Inventory({
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
  
  
  exports.approveInventory = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const inventory = await Inventory.findById(id);
	  if (!inventory) {
		return res.status(404).json({ message: 'Inventory not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  inventory.check = 'approved';
	  await inventory.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		inventoryId: inventory._id,
		userId: req.user._id,
		action: 'approve',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'Inventory approved', inventory });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error approving post' });
	}
  };
  
  

  exports.rejectInventory = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Cari postingan berdasarkan ID
	  const inventory = await Inventory.findById(id);
	  if (!inventory) {
		return res.status(404).json({ message: 'Inventory not found' });
	  }
  
	  // Set status postingan menjadi "approved"
	  inventory.check = 'rejected';
	  await inventory.save();
  
	  // Buat notifikasi
	  const notification = new Notification({
		inventoryId: inventory._id,
		userId: req.user._id,
		action: 'reject',
		timestamp: new Date(),
	  });
	  await notification.save();
  
	  res.json({ message: 'Inventory rejected', post });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error rejected post' });
	}
  };
  
  

  exports.getAllApproved = async (req, res) => {
	try {
	  const schemaGetAll = await Inventory.find({ check: "approved" });
	  res.json(schemaGetAll);
	} catch (e) {
	  console.error(e);
	  res.status(500).send("error");
	}
  };

  exports.getAllRejected = async (req, res) => {
	try {
	  const schemaGetAll = await Inventory.find({ check: "rejected" });
	  res.json(schemaGetAll);
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
		const schemaUpdate = await Inventory.updateOne(
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
		const schemaDelete = await Inventory.deleteOne({ _id: req.params.id });
		res.json(schemaDelete);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
};
