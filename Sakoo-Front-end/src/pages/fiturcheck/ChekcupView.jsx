// checkup/view/CheckupView.jsx

import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import Stepper from "../../component/Stepper";
import CheckupModel from "./CheckupModel";
import CheckupPresenter from "./CheckupPresenter";
import api from "../../Data/BaseUrlAPI";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CheckupView = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(CheckupModel.initialData);

  // eslint-disable-next-line no-unused-vars
  const { handleChange, handleNumericBlur } = CheckupPresenter(
    formData,
    setFormData,
    errors,
    setErrors
  );

  // eslint-disable-next-line no-unused-vars
  const prediksi = async () => {
    try {
      const payload = {
        "Pendapatan Bulanan": parseInt(formData.pendapatan || 0),
        "Total Pengeluaran": parseInt(formData.pengeluaran || 0),
        Tabungan: parseInt(formData.tabungan || 0),
        "Cicilan Per Bulan": parseInt(formData.cicilan || 0),
        "Dana Darurat": parseInt(formData.darurat || 0),
        "Total Aset": parseInt(formData.aset || 0),
        "Total Utang": parseInt(formData.utang || 0),
      };

      const response = await api.post("/predict", payload);
      if (response.status === 200) {
        alert(response.data.message || "Prediksi berhasil!");
      } else {
        alert(response.data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat mengirim data.");
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      const fields = ["nama", "usia", "pekerjaan", "pendapatan", "tanggungan"];
      fields.forEach((field) => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field} wajib diisi`;
        }
      });
    }
    if (step === 2) {
      const fields = [
        "kebutuhan_pokok",
        "tempat_tinggal",
        "transportasi",
        "pendidikan",
        "kesehatan",
        "komunikasi",
        "hiburan",
        "donasi",
        "tidak_terduga",
        "lainnya",
        "pengeluaran",
      ];
      fields.forEach((field) => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field} Wajib diisi`;
        }
      });
    }
    if (step === 3) {
      const fields = ["cicilan", "utang"];
      fields.forEach((field) => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field} Wajib diisi`;
        }
      });
    }
    if (step === 4) {
      const fields = ["tabungan", "investasi", "danaDarurat", "aset"];
      fields.forEach((field) => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field} Wajib diisi`;
        }
      });
    }
    if (step === 5) {
      const fields = ["tujuanKeuangan", "targetTahun", "sumberDana"];
      fields.forEach((field) => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field} Wajib diisi`;
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Komponen Input dan Select serta renderForm
  const Input = ({ label, name, placeholder = "", prefix = "", error }) => {
    const [inputValue, setInputValue] = useState(formData[name]);

    const onInputChange = (e) => setInputValue(e.target.value);

    const onInputBlur = () => {
      const cleaned = handleNumericBlur(name, inputValue);
      setInputValue(cleaned);
    };

    const isPengeluaran = name === "pengeluaran";

    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <div className="flex">
          {prefix && (
            <span
              className={`px-3 py-2 border border-r-0 rounded-l-md ${
                isPengeluaran
                  ? "bg-[#BBF49D] text-[#204842] border-[#f1f1f1] w-[120px]"
                  : "bg-gray-100"
              }`}
            >
              {prefix}
            </span>
          )}
          <input
            name={name}
            type="text"
            inputMode="numeric"
            className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 ${
              prefix ? "rounded-r-md border-l-0" : "rounded-md"
            } ${
              isPengeluaran
                ? "bg-[#BBF49D] text-[#204842] border-[#BBF49D] focus:ring-[#BBF49D]"
                : "focus:ring-green-300"
            }`}
            placeholder={placeholder}
            value={inputValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const Select = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <option value="">
          Pilih yang paling sesuai dengan aktivitas utama kamu
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1
              className="text-2xl font-bold mb-4 font-outfit"
              style={{ color: "#204842" }}
            >
              Data
            </h1>

            <Input
              label="Nama Lengkap"
              name="nama"
              placeholder="Nama kamu siapa?"
              error={errors.nama}
            />
            <Input
              label="Usia"
              name="usia"
              placeholder="Contoh: 25"
              error={errors.usia}
            />
            <Select
              label="Jenis Pekerjaan"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleChange}
              options={[
                "Pegawai Negeri Sipil",
                "Pegawai Swasta",
                "Guru / Dosen",
                "Tenaga Kesehatan",
                "Pegawai Bank / Keuangan",
                "Karyawan Startup / IT",
                "Wirausaha / Pebisnis / Freelancer",
                "Petani / Nelayan",
                "Buruh / Pekerja Lepas",
                "Sopir",
                "Tukang / Teknisi",
                "Ibu Rumah Tangga",
                "Tidak Bekerja",
                "Pensiunan",
                "Mahasiswa",
                "Pelajar",
                "Lainnya",
              ]}
              error={errors.pekerjaan}
            />
            <Input
              label="Pendapatan bulanan"
              name="pendapatan"
              prefix="Rp "
              placeholder="Contoh: 3000000"
              error={errors.pendapatan}
            />
            <Input
              label="Jumlah Tanggungan"
              name="tanggungan"
              placeholder="Contoh: 2 orang"
              error={errors.tanggungan}
            />
          </>
        );
      case 2:
        return (
          <>
            <h1
              className="text-2xl font-bold mb-4 font-outfit"
              style={{ color: "#204842" }}
            >
              Pengeluaran
            </h1>

            <Input
              label="Kebutuhan Pokok"
              name="kebutuhan_pokok"
              prefix="Rp "
              placeholder="Total untuk makan, minum, pakaian, kebutuhan dasar"
              error={errors.kebutuhan_pokok}
            />
            <Input
              label="Tempat Tinggal"
              name="tempat_tinggal"
              prefix="Rp "
              placeholder="Sewa rumah/kos, cicilan KPR, listrik, air"
              error={errors.tempat_tinggal}
            />
            <Input
              label="Transportasi"
              name="transportasi"
              prefix="Rp "
              placeholder="Biaya naik kendaraan umum/BBM/ojek online"
              error={errors.transportasi}
            />
            <Input
              label="Pendidikan"
              name="pendidikan"
              prefix="Rp "
              placeholder="Biaya sekolah/kuliah untuk diri sendiri atau keluarga"
              error={errors.pendidikan}
            />
            <Input
              label="Kesehatan"
              name="kesehatan"
              prefix="Rp "
              placeholder="Biaya berobat, obat-obatan, asuransi kesehatan"
              error={errors.kesehatan}
            />
            <Input
              label="Komunikasi & Internet"
              name="komunikasi"
              prefix="Rp "
              placeholder="Paket data, Wi-Fi bulanan, pulsa"
              error={errors.komunikasi}
            />
            <Input
              label="Gaya Hidup & Hiburan"
              name="hiburan"
              prefix="Rp "
              placeholder="Nongkrong, belanja non-prioritas, streaming, nonton, dll"
              error={errors.hiburan}
            />
            <Input
              label="Sedekah & Donasi"
              name="donasi"
              prefix="Rp "
              placeholder="Zakat, infak, bantuan sosial"
              error={errors.donasi}
            />
            <Input
              label="Pengeluaran Tidak Terduga"
              name="tidak_terduga"
              prefix="Rp "
              placeholder="Dana darurat, keperluan mendadak"
              error={errors.tidak_terduga}
            />
            <Input
              label="Lainnya"
              name="lainnya"
              prefix="Rp "
              placeholder="Pengeluaran lain di luar kategori"
              error={errors.lainnya}
            />
            <Input
              // label="Total Pengeluaran"
              name="pengeluaran"
              prefix="Total : Rp "
              placeholder="Total Pengeluaran"
            />
          </>
        );
      case 3:
        return (
          <>
            <h1
              className="text-2xl font-bold mb-4 font-outfit"
              style={{ color: "#204842" }}
            >
              Utang dan Cicilan
            </h1>

            <Input
              label="Cicilan utang bulan ini"
              name="cicilan"
              prefix="Rp "
              placeholder="Total cicilan aktif tiap bulan (KPR, motor, pinjol, dll.)"
              error={errors.cicilan}
            />
            <Input
              label="Total utang saat ini"
              name="utang"
              prefix="Rp "
              placeholder="Jumlah seluruh utang yang masih harus dibayar"
              error={errors.utang}
            />
          </>
        );
      case 4:
        return (
          <>
            <h1
              className="text-2xl font-bold mb-4 font-outfit"
              style={{ color: "#204842" }}
            >
              Simpanan
            </h1>
            <Input
              label="Total Tabungan"
              name="tabungan"
              prefix="Rp "
              placeholder="Saldo yang tersimpan di rekening tabungan"
              error={errors.tabungan}
            />
            <Input
              label="Investasi"
              name="investasi"
              prefix="Rp "
              placeholder="Total nilai dari reksadana, saham, emas, dll"
              error={errors.investasi}
            />
            <Input
              label="Dana Darurat"
              name="danaDarurat"
              prefix="Rp "
              placeholder="Uang yang kamu siapkan khusus untuk kondisi darurat"
              error={errors.dana_darurat}
            />
            <Input
              label="Total Aset"
              name="aset"
              prefix="Rp "
              placeholder="Nilai seluruh aset kamu: rumah, kendaraan, tabungan, investasi"
              error={errors.aset}
            />
          </>
        );
      case 5:
        return (
          <div className="space-y-6 font-outfit text-[#204842]">
            <div>
              <h1 className="font-semibold mb-2">
                Pilihan Perencanaan Keuangan
              </h1>
              <p className="text-sm text-gray-600 mb-2">
                Apa tujuan utama keuangan kamu?
              </p>
              <div className="space-y-2">
                {[
                  "Dana Darurat",
                  "Dana Pendidikan Anak",
                  "Dana Menikah",
                  "Pembelian Rumah",
                  "Kendaraan Pribadi",
                  "Modal Usaha",
                  "Ibadah Haji atau Umroh",
                  "Liburan",
                  "Dana Pensiun",
                  "Warisan atau Wasiat",
                  "Belum Punya Tujuan",
                  "Lainnya",
                ].map((item, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="tujuanKeuangan"
                      value={item}
                      className="form-radio text-[#204842]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">
                Kapan ingin mencapai tujuan keuangan
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Jangka pendek (<3 tahun)", value: "pendek" },
                  { label: "Jangka menengah (4–5 tahun)", value: "menengah" },
                  { label: "Jangka panjang (>5 tahun)", value: "panjang" },
                  { label: "Tidak ada", value: "tidakAda" },
                ].map(({ label, value }) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="targetTahun"
                      value={value}
                      className="form-radio text-[#204842]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">
                Sumber dana yang akan kamu pakai untuk tujuan tadi
              </h2>
              <div className="space-y-2">
                {["Tabungan", "Aset", "Investasi", "Tidak ada", "Lainnya"].map(
                  (item, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="sumberDana"
                        value={item}
                        className="form-radio text-[#204842]"
                      />
                      <span>{item}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <>
            <div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-[#204842] mb-2">
                  🎉 Hasil Financial Check Up Kamu
                </h1>
                <p className="text-lg font-semibold text-[#204842] mb-3">
                  Kondisi Keuanganmu:{" "}
                  <span className="inline-flex items-center text-green-700 font-bold">
                    ✅ Baik
                  </span>
                </p>
              </div>

              {/* Kartu Rekomendasi */}
              {[
                {
                  title: "Rencana Membeli Rumah? Gas Terus!",
                  desc: "Keuangan kamu sudah cukup stabil. Dana darurat aman, aset oke, dan utang rendah. Ini waktu yang pas untuk lanjut mewujudkan impian rumah sendiri.",
                },
                {
                  title: "Tabungan Sudah Keren, Tapi Bisa Lebih Keren Lagi!",
                  desc: "Konsisten menabung itu kuncinya. Yuk, tambah porsi tabungan untuk persiapan uang muka dan biaya lain-lainnya. Sedikit demi sedikit, jadi bukit!",
                },
                {
                  title: "Arus Kas Harus Tetap Terkendali",
                  desc: "Cek lagi pengeluaran bulanan. Jangan sampai besar pasak daripada tiang ya. Selalu pastikan pengeluaran nggak lebih dari pemasukan.",
                },
                {
                  title: "Dana Darurat? Kamu Sudah Punya Modal Aman",
                  desc: "Saat ini kamu punya Rp20.000.000 — itu setara 2.2 bulan pengeluaran. Tapi kalau mau lebih aman dan tenang, coba tingkatkan jadi 3–6 bulan (Rp27.000.000 – Rp54.000.000).",
                },
              ].map(({ title, desc }, idx) => (
                <div
                  key={idx}
                  className="bg-[#f6fdf6] border border-[#e0e0e0] rounded-lg p-4 mb-3"
                >
                  <h3 className="text-[#204842] font-semibold mb-1">{title}</h3>
                  <p className="text-gray-700 text-sm">{desc}</p>
                </div>
              ))}

              {/* Kutipan motivasi */}
              <div className="border-l-4 bg-[#E1EDDF] p-4 text-center italic text-sm text-gray-700 mb-3">
                “Langkah kecil hari ini bisa jadi lompatan besar untuk masa
                depan. Kamu sudah di jalur yang tepat — tinggal jaga konsistensi
                dan tetap disiplin!”
              </div>

              {/* Tombol selesai */}
              <div className="flex justify-center">
                <Link to="/cek-keuangan/result">
                  <button className="bg-[#BBF49D] text-[#204842] px-6 py-2 rounded-[30px] font-semibold hover:brightness-95 w-[301px] cursor-pointer">
                    Selesai
                  </button>
                </Link>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Navigasi next or before
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => step > 1 && setStep(step - 1);
  const handleSubmit = () => {
    Swal.fire({
      title: "Kirim Data?",
      text: "Apakah kamu yakin ingin mengirim data Financial Checkup ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#204842",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, kirim!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setStep(step + 1);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#e6f0e8] py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-green-900 mb-2">
            Finansial check up
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Luangkan beberapa menit untuk mengetahui kesehatan keuanganmu.
          </p>
          <Stepper activeStep={step} />

          {/* renderForm(step, Input, Select, formData, handleChange) */}
          <div className="mt-6 min-h-[320px]">{renderForm()}</div>

          {/* Navigasi : Next : Before */}
          <div className="flex justify-between mt-6">
            {step > 1 && step < 6 ? (
              <button
                onClick={prevStep}
                className="bg-[#f1f8f4] text-gray-700 px-4 py-2 rounded-lg cursor-pointer"
              >
                Sebelumnya
              </button>
            ) : (
              <div></div>
            )}
            {step >= 1 && step < 6 ? (
              <button
                onClick={step === 5 ? () => handleSubmit() : nextStep}
                style={{ backgroundColor: "#BBF49D", color: "#204842" }}
                className="px-4 py-2 rounded-lg hover:brightness-90 cursor-pointer"
              >
                {step === 5 ? "Kirim" : "Selanjutnya"}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckupView;
