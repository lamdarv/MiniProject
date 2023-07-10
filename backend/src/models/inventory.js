const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
	{	
		peminjam: {
			type : String,
			required: false
		},
		nama: {
			type: String,
			required: true,
			unique: true,
		},
		deskripsi: {
			type: String,
			required: true,
		},
		tgl_kepemilikan: {
			type: Date,
			required: true,
		},
		list_peminjam: {
			type: [{
				nama: {
					type: String,
					required: false,
				},
				nim: {
					type: String,
					required: false,
				}
			}],
			required: false,
		},
		status: {
			type: String,
			required: true,
		},
		check: {
			type: String,
			required: false,
		},
		gambar: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Inventory", siteSchema, "Inventory");
