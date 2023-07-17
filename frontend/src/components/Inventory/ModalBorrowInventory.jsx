import React, { useState, useEffect } from 'react';
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

const ModalBorrowInventory = ({ isOpen, onRequestClose }) => {
  const [nama, setNama] = useState("");
  const [tgl_kepemilikan, setTglKepemilikan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [status, setStatus] = useState("Tersedia");
  const [peminjam, setPeminjam] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [peminjamOptions, setPeminjamOptions] = useState([]);

  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const specialCharsRegex = /[^\w\s]/gi;
    const hasSpecialChars = specialCharsRegex.test(nama) || specialCharsRegex.test(deskripsi);

    if (hasSpecialChars) {
      window.alert('Invalid Data!');
      return;
    }

    if (!nama || !deskripsi || !tgl_kepemilikan || !status || !peminjam) {
      window.alert('Semua field harus diisi!');
      return;
    }

    const formattedPeminjam = peminjam.map(p => ({ nim: p.value.nim, nama: p.value.name }));

    const formData = new FormData();
    formData.append("gambar", gambar);
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("tgl_kepemilikan", tgl_kepemilikan);
    formData.append("status", status);
    formData.append("list_peminjam", JSON.stringify(formattedPeminjam));

    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('/api/inventory/create', formData);
      window.alert('Inventaris berhasil ditambahkan!');
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setGambar(file);
  };

  useEffect(() => {
    fetchPeminjamList();
  }, []);

  const fetchPeminjamList = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get("/api/user/all/users");
      const responseData = response.data.users;

      const peminjamList = responseData.map((user) => ({
        value: { nim: user.nim, name: user.name },
        label: `${user.nim} - ${user.name}`,
      }));

      setPeminjamOptions(peminjamList);

      console.log(peminjamList);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      className="relative inset-0 z-50 overflow-auto "
    >
      <div className="bg-white rounded-lg shadow-md ">
        <div className="rounded-lg shadow-md p-6 ">
          <form onSubmit={handleSubmit} className="">
            <div className="top">
              <h2 className='ml-3 pl-3 font-bold text-xl'>Ajukan Peminjaman</h2>
            </div>
            <div className='mt-10 mb-10 flex place-content-around'>
              <div className="left">
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
                    required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 20</p>
                </div>
                <div className="mb-6 relative w-full">
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
              <div className="ml-6 right overflow-hidden">
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
                    required="true"
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
              <button className="mr-3 font-quicksand bg-main-blue hover:drop-shadow-xl text-white font-normal py-1 px-7 rounded-[4px] focus:outline-none focus:shadow-outline">
                Ajukan
              </button>
              <button className="font-quicksand bg-white hover:drop-shadow-xl text-black font-normal py-1 px-7 rounded-[4px] focus:outline-none focus:shadow-outline hover:drop-shadow-xl" onClick={onRequestClose}>
                Gak Jadi
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBorrowInventory;
