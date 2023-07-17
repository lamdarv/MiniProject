import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const ModalPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setNewPassword] = useState('');

  const saveNewPassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        "/api/user",
        { oldPassword, password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Password updated successfully:', response.data);
      setShowModal(false);
    } catch (error) {
      console.log('Error updating password:', error);
    }
  };

  return (
    <>
    <button className="text-white w-[30%] border-2 bg-[#2B5579] hover:bg-[#4ba3d3] rounded-full py-2 "
        type="button" onClick={() => setShowModal(true)}>
        Ubah Password
    </button>
    {showModal ? (
        <>
          <div className="flex items-center left-[320px] backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[400px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t font-montserrat">
                  <h3 className="text-xl font-bold">Ubah Password</h3>
                  <button
                    className="text-black font-bold uppercase text-sm px-6 py-1 outline-none -mt-3 -mr-7 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                <div className="relative px-3 flex-auto">
                  <form className="rounded px-3 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-semibold mb-1">
                      Password Lama
                    </label>
                    {/* <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label className="block text-black text-sm font-semibold mb-1 mt-3">
                      Password Baru
                    </label>
                    {/* <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="password"
                      value={password}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-white bg-[#2B5579] hover:bg-[#4ba3d3 font-semibold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    // onClick={() => setShowModal(false)}
                    onClick={saveNewPassword}
                  >
                    simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalPassword;