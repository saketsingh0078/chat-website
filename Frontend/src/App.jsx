import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={auth ? <Navigate to="/chat" /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/signup"
          element={
            auth ? <Navigate to="/chat" /> : <Signup setAuth={setAuth} />
          }
        />
        <Route
          path="/chat"
          element={
            auth ? <ChatWindow userId={userId} /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
