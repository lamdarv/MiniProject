import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalBorrowInventory from '../Inventory/ModalBorrowInventory';

const Borrow = () => {
  const [isClickedCreate, setIsClickedCreate] = useState(false);
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-hidden');
  }
  
  //Create Hover
  const handleMouseOverCreate = () => {
    setIsHoveredCreate(true);
  };

  const handleMouseLeaveCreate = () => {
    setIsHoveredCreate(false);
  };

  const handleClickCreate = () => {
    setIsClickedCreate(true);
    setShowModal(true);
    document.body.classList.add('overflow-hidden');
  };

  useEffect(() => {
    if (window.location.pathname === "/posts") {
      setIsClickedCreate(false);
    } 
  }, []);

  return (
    <div>
      <nav>
        <li className="rounded-40 bg-main-blue hover:drop-shadow-xl items-center w-28">
            <Link onClick={handleClickCreate} onMouseEnter={handleMouseOverCreate} onMouseLeave={handleMouseLeaveCreate} className="font-quicksand font-medium text-white py-0.5 px-0.5 flex items-center justify-center">
                Pinjam
            </Link>
        </li>
      </nav>
      {showModal && (
        <ModalBorrowInventory isOpen={true} onRequestClose={handleModalClose} className="fixed inset-0 bg-gray-700 opacity-75 blur z-50 "/>
      )}
    </div>
  )
}

export default Borrow;