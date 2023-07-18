import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import NavbarAdmin from "../components/Common/NavbarAdmin";
import Add from "../components/Common/Add";
import ModalDeleteInventory from "../components/Inventory/ModalDeleteInventory";
import ModalUpdateInventory from "../components/Inventory/ModalUpdateInventory";

const InventoryAdmin = () => {
  const [inventories, setInventories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryId, setInventoryId] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getInventories();
  }, []);

  const getInventories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const imageUrl = response.data.url;
      setImageUrl(imageUrl);
      setInventories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Inventaris berhasil dihapus!");
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
  };

  const handleEdit = (id) => {
    setInventoryId(id);
    setShowModalUpdate(true);
  };

  const handleModalUpdateClose = () => {
    setShowModalUpdate(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleModalUpdateOpen = (e) => {
    const inventoryId = e.target.dataset.id;
    setShowModalUpdate(true);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <div className="relative bg-main-blue-3">
      <div className="flex min-h-screen">
        <NavbarAdmin />
        <div className="md:container md:mx-auto">
          <div className="flex flex-wrap justify-center">
            {inventories.length === 0 ? (
              <div className="md:container md:mx-auto">
                <div className="flex justify-center items-center h-screen">
                  <div className="mr-6 ml-[25%] w-[70%] mb-10 bg-white rounded-lg shadow-md p-8">
                    <p className="font-quicksand text-3xl font-bold mb-4 text-center">
                      Inventaris Belum Tersedia!
                    </p>
                    <p className="font-quicksand font-normal text-gray-600 text-lg text-center">
                      Mohon maaf, inventaris belum tersedia. Silakan tambahkan
                      inventaris terlebih dahulu ya!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              inventories.map((inventory) => (
                <div
                  key={inventory._id}
                  className="mr-6 ml-[25%] mb-5 mt-5 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4"
                >
                  <div className="flex">
                    <div className="w-[200px] flex items-center justify-center">
                      <img
                        src={inventory.gambar}
                        alt="Inventory Image"
                        className="w-[130px] rounded-md drop-shadow-md"
                      />
                    </div>
                    <div className="">
                      <table>
                        <tbody>
                          <tr>
                            <td className="font-quicksand font-normal text-md">
                              <strong>Nama Inventaris</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md">
                              {inventory.nama}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Deskripsi</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {inventory.deskripsi}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Tanggal Kepemilikan</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {new Date(
                                inventory.tgl_kepemilikan
                              ).toLocaleDateString("id-ID")}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Status</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {inventory.status}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>List Peminjam</strong>
                            </td>
                            <td>
                              <ul className="font-quicksand font-normal text-md pr-6">
                                {inventory.list_peminjam &&
                                  inventory.list_peminjam.map(
                                    (peminjam, index) => (
                                      <div key={index}>
                                        {peminjam.nim} - {peminjam.nama}
                                      </div>
                                    )
                                  )}
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <ul className="flex items-center mt-6 justify-center">
                    <li className="rounded-40 bg-custom-green-1 hover:drop-shadow-xl items-center w-28">
                      <Link
                        onClick={() => handleEdit(inventory._id)}
                        data-id={inventory._id}
                        className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center "
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`}
                          alt="Edit_icon"
                          className="pr-3 w-7 h-7"
                        />
                        Edit
                      </Link>
                    </li>
                    <li className="ml-6 rounded-40 bg-custom-red-1 hover:drop-shadow-xl items-center w-28">
                      <Link
                        className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center "
                        onClick={() => setShowModal(inventory._id)}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/trash_icon.svg`}
                          alt="Delete_icon"
                          className="pr-3 w-7 h-7"
                        />
                        Delete
                      </Link>
                    </li>
                  </ul>
                  {showModal === inventory._id && (
                    <ModalDeleteInventory
                      visible={true}
                      onClose={() => setShowModal(null)}
                      inventoryId={inventory._id}
                      handleDeleteInventory={handleDeleteInventory}
                    />
                  )}
                  {showModalUpdate && (
                    <ModalUpdateInventory
                      isOpen={true}
                      onRequestClose={handleModalUpdateClose}
                      inventoryId={inventoryId}
                      className=""
                    />
                  )}
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

export default InventoryAdmin;
