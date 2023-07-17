import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import NavbarAdmin from '../components/Common/NavbarAdmin';
import Add from '../components/Common/Add';
import ModalDeleteInventory from '../components/Inventory/ModalDeleteInventory';
import ModalUpdateInventory from '../components/Inventory/ModalUpdateInventory';

const NotificationAdmin = () => {
  const [notificationAdmin, setNotificationAdmin] = useState([]);
  const [notificationAdminId, setNotificationAdminId] = useState([]);
  

  const [inventories, setInventories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryId, setInventoryId] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getNotificationAdmin();
  }, []);

  const getNotificationAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("/api/peminjaman", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotificationAdmin(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPDF = async (file) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${file}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Mengatur tipe respons menjadi blob
      });

      // Membuat URL objek dari blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file);
      document.body.appendChild(link);
      link.click();

      // Membersihkan URL objek
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteInventory = async (id) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.delete(`/api/inventory/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     window.alert("Inventaris berhasil dihapus!");
  //     getInventories();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteInventory = async (id) => {
  //   try {
  //     await deleteInventory(id);
  //     setInventoryId(id);
  //     getInventories();
  //     setShowModal(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleEdit = (id) => {
  //   setInventoryId(id);
  //   setShowModalUpdate(true);
  // };

  // const handleModalUpdateClose = () => {
  //   setShowModalUpdate(false);
  //   document.body.classList.remove('overflow-hidden');
  // };

  // const handleModalUpdateOpen = (e) => {
  //   const inventoryId = e.target.dataset.id;
  //   setShowModalUpdate(true);
  //   document.body.classList.add('overflow-hidden');
  // };

  return (
    <div className='relative bg-main-blue-3'>
      <div className="flex min-h-screen">
        <NavbarAdmin />
        <div className="md:container md:mx-auto">
          <div className="flex flex-wrap justify-center">
            {notificationAdmin.length === 0 ? (
              <div className="md:container md:mx-auto">
                <div className="flex justify-center items-center h-screen">
                  <div className="mr-6 ml-[25%] w-[70%] mb-10 bg-white rounded-lg shadow-md p-8">
                    <p className="font-quicksand text-3xl font-bold mb-4 text-center">Inventaris Belum Tersedia!</p>
                    <p className="font-quicksand font-normal text-gray-600 text-lg text-center">Mohon maaf, inventaris belum tersedia. Silakan tambahkan inventaris terlebih dahulu ya!</p>
                  </div>
                </div>
              </div>
            ) : (
              notificationAdmin.map((notifAdmin) => (
                <div key={notifAdmin._id} className="mr-6 ml-[25%] mb-5 mt-5 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
                  <div className='flex'>
                    <table>
                      <tbody>
                        <tr>
                          <td className='font-quicksand font-normal text-md'><strong>Nama Penanggung Jawab</strong></td>
                          <td className='font-quicksand font-normal text-md'>{notifAdmin.nama}</td>
                        </tr>
                        <tr>
                          <td className='font-quicksand font-normal text-md pr-6'><strong>Tujuan</strong></td>
                          <td className='font-quicksand font-normal text-md pr-6'>{notifAdmin.tujuan}</td>
                        </tr>
                        <tr>
                          <td className='font-quicksand font-normal text-md pr-6'><strong>Tanggal Kepemilikan</strong></td>
                          <td className='font-quicksand font-normal text-md pr-6'>{new Date(notifAdmin.tgl_kepemilikan).toLocaleDateString('id-ID')}</td>
                        </tr>
                        <tr>
                          <td className='font-quicksand font-normal text-md pr-6'><strong>File</strong></td>
                          <td className='font-quicksand font-normal text-md pr-6'>{notifAdmin.file}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Tambahkan tombol unduh PDF */}
                  <button className="font-quicksand bg-main-blue hover:drop-shadow-xl text-white font-normal py-1 px-7 rounded-[4px] focus:outline-none focus:shadow-outline" onClick={() => handleDownloadPDF(notifAdmin.file)}>
                    Download PDF
                  </button>
                  {/* <ul className="flex items-center mt-6 justify-center">
                    <li className="rounded-40 bg-custom-green-1 hover:drop-shadow-xl items-center w-28">
                      <Link onClick={() => handleEdit(notifAdmin._id)} data-id={notifAdmin._id} className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center ">
                        <img src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`} alt="Edit_icon" className="pr-3 w-7 h-7" />
                        Edit
                      </Link>
                    </li>
                    <li className="ml-6 rounded-40 bg-custom-red-1 hover:drop-shadow-xl items-center w-28">
                      <Link className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center " onClick={() => setShowModal(notifAdmin._id)}>
                        <img src={`${process.env.PUBLIC_URL}/assets/trash_icon.svg`} alt="Delete_icon" className="pr-3 w-7 h-7" />
                        Delete
                      </Link>
                    </li>
                  </ul> */}
                  {/* {showModal=== inventory._id && (
                    <ModalDeleteInventory visible={true} onClose={() => setShowModal(null)} inventoryId={inventory._id} handleDeleteInventory={handleDeleteInventory} />
                  )}
                  {showModalUpdate && (
                    <ModalUpdateInventory isOpen={true} onRequestClose={handleModalUpdateClose} inventoryId={inventoryId} className="" />
                  )} */}
                </div>
              ))
            )}
          </div>
        </div>
        <Add />
      </div>
    </div>
  );
};

export default NotificationAdmin;
