const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
	{
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
			type: [String],
			required: false,
		},
		status: {
			type: String,
			required: true,
		},

	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", siteSchema, "Post");
