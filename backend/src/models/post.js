const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
	{	
		peminjam: {
			type : String,
			required: true
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
			type: [String],
			required: false,
		},
		status: {
			type: String,
			required: true,
		},
		check: {
			type: String,
			required: true,
		},

	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", siteSchema, "Post");
