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

const ModalUpdateInventory = ({isOpen, onRequestClose, inventoryId}) => {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tgl_kepemilikan, setTglKepemilikan] = useState("");
    const [status, setStatus] = useState("");
    const [peminjam, setPeminjam] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getInventoryById();
    }, [inventoryId]);


    const getInventoryById = async () => {
      try {
        const token = localStorage.getItem('token');
        // Mengatur header dengan token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`/api/inventory/${inventoryId}`);
        setNama(response.data.nama);
        setDeskripsi(response.data.deskripsi);
        setTglKepemilikan(new Date(response.data.tgl_kepemilikan)); // use Date constructor to parse the date string
        setStatus(response.data.status);
        setPeminjam(response.data.list_peminjam);
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
       
      const data = { 
        nama,
        deskripsi, 
        tgl_kepemilikan: tgl_kepemilikan.toISOString(),
        status, 
        list_peminjam: peminjam
      };
    
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.patch(`/api/inventory/${inventoryId}`, data);
        window.alert('Inventaris berhasil diupdate!');
        onRequestClose();
        // navigate('/inventories');
        window.location.reload()
      } catch (error) {
        console.error('Error updating note:', error);
      }
    };
    

    const options = [
      { value: 'Tidak ada', label: 'Tidak ada'},
      { value: '201524049 - Lamda Richo Vanjaya Sumaryadi', label: '201524049 - Lamda Richo Vanjaya Sumaryadi' },
      { value: '201524045 - Fiora Berliana Putri', label: '201524045 - Fiora Berliana Putri' },
      { value: '201524020 - M Azis T', label: '201524045 - Fiora Berliana Putri' },
      { value: '201524021 - Diana F', label: '201524045 - Fiora Berliana Putri' },
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
                  required="true"
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
                    options={options}
                    value={peminjam.map((p) => ({ label: p, value: p }))}
                    onChange={(selectedOptions) => setPeminjam(selectedOptions.map(option => option.value))}
                    placeholder="Cari atau pilih peminjam"
                    isSearchable={true}
                    isMulti={true}
                    isRequired={true}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
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
                  rows="4"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 40</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
                <button
                  className="font-quicksand bg-custom-green-1 hover:bg-custom-green-2 text-white font-bold py-1 px-7 rounded-40 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                <a>Update</a>
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