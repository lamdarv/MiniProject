import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NavbarAdmin from './components/Common/NavbarAdmin';
import InventoryAdmin from './pages/InventoryAdmin';
import Profile from './pages/Profile';
import InventoryMhs from './pages/InventoryMhs';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/inventories" element={<InventoryAdmin/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/inventories-mhs" element={<InventoryMhs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
