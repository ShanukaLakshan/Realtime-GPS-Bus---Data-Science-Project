import "./css/style.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./screens/mainComponent/MainLayout";
import Students from "./screens/studentsScreen/Students";
import Staff from "./screens/staffScreen/Staff";
import Update from "./screens/updatesScreen/Update";
import Settings from "./screens/settingsScreen/Settings";
import Lawyer_Dashboard from "./screens/lawyersScreen/Dashboard";
import LandingPage from "./screens/LandingPage";
import Student_Dashboard from "./screens/studentsScreen/Dashboard";
import BasicMap from "./screens/Leaflet/basic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Student_Dashboard />} />
          <Route path="analytics" element={<Lawyer_Dashboard />} />
          <Route path="lawyers" element={<BasicMap />} />
          <Route path="students" element={<Students />} />
          <Route path="staff" element={<Staff />} />
          <Route path="updates" element={<Update />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
