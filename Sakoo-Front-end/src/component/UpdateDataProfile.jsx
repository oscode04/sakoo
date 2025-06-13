// components/UpdateDataModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateDataProfile = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Semua field wajib diisi",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Data berhasil diperbarui",
    });
    onClose(); // tutup modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur px-4 sm:px-0">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6 sm:p-8 relative">
        <button
          className="absolute top-2 right-4 text-2xl text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>

        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-center">
          Halo, {user.name}
        </h1>
        <h2 className="text-lg font-semibold mb-4 text-center">Data Pribadi</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
          <button
            onClick={handleUpdate}
            className="bg-[#BBF49D] text-green-900 font-semibold px-6 py-2 rounded-full hover:bg-[#A0E57C] transition"
          >
            Simpan Data
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDataProfile;
