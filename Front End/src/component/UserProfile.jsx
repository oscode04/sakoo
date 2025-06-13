import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateDataModal from "./UpdateDataProfile";

const UserProfile = ({ user, logout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || showUpdateModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isModalOpen, showUpdateModal]);

  const handleLogout = () => {
    try {
      logout();
      Swal.fire({
        icon: "success",
        title: "Berhasil Logout",
        text: "Sampai jumpa lagi!",
        confirmButtonColor: "#204842",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Logout",
        text: "Terjadi kesalahan saat logout.",
      });
    }
  };

  return (
    <div className="relative ">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-2xl text-gray-700 cursor-pointer"
      >
        <Icon icon="mingcute:user-4-line" className="text-[#204842]" />
      </button>

      {/* Dropdown Desktop */}
      {isModalOpen && (
        <div className="hidden sm:block absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h1 className="font-bold text-lg text-gray-800 mb-6">
              Hi, {user.name}
            </h1>
            <h2>Data Pribadi</h2>
            <p className="text-sm text-gray-500">Nama Lengkap : {user.name}</p>
            <p className="text-sm text-gray-500 mb-4">Email : {user.email}</p>

            <button
              onClick={() => {
                setShowUpdateModal(true);
                setIsModalOpen(false);
              }}
              className="w-full bg-[#BBF49D] text-green-900 font-semibold py-2 px-4 mb-2 rounded hover:bg-[#A0E57C] cursor-pointer"
            >
              Update Data
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
            >
              <Link to="/">Logout</Link>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {isModalOpen && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-xl z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Profil</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-900 font-medium text-lg mb-1">{user.name}</p>
          <p className="text-gray-500 text-sm mb-6">{user.email}</p>

          <button
            onClick={() => {
              setShowUpdateModal(true);
              setIsModalOpen(false);
            }}
            className="w-full bg-[#BBF49D] text-green-900 font-semibold py-2 rounded-lg mb-2"
          >
            Update Data
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            <Link to="/">Logout</Link>
          </button>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateDataModal
          user={user}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
