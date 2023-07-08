import { useEffect, useState } from 'react';

export default function NavbarAdmin() {
  // const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredProfilDKM, setIsHoveredProfilDKM] = useState(false);
  const [isHoveredAdmin, setIsHoveredAdmin] = useState(false);
  const [isHoveredMahasiswa, setIsHoveredMahasiswa] = useState(false);   
  const [isHoveredDKM, setIsHoveredDKM] = useState(false);   
  const [isHoveredInventories, setIsHoveredInventories] = useState(false);  
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [isHoveredNotif, setIsHoveredNotif] = useState(false);
  const [isHoveredKeluar, setIsHoveredKeluar] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);

  const [isClickedProfilDKM, setIsClickedProfilDKM] = useState(false);
  const [isClickedAdmin, setIsClickedAdmin] = useState(false);
  const [isClickedMahasiswa, setIsClickedMahasiswa] = useState(false);
  const [isClickedInventories, setIsClickedInventories] = useState(false);
  const [isClickedCreate, setIsClickedCreate] = useState(false);
  const [isClickedNotif, setIsClickedNotif] = useState(false);
  const [isClickedKeluar, setIsClickedKeluar] = useState(false);

  //Home Hover atau Kegiatan Hover
  const handleMouseOverProfilDKM = () => {
    setIsHoveredProfilDKM(true);
  };

  const handleMouseLeaveProfilDKM = () => {
    setIsHoveredProfilDKM(false);
  };

  //Admin Hover
  const handleMouseOverAdmin = () => {
    setIsHoveredAdmin(true);
  };

  const handleMouseLeaveAdmin = () => {
    setIsHoveredAdmin(false);
  };

  //Admin Hover
  const handleMouseOverMahasiswa = () => {
    setIsHoveredMahasiswa(true);
  };

  const handleMouseLeaveMahasiswa = () => {
    setIsHoveredMahasiswa(false);
  };

  //Inventory Hover 
  const handleMouseOverInventories = () => {
    setIsHoveredInventories(true);
  };

  const handleMouseLeaveInventories = () => {
    setIsHoveredInventories(false);
  };

  //Notif Hover
  const handleMouseOverNotif = () => {
    setIsHoveredNotif(true);
  };

  const handleMouseLeaveNotif = () => {
    setIsHoveredNotif(false);
  };

  //Keluar Hover
  const handleMouseOverKeluar = () => {
    setIsHoveredKeluar(true);
  };

  const handleMouseLeaveKeluar = () => {
    setIsHoveredKeluar(false);
  };

  //Profile Hover
  const handleMouseOverProfile = () => {
    setIsHoveredProfile(true);
  };

  const handleMouseLeaveProfile = () => {
    setIsHoveredProfile(false);
  };

  //Create Hover
  const handleMouseOverCreate = () => {
    setIsHoveredCreate(true);
  };

  const handleMouseLeaveCreate = () => {
    setIsHoveredCreate(false);
  };

  //Admin Clicked
  const handleClickAdmin = () => {
    setIsHoveredAdmin(true); 
  };

  //Mahasiswa Clicked
  const handleClickMahasiswa = () => {
    setIsHoveredMahasiswa(true); 
  };

  //ProfilDKM Clicked
  const handleClickProfilDKM = () => {
    setIsClickedProfilDKM(true); 
  };

  //Inventories Clicked
  const handleClickInventories = () => {
    setIsClickedInventories(true); 
  };

  //Create Clicked
  const handleClickCreate = () => {
    setIsClickedCreate(true); 
  };

  //Notif Clicked
  const handleClickNotif = () => {
    setIsClickedNotif(true); 
  };

  //Keluar Clicked
  const handleClickKeluar = () => {
    setIsClickedKeluar(true); 
  };

  useEffect(() => {
    if (window.location.pathname === "/profil") {
      setIsClickedProfilDKM(true);
    } else if (window.location.pathname === "/inventories"){
      setIsClickedInventories(true);
    } else if (window.location.pathname === "/create-post"){
      setIsClickedCreate(true);
    } else if (window.location.pathname === "/notifikasi"){
      setIsClickedNotif(true);
    } else if (window.location.pathname === "/keluar"){
      setIsClickedKeluar(true);
    } 
  }, []);

  return (
    
    <nav className="fixed w-[20%] bg-main-blue-2 rounded-tl-0 rounded-tr-[70px] rounded-br-[70px] rounded-bl-0 h-auto">
      <div className="flex justify-center">
        <img className='w-[35%] mt-7' src={`${process.env.PUBLIC_URL}/logo_maneasy_2.png`} alt="Icon" />
      </div>
      <div className='p-5 ml-2 mt-3'>
        <span className='font-quicksand font-semibold text-sm text-custom-white-2'>MENU</span>
      </div>
      <ul className="mt-2">
        <li className={`mb-1 ml-5 rounded-40 ${isClickedAdmin ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/" id="home" onMouseOver={handleMouseOverAdmin} onMouseLeave={handleMouseLeaveAdmin} onClick={handleClickAdmin} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedAdmin ? process.env.PUBLIC_URL+'/assets/kelola_admin_icon_active.svg' : (isHoveredAdmin ? process.env.PUBLIC_URL+'/assets/kelola_admin_icon_active.svg' : process.env.PUBLIC_URL+'/assets/kelola_admin_icon.svg')}`} 
              alt="kelola_admin_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Kelola Admin</span>
          </a>
        </li>
        <li className={`mb-1 ml-5 rounded-40 ${isClickedMahasiswa ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/" id="home" onMouseOver={handleMouseOverMahasiswa} onMouseLeave={handleMouseLeaveMahasiswa} onClick={handleClickMahasiswa} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedMahasiswa ? process.env.PUBLIC_URL+'/assets/kelola_mhs_icon_active.svg' : (isHoveredMahasiswa ? process.env.PUBLIC_URL+'/assets/kelola_mhs_icon_active.svg' : process.env.PUBLIC_URL+'/assets/kelola_mhs_icon.svg')}`} 
              alt="kelola_admin_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Kelola Mahasiswa</span>
          </a>
        </li>
        <li className={`mb-1 ml-5 rounded-40 ${isClickedProfilDKM ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/" id="home" onMouseOver={handleMouseOverProfilDKM} onMouseLeave={handleMouseLeaveProfilDKM} onClick={handleClickProfilDKM} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedProfilDKM ? process.env.PUBLIC_URL+'/assets/profile_dkm_icon_active.svg' : (isHoveredProfilDKM ? process.env.PUBLIC_URL+'/assets/profile_dkm_icon_active.svg' : process.env.PUBLIC_URL+'/assets/profile_dkm_icon.svg')}`} 
              alt="kelola_admin_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Profil DKM</span>
          </a>
        </li>
        <li className={`mt-3 mb-1 ml-5 rounded-40 ${isClickedInventories ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>
          <a href="/inventories" onMouseOver={handleMouseOverInventories} onMouseLeave={handleMouseLeaveInventories} onClick={handleClickInventories} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
            src={`${isClickedInventories ? process.env.PUBLIC_URL+'/assets/sarpras_icon_active.svg' : (isHoveredInventories ? process.env.PUBLIC_URL+'/assets/sarpras_icon_active.svg' : process.env.PUBLIC_URL+'/assets/sarpras_icon.svg')}`} 
            alt="Inventories_icon" 
            className="ml-0"
          /> 
          <span className='ml-2'>Inventaris</span>
          </a>
        </li>
      </ul>
      <div className='p-5 ml-2 mt-3'>
        <span className='font-quicksand font-semibold text-sm text-custom-white-2'>OTHERS</span>
      </div>
      <ul className="mt-2">
        <li className={`mb-1 ml-5 rounded-40 ${isClickedNotif ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/notifikasi" id="home" onMouseOver={handleMouseOverNotif} onMouseLeave={handleMouseLeaveNotif} onClick={handleClickNotif} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedNotif ? process.env.PUBLIC_URL+'/assets/notification_icon_active.svg' : (isHoveredNotif ? process.env.PUBLIC_URL+'/assets/notification_icon_active.svg' : process.env.PUBLIC_URL+'/assets/notification_icon.svg')}`} 
              alt="Activity_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Notifikasi</span>
          </a>
        </li>
        <li className={`ml-5 rounded-40 ${isClickedKeluar ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/keluar" id="home" onMouseOver={handleMouseOverKeluar} onMouseLeave={handleMouseLeaveKeluar} onClick={handleClickKeluar} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedKeluar ? process.env.PUBLIC_URL+'/assets/signout_icon_active.svg' : (isHoveredKeluar ? process.env.PUBLIC_URL+'/assets/signout_icon_active.svg' : process.env.PUBLIC_URL+'/assets/signout_icon.svg')}`} 
              alt="Signout_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Keluar</span>
          </a>
        </li>
      </ul>
      <a href="/profile" onMouseOver={handleMouseOverProfile} onMouseLeave={handleMouseLeaveProfile} className=''>
        <div className=' flex bg-white p-3 m-8 rounded-[10px] shadow-md hover:drop-shadow-2xl bg-custom-gray-3'>
          <div className='flex justify-center items-center' id="profile">
            <img className='w-[45px] ' src={process.env.PUBLIC_URL+'/assets/mhs_icon.svg'} alt="" />
          </div>
          <div className='ml-2 items-center font-quicksand' id="lembaga">
            <strong>lamdarv19</strong>
            <p className='text-[13px]'>as Admin</p>
          </div>
        </div>
      </a>
      
    </nav>
    
  );
};