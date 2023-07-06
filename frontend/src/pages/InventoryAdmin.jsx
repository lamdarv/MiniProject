import axios from '../axiosConfig';
import { Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import Dropdown from 'react-dropdown';
// import { FaAngleDown } from 'react-icons/fa';

import NavbarAdmin from '../components/Common/NavbarAdmin';
import Add from '../components/Common/Add';
import ModalDeleteInventory from '../components/Inventory/ModalDeleteInventory';
import ModalUpdateInventory from '../components/Inventory/ModalUpdateInventory';

//post -> inventory
//Posts -> Inventories
//posts -> inventories
//setPosts -> setInventories
//postId -> inventoryId
//setPostId -> setInventoryId
//getPosts -> getInventories
//deletePost -> deleteInventory
//handleDeletePost -> handleDeleteInventory 

const InventoryAdmin = () => {
    const [inventories, setInventories] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => setShowModal(false)
    const [inventoryId, setInventoryId] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModalUpdate, setShowModalUpdate] = useState(false);


    useEffect(() => {
        getInventories();
    }, []);

    const getInventories = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get("/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setInventories(response.data);
    };
    
    const deleteInventory = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/inventory/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            window.alert("Invetaris berhasil dihapus!")
            getInventories();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteInventory = async (id) => {
        try {
            await deleteInventory(id);
            setInventoryId(id);
            getInventories();
            setShowModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
      setInventoryId(id);
      setShowModalUpdate(true);
    };

    const handleModalUpdateClose = () => {
      setShowModalUpdate(false);
      document.body.classList.remove('overflow-hidden');
    }

    const handleModalUpdateOpen = (e) => {
      // setIsClickedCreate(true);
      const inventoryId = e.target.dataset.id;
      setShowModalUpdate(true);
      document.body.classList.add('overflow-hidden');
    };

    const rows = [];
    for (let i = 0; i < inventories.length; i += 2) {
        rows.push(inventories.slice(i, i + 2));
    }

    const options = inventories.map(inventory => ({
      label: inventory.list_peminjam.map(peminjam => <li key={peminjam}>{peminjam}</li>),
      value: inventory.list_peminjam.map(peminjam => <li key={peminjam}>{peminjam}</li>)
    }));

    return (
      <div className='relative bg-main-blue-3'>
        {/* <div className='w-full' id='Top'>
          <Topbar />
        </div> */}
        <div className="flex min-h-screen">
        <NavbarAdmin/>
          <div className="md:container md:mx-auto">
            <div className="flex flex-wrap justify-center">
              {inventories.map(inventory => (
                <div key={inventory._id} className="mr-6 ml-6 mt-10 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
                    <table>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Nama Inventaris</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{inventory.nama}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Deskripsi</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{inventory.deskripsi}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Tanggal Kepemilikan</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{new Date(inventory.tgl_kepemilikan).toLocaleDateString('id-ID')}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Status</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{inventory.status}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>List Peminjam</strong></td>
                        <td>
                        <ul className="font-quicksand font-normal text-lg pr-6">
                            {inventory.list_peminjam.map((peminjam) => (
                            <li key={peminjam}>{peminjam}</li>
                            ))}
                        </ul>
                        </td>
                    </tr>
                    </table>
                  <ul className="flex items-center mt-6 justify-center">
                    <li className="rounded-40 bg-custom-green-1 hover:drop-shadow-xl items-center w-28">
                      <Link onClick={() => handleEdit(inventory._id)} data-id={inventory._id} className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center ">
                        <img src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`} alt="Edit_icon" className="pr-3 w-7 h-7" />
                        Edit
                      </Link>
                    </li>
                    <li className="ml-6 rounded-40 bg-custom-red-1 hover:drop-shadow-xl items-center w-28">
                      <Link className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center " onClick={() => setShowModal(inventory._id)}>
                        <img src={`${process.env.PUBLIC_URL}/assets/trash_icon.svg`} alt="Delete_icon" className="pr-3 w-7 h-7" />
                        Delete
                      </Link>
                    </li>
                  </ul>
                  {showModal === inventory._id && (
                    <ModalDeleteInventory visible={true} onClose={() => setShowModal(null)} inventoryId={inventory._id} handleDeleteInventory={handleDeleteInventory} />
                  )}
                  {showModalUpdate && (
                    <ModalUpdateInventory isOpen={true} onRequestClose={handleModalUpdateClose} inventoryId={inventoryId} className=""/>
                  )}
                </div>
              ))}
            </div>
            {/* <Bottom /> */}
          </div>
          <Add />
        </div>
      </div>
    )
    
}

export default InventoryAdmin