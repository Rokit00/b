//App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import DebateList from "./components/debate/DebateList";
import SectionTwo from "./components/sections/SectionTwo"; // SectionTwo 컴포넌트 임포트
import DebateDetail from "./components/debate/DebateDetail";
import LoginModal from "./components/login/LoginModal";
import { AuthProvider } from "./hook/AuthContext";
import Signup from "./components/login/Signup";
import NewDebate from "./components/debate/NewDebate";
import Mychemilist from "./components/mypages/Mychemilist";
import Mydiscussion from "./components/mypages/Mydiscussion";
import Myinfor from "./components/mypages/Myinfor";
import Qa from "./components/mypages/Qa";
import DeleteAccount from "./components/mypages/DeleteAccount";

import NavBar from "./components/nav_bar/NavBar";
function App () {
  return (
    <AuthProvider>
      
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<DebateList />} />
          <Route path="/post/:id" element={<DebateDetail />} />
          <Route path="/section2/:data" element={<SectionTwo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/newDebate" element={<NewDebate />} />
          <Route path="/Mychemilist" element={<Mychemilist />} />
          <Route path="/Mydiscussion" element={<Mydiscussion />} />
          <Route path="/profile" element={<Myinfor />} />
          <Route path="/Q&A" element={<Qa />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
