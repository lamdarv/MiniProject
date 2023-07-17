import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NavbarAdmin from './components/Common/NavbarAdmin';
import InventoryAdmin from './pages/InventoryAdmin';
import Profile from './pages/Profile';
import InventoryMhs from './pages/InventoryMhs';
import Notifikasi from './pages/Notifikasi';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/test-navbar" element={<NavbarAdmin/>} />
          <Route path="/inventories" element={<InventoryAdmin/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/inventories-mhs" element={<InventoryMhs/>} />
          <Route path="/notifikasi" element={<Notifikasi/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
