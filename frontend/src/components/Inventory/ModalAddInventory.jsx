import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '65%',
    padding               : '1 rem',
    border                : 'none',
  },
  overlay : {
    backgroundColor       : 'rgba(0, 0, 0, 0.2)',
    backdropFilter        : 'blur(5px)',
  }
};

const ModalAddInventory = ({isOpen, onRequestClose}) => {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tgl_kepemilikan, setTglKepemilikan] = useState("");
    const [status, setStatus] = useState("Tersedia"); // initialize to a default value
    const [peminjam, setPeminjam] = useState([]);
    const [gambar, setGambar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

        const formData = new FormData(); // create FormData object
        formData.append("gambar", gambar); // append the selected image to FormData
        formData.append("nama", nama); // append other form data to FormData
        formData.append("deskripsi", deskripsi);
        formData.append("tgl_kepemilikan", tgl_kepemilikan);
        formData.append("status", status);
        formData.append("list_peminjam", peminjam.map(p => p.value));
        // formData.append("list_peminjam", JSON.stringify(peminjam.map(p => p.value)));


        try {
          const token = localStorage.getItem('token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`/api/inventory/?nama=${nama}`);
          await axios.post('/api/inventory/create', formData);
          window.alert('Inventaris berhasil ditambahkan!');
          onRequestClose();
          // navigate('/inventories');
          window.location.reload()
        } catch (error) {
          console.error('Error creating note:', error);
        }
    };

    const handleImage = (event) => {
      const file = event.target.files[0];
      setGambar(file);
    };    

    //masih statis
    const options = [
      { value: 'Tidak ada', label: 'Tidak ada'},
      { value: '201524049 - Lamda Richo Vanjaya Sumaryadi', label: '201524049 - Lamda Richo Vanjaya Sumaryadi' },
      { value: '201524045 - Fiora Berliana Putri', label: '201524045 - Fiora Berliana Putri' },
      { value: '201524055 - Nauval Ozora Mahadri', label: '201524055 - Nauval Ozora Mahadri'},
      { value: '201524060 - Vani Anjelina Rangkuti', label: '201524060 - Vani Anjelina Rangkuti' },
      { value: '201524037 - Alvin Mulia Putra', label: '201524037 - Alvin Mulia Putra' },
      { value: '201524043 - Arief Nur Rachman', label: '201524043 - Arief Nur Rachman' },
      { value: '201524056 - Novian Afiq', label: '201524056 - Novian Afiq' },
      { value: '201524048 - Halimatussadiyah', label: '201524048 - Halimatussadiyah' },
      { value: '201524052 - Muhammad Rifqi Hidayatullah', label: '201524052 - Muhammad Rifqi Hidayatullah' },
      { value: '201524042 - Satria Akhmad Ihsani', label: '201524042 - Satria Akhmad Ihsani' },
    ];
    
  
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
                    required="true"
                    />
                    <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 20</p>
                  </div>
                  {/* Tanggal Kepemilikan */}
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
                <div className="ml-6 right overflow-hidden">
                  {/* List Peminjam */}
                  <div className="mb-6 w-96">
                    <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="status">
                      List Peminjam
                    </label>
                    <Select
                      options={options}
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
                    required="true"
                    />
                    <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 40</p>
                  </div>

                  {/* Gambar */}
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
                 Tambah
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

export default ModalAddInventory;