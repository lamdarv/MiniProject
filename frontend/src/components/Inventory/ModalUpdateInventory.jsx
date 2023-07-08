import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '65%',
    padding: '1 rem',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(5px)',
  }
};

const ModalUpdateInventory = ({ isOpen, onRequestClose, inventoryId }) => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tgl_kepemilikan, setTglKepemilikan] = useState(new Date());
  const [status, setStatus] = useState('');
  const [peminjam, setPeminjam] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [peminjamOptions, setPeminjamOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getInventoryById();
    fetchPeminjamList();
  }, [inventoryId]);

  const getInventoryById = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.get(`/api/inventory/${inventoryId}`);
      const { nama, deskripsi, tgl_kepemilikan, status, list_peminjam } = response.data;
      setNama(nama);
      setDeskripsi(deskripsi);
      setTglKepemilikan(new Date(tgl_kepemilikan));
      setStatus(status);

      const formattedPeminjam = list_peminjam.map((p) => ({
        value: { nim: p.nim, name: p.name },
        label: `${p.nim} - ${p.name}`,
      }));
      setPeminjam(formattedPeminjam);

      setGambar(gambar);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  
  const updatePost = async (event) => {
    event.preventDefault();
  
    const specialCharsRegex = /[^\w\s]/gi;
    const hasSpecialChars = specialCharsRegex.test(nama) || specialCharsRegex.test(deskripsi);
  
    if (hasSpecialChars) {
      window.alert('Invalid Data!');
      return;
    }
  
    let formattedPeminjam = [];
    if (peminjam && peminjam.length > 0) {
      formattedPeminjam = peminjam.map((p) => ({
        nim: p.value.nim,
        name: p.value.name,
      }));
    }
  
    const formData = new FormData();
    formData.append('gambar', gambar);
    formData.append('nama', nama);
    formData.append('deskripsi', deskripsi);
    formData.append('tgl_kepemilikan', tgl_kepemilikan);
    formData.append('status', status);
    // Mengirim formattedPeminjam sebagai array of objects
    formattedPeminjam.forEach((peminjamObj, index) => {
      formData.append(`list_peminjam[${index}][nim]`, peminjamObj.nim);
      formData.append(`list_peminjam[${index}][name]`, peminjamObj.name);
    });
  
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.patch(`/api/inventory/${inventoryId}`, formData);
      window.alert('Inventaris berhasil diupdate!');
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  

  const handleImage = (event) => {
    const file = event.target.files[0];
    setGambar(file);
  };

  const fetchPeminjamList = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/api/user/all/users');
      const responseData = response.data.users;

      const peminjamList = responseData.map((user) => ({
        value: { nim: user.nim, name: user.name },
        label: `${user.nim} - ${user.name}`,
      }));

      setPeminjamOptions(peminjamList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      inventoryId={inventoryId}
      style={customStyles}
      className="relative inset-0 z-50 overflow-auto "
    >
      <div className="bg-white rounded-lg shadow-md">
        <div className="rounded-lg shadow-md p-6">
          <form onSubmit={updatePost} className="">
            <div className='mt-10 mb-10 flex place-content-around'>
              {/* Left Column */}
              <div className="left">
                {/* Nama Inventaris */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="nama">
                    Nama Inventaris
                  </label>
                  <input
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="nama"
                    type="text"
                    maxLength="20"
                    placeholder="Masukkan data inventaris"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 20</p>
                </div>
                {/* Tanggal Kepemilikan */}
                <div className="mb-6 relative">
                  <label
                    className="font-quicksand block font-semibold text-black mb-2"
                    htmlFor="tgl_kepemilikan"
                  >
                    Tanggal Kepemilikan
                  </label>
                  <DatePicker
                    selected={tgl_kepemilikan}
                    onChange={(date) => setTglKepemilikan(date)}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="tgl_kepemilikan"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Masukkan tanggal kepemilikan"
                    required
                    showPopperArrow={false}
                  />
                </div>
                {/* Status Ketersediaan */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="status">
                    Status Ketersediaan
                  </label>
                  <select
                    id="status"
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Tidak Tersedia">Tidak Tersedia</option>
                  </select>
                </div>
              </div>
              {/* Right Column */}
              <div className="ml-6 right">
                {/* List Peminjam */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="status">
                    List Peminjam
                  </label>
                  <Select
                    options={peminjamOptions}
                    value={peminjam}
                    onChange={setPeminjam}
                    placeholder="Cari atau pilih peminjam"
                    isSearchable={true}
                    isMulti={true}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    isRequired={false}
                  />
                </div>
                {/* Deskripsi */}
                <div className=" mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="deskripsi">
                    Deskripsi
                  </label>
                  <textarea
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="deskripsi"
                    placeholder="Describe here..."
                    maxLength="40"
                    rows="1"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    required
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 40</p>
                </div>
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="gambar">
                    Gambar
                  </label>
                  <input
                    type="file"
                    id="gambar"
                    accept="image/*"
                    onChange={handleImage}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="font-quicksand bg-custom-green-1 hover:bg-custom-green-2 text-white font-bold py-1 px-7 rounded-40 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
              <button className="font-quicksand bg-white hover:drop-shadow-xl text-black font-normal py-1 px-7 rounded-[4px] focus:outline-none focus:shadow-outline hover:drop-shadow-xl" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdateInventory;
