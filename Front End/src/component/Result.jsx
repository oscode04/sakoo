// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Result = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[#e6f0e8] px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-lg w-full max-w-4xl border border-blue-300"
        >
          <h2 className="text-xl md:text-2xl font-bold text-[#204842] mb-6">
            🎉 Hasil Financial Check Up Kamu
          </h2>

          <div className="space-y-6 text-sm md:text-base">
            {/* Kondisi Baik */}
            <div>
              <p className="font-semibold">
                Kondisi Keuanganmu:{" "}
                <span className="text-green-600">✅ Baik</span>
              </p>
              <div className="bg-[#E1EDDF] text-[#204842] p-4 rounded-lg mt-2 shadow-sm">
                “Langkah kecil hari ini bisa jadi lompatan besar untuk masa
                depan. Kamu sudah di jalur yang tepat — tinggal jaga konsistensi
                dan tetap disiplin.”
              </div>
            </div>

            {/* Kondisi Cukup */}
            <div>
              <p className="font-semibold">
                Kondisi Keuanganmu:{" "}
                <span className="text-yellow-600">⚠️ Cukup</span>
              </p>
              <div className="bg-[#E1EDDF] text-[#204842] p-4 rounded-lg mt-2 shadow-sm">
                “Sedikit lagi! Terus perbaiki langkah-langkahmu, karena setiap
                usaha kecil akan membuahkan hasil besar.”
              </div>
            </div>

            {/* Kondisi Kurang */}
            <div>
              <p className="font-semibold">
                Kondisi Keuanganmu:{" "}
                <span className="text-red-500">❗Kurang</span>
              </p>
              <div className="bg-[#E1EDDF] text-[#204842] p-4 rounded-lg mt-2 shadow-sm">
                “Jangan menyerah, justru dari sini perjalananmu dimulai. Ayo
                atur ulang prioritas keuanganmu demi masa depan yang lebih
                baik.”
              </div>
            </div>

            {/* Kondisi Buruk */}
            <div>
              <p className="font-semibold">
                Kondisi Keuanganmu:{" "}
                <span className="text-red-700">🚫 Buruk</span>
              </p>
              <div className="bg-[#E1EDDF] text-[#204842] p-4 rounded-lg mt-2 shadow-sm">
                “Tenang, semua orang pernah ada di titik ini. Yang penting mulai
                dari langkah kecil hari ini — perlahan tapi pasti, kamu bisa
                bangkit!”
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-block px-6 py-2 rounded-md bg-[#204842] text-white hover:bg-[#183730] transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Result;
