import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
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

const ModalBorrowInventory = ({ isOpen, onRequestClose, inventoryId }) => {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const [tujuan, setTujuan] = useState("");
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState("pending");

  const navigate = useNavigate();

  useEffect(() => {
    getInventoryById();
  }, [inventoryId]);

  const getInventoryById = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`/api/inventory/${inventoryId}`);
      
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };
  
  const handlePinjam = async (event) => {
    event.preventDefault();

    const specialCharsRegex = /[^\w\s]/gi;
    const hasSpecialChars = specialCharsRegex.test(nama) || specialCharsRegex.test(tujuan);

    if (hasSpecialChars) {
      window.alert('Invalid Data!');
      return;
    }

    if (!nama || !tanggal || !tujuan || !file) {
      window.alert('Semua field harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("tujuan", tujuan);
    formData.append("tanggal", tanggal);
    formData.append("check", check);
    formData.append("inventoryId", inventoryId);

    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post(`api/peminjaman/pinjam/${inventoryId}`, formData);
      window.alert('Peminjaman Inventaris berhasil diproses!');
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
          <form onSubmit={handlePinjam} className="">
            <div className="top">
              <h2 className='ml-3 pl-3 font-bold text-xl'>Ajukan Peminjaman</h2>
            </div>
            <div className='mt-10 mb-10 flex place-content-around'>
              <div className="left">
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="nama">
                    Nama Penanggung Jawab
                  </label>
                  <input
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="nama"
                    type="text"
                    maxLength="20"
                    placeholder="Masukkan nama penanggung jawabnya"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 20</p>
                </div>
                <div className="mb-6 relative w-full">
                  <label
                    className="font-quicksand block font-semibold text-black mb-2"
                    htmlFor="tanggal"
                  >
                    Tanggal 
                  </label>
                  <DatePicker
                    selected={tanggal}
                    onChange={(date) => setTanggal(date)}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="tanggal"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Masukkan tanggal pinjam"
                    required
                    showPopperArrow={false}
                  />
                </div>
              </div>
              <div className="ml-6 right overflow-hidden">
                <div className=" mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="tujuan">
                    Tujuan
                  </label>
                  <textarea
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="tujuan"
                    placeholder="Masukkan tujuan peminjaman"
                    maxLength="40"
                    rows="1"
                    value={tujuan}
                    onChange={(e) => setTujuan(e.target.value)}
                    required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 40</p>
                </div>
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="gambar">
                    File
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="application/pdf"
                    onChange={handleFile}
                    required
                  />
                </div>
                <input
                    type="hidden"
                    id="inventoryId"
                    value={inventoryId}
                  />
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
