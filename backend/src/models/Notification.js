const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    check: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'Notifications',
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
