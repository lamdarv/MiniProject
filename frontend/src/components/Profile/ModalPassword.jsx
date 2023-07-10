import React, { useState } from "react";

const ModalPassword = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <button className="text-white w-[30%] border-2 bg-[#2B5579] hover:bg-[#4ba3d3] rounded-full py-2 font-bold "
        type="button" onClick={() => setShowModal(true)}>
        Ubah Password
    </button>
    {showModal ? (
        <>
          <div className="flex items-center left-[320px] backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[400px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t font-montserrat">
                  <h3 className="text-xl font-semibold">Ubah Password</h3>
                </div>
                <div className="relative px-3 flex-auto">
                  <form className="rounded px-3 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
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