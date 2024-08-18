require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const User = require("./models/User");
const Message = require("./models/Message");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello");
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("userConnected", async (userId) => {
    try {
      socket.userId = userId;
      socket.join(userId);
      console.log(`User connected with ID: ${userId}`);
      await User.findByIdAndUpdate(userId, { online: true });
      io.emit("userStatusUpdate", { userId, online: true });
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  });

  socket.on("userDisconnected", async (userId) => {
    try {
      await User.findByIdAndUpdate(userId, { online: false });
      io.emit("userStatusUpdate", { userId, online: false });
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  });

  socket.on("typing", ({ selectedUser, userId }) => {
    socket.to(selectedUser._id).emit("typing", userId);
    console.log(`User ${userId} is typing to ${selectedUser._id}`);
  });

  socket.on("stopTyping", ({ selectedUser, userId }) => {
    console.log(selectedUser);
    socket.to(selectedUser?._id).emit("stopTyping", userId);
    console.log(`User ${userId} stopped typing to ${selectedUser?._id}`);
  });

  socket.on("sendMessage", async (messageData) => {
    try {
      const { senderId, receiverId, content, type } = messageData;

      if (!senderId || !receiverId || !content || !type) {
        socket.emit("error", "Invalid message data");
        return;
      }

      const newMessage = new Message({
        content,
        senderId,
        receiverId,
        type,
      });

      await newMessage.save();
      io.to(receiverId).emit("receiveMessage", newMessage);

      socket.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving or emitting message:", error);
      socket.emit("error", "Failed to save message");
    }
  });

  socket.on("disconnect", async () => {
    console.log("A user disconnected:", socket.id);
    if (socket.userId) {
      await User.findByIdAndUpdate(socket.userId, { online: false });
      io.emit("userStatusUpdate", { userId: socket.userId, online: false });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
