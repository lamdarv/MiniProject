const mongoose = require("mongoose");

const pinjamSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    tujuan: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    check: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Peminjaman", pinjamSchema, "Peminjaman");
