import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sheet from "../../components/sheet/Sheet";
import Adduser from "../../components/Adduser/Adduser";
import { Routes, Route } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sheet />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
