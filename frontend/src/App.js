import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavbarAdmin from "./components/Common/NavbarAdmin";
import InventoryAdmin from "./pages/InventoryAdmin";
import Profile from "./pages/Profile";
import InventoryMhs from "./pages/InventoryMhs";
import NotificationAdmin from "./pages/NotificationAdmin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/inventories"
            element={
              localStorage.getItem("role") === "admin" ? (
                <InventoryAdmin />
              ) : (
                <Navigate to="/inventories" />
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/inventories-mhs"
            element={
              localStorage.getItem("role") === "mahasiswa" ? (
                <InventoryMhs />
              ) : (
                <Navigate to="/inventories-mhs" />
              )
            }
          />
          <Route path="/notification-admin" element={<NotificationAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
