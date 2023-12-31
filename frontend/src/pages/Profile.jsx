import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

import NavbarAdmin from "../components/Common/NavbarAdmin";
import ModalPassword from "../components/Profile/ModalPassword";
import NavbarMhs from "../components/Common/NavbarMhs";

export default function Profile() {
  // States for registration
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // Update the state with the fetched user data
      setName(data.name);
      setNim(data.nim);
      setUsername(data.username);
      setEmail(data.email);
      setRole(data.role);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    updateUser();
  }, [name, nim, username, email]);

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "/api/user",
        {
          name,
          nim,
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNim = (e) => {
    setNim(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="relative bg-main-blue-3 w-screen">
      <div className="flex min-h-screen">
        {role === "admin" ? <NavbarAdmin /> : <NavbarMhs />}
        <div className="md:container md:mx-auto">
          <div className="relative flex flex-wrap items-center justify-center h-screen left-36">
            <div className="w-[50%] h-[90%] bg-white rounded-lg shadow-md p-8 ">
              <form>
                <div className="flex flex-col font-montserrat">
                  {/* Labels and inputs for form data */}
                  <div className="flex group justify-center items-center">
                    <img
                      alt="logo"
                      src={"./logo_maneasy.png"}
                      className="object-contain rounded-full h-[200px] w-[200px]"
                    />
                    <div className="flex flex-col justify-center items-center absolute invisible text-gray-500 font-montserrat font-semibold group-hover:visible rounded-full h-[200px] w-[200px] bg-gray-300 opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/camera1.svg`}
                        alt="cam"
                      />
                      Ubah Profil
                    </div>
                  </div>

                  <label className="pt-5 pb-3 text-[#898989]">Nama</label>
                  <input
                    onChange={handleName}
                    className="pl-[20px] border-b-2 text-black border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
                    value={name}
                    type="text"
                    placeholder="John Doe"
                  />

                  <label className="pt-5 pb-3 text-[#898989]">NIM</label>
                  <input
                    onChange={handleNim}
                    className=" pl-[20px] border-b-2 text-black border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
                    value={nim}
                    type="text"
                    placeholder="12345678"
                  />

                  <label className="pt-5 pb-3 text-[#898989]">Username</label>
                  <input
                    onChange={handleUsername}
                    className="pl-[20px] text-black border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
                    value={username}
                    type="text"
                    placeholder="johndoe"
                  />

                  <label className="pt-5 pb-3 text-[#898989]">Email</label>
                  <input
                    onChange={handleEmail}
                    className=" pl-[20px] border-b-2 text-black border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
                    value={email}
                    type="email"
                    placeholder="johndoe@polban.ac.id"
                  />

                  <div className="flex justify-center pt-9">
                    <ModalPassword />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
