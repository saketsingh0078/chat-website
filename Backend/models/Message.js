const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ["text", "image"], required: true },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
