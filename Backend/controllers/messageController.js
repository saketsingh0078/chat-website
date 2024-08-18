const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.getMessagesWithUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.otherUserId;
    const { lastMessageId } = req.query;

    const query = {
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    };

    if (lastMessageId) {
      query._id = { $lt: mongoose.Types.ObjectId(lastMessageId) };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
