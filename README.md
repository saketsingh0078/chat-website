Chat Website

## Overview
This is a real-time chat application built using modern web technologies. It allows users to communicate in real-time with a smooth and responsive user interface. The project stack includes:

## Frontend: React (Vite) with Tailwind CSS
## Backend: Node.js with Express
## Database: MongoDB
## Real-time Communication: Socket.IO

## Features
Real-time Messaging: Users can send and receive messages instantly without refreshing the page.
Online/Offline Status: The application displays the online/offline status of users.
Typing Indicator: Displays a "Typing..." indicator when a user is typing a message.
Image Upload: Users can upload and share images in the chat.
Infinite Scrolling: Messages are loaded as you scroll up, providing access to chat history without initial load delays.

### Clone the Repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
## Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
Create a .env file in the backend directory with the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
npm start
```

## Frontend Setup
```bash
cd frontend
npm install
npm start
```
## FIle Structure
Backend/
│
├── models/
│   ├── User.js
│   └── Message.js
│
├── routes/
│   ├── auth.js
│   ├── user.js
│   └── message.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── messageController.js
│
├── uploads/
│
├── index.js
└── config.js


Frontend/
src/
|-- components/
|   |-- ChatWindow/
|   |   |-- ChatWindow.js
|   |   |-- UserList.js
|   |   |-- ChatHeader.js
|   |   |-- MessageList.js
|   |   |-- Message.js
|   |   |-- ChatInput.js
|   |-- User.js
|   |-- SearchBar.js
|   |-- NotificationBar.js


