import axios from "../axiosConfig";
import React, { useState, useEffect } from "react";

import NavbarAdmin from "../components/Common/NavbarAdmin";

const NotificationAdmin = () => {
  const [notificationAdmin, setNotificationAdmin] = useState([]);
  const [inventoryNames, setInventoryNames] = useState([]);

  useEffect(() => {
    const getNotificationAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/peminjaman", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificationAdmin(response.data);
        fetchInventoryNames(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNotificationAdmin();
  }, []);

  const fetchInventoryNames = async (notificationData) => {
    try {
      const token = localStorage.getItem("token");
      const promises = notificationData.map((notifAdmin) =>
        axios.get(`/api/inventory/${notifAdmin.inventoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      const responses = await Promise.all(promises);
      const names = responses.map((response) => response.data.nama);
      setInventoryNames(names);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPDF = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${file}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const fileName = file.substring(file.lastIndexOf("/") + 1);

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const sendAccept = (id) => {
    
  };

  const sendReject = (id) => {};

  const renderNotificationAdmin = () => {
    return notificationAdmin.reverse().map((notifAdmin, index) => (
      <div
        key={notifAdmin._id}
        className="mr-6 ml-[25%] mb-5 mt-5 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4"
      >
        <div className="flex">
          <table>
            <tbody>
              <tr>
                <td className="font-quicksand font-normal text-md pr-14">
                  <strong>Nama Penanggung Jawab</strong>
                </td>
                <td className="font-quicksand font-normal text-md pr-14">
                  {notifAdmin.nama}
                </td>
              </tr>
              <tr>
                <td className="font-quicksand font-normal text-md pr-14">
                  <strong>Inventaris</strong>
                </td>
                <td className="font-quicksand font-normal text-md pr-14">
                  {inventoryNames[index]}
                </td>
              </tr>
              <tr>
                <td className="font-quicksand font-normal text-md pr-14">
                  <strong>Tujuan</strong>
                </td>
                <td className="font-quicksand font-normal text-md pr-14">
                  {notifAdmin.tujuan}
                </td>
              </tr>
              <tr>
                <td className="font-quicksand font-normal text-md pr-14">
                  <strong>Tanggal Peminjaman</strong>
                </td>
                <td className="font-quicksand font-normal text-md pr-14">
                  {new Date(notifAdmin.tanggal).toLocaleDateString("id-ID")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center align-items">
          <button
            className="w-[10rem] mt-6 mr-3 text-lg font-poppins bg-main-blue hover:drop-shadow-xl text-white font-normal rounded-[40px] focus:outline-none focus:shadow-outline"
            onClick={() => handleDownloadPDF(notifAdmin.file)}
          >
            <div className="flex items-center justify-center">
              <img
                src={`${process.env.PUBLIC_URL + "/assets/document_icon.svg"}`}
                alt="document_icon"
                className="ml-1 mr-1 mt-2 mb-2 w-[20px]"
              />
              <p className="text-center">Dokumen</p>
            </div>
          </button>
          <button
            className="w-[10rem] mt-6 mr-3 text-lg font-poppins bg-custom-green-1 hover:drop-shadow-xl  text-white font-normal rounded-[40px] focus:outline-none focus:shadow-outline"
            onClick={() => sendAccept(notifAdmin.file)}
          >
            <div className="flex items-center justify-center">
              <img
                src={`${process.env.PUBLIC_URL + "/assets/accept_icon.svg"}`}
                alt="document_icon"
                className="ml-1 mr-1 mt-2 mb-2 w-[20px]"
              />
              <p className="text-center">Terima</p>
            </div>
          </button>
          <button
            className="w-[10rem] mt-6 text-lg font-poppins bg-red-600 hover:drop-shadow-xl  text-white font-normal rounded-[40px] focus:outline-none focus:shadow-outline"
            onClick={() => sendReject(notifAdmin.file)}
          >
            <div className="flex items-center justify-center">
              <img
                src={`${process.env.PUBLIC_URL + "/assets/reject_icon.svg"}`}
                alt="document_icon"
                className="ml-1 mr-1 mt-2 mb-2 w-[20px]"
              />
              <p className="text-center">Tolak</p>
            </div>
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative bg-main-blue-3">
      <div className="flex min-h-screen">
        <NavbarAdmin />
        <div className="md:container md:mx-auto">
          <div className="flex flex-wrap justify-center">
            {notificationAdmin.length === 0 ? (
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
              renderNotificationAdmin()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAdmin;
