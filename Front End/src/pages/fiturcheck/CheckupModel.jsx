// checkup/model/CheckupModel.js

const CheckupModel = {
  initialData: {
    nama: "",
    usia: "",
    pekerjaan: "",
    pendapatan: "",
    tanggungan: "",
    pengeluaran: "",
    kebutuhan_pokok: "",
    tempat_tinggal: "",
    transportasi: "",
    pendidikan: "",
    kesehatan: "",
    komunikasi: "",
    hiburan: "",
    donasi: "",
    tidak_terduga: "",
    lainnya: "",
    utang: "",
    tabungan: "",
    tujuan: "",
    cicilan: "",
    investasi: "",
    aset: "",
  },

  pengeluaranFields: [
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
  ],

  calculateTotalPengeluaran(formData) {
    let total = 0;
    this.pengeluaranFields.forEach((field) => {
      const value = parseInt((formData[field] || "0").replace(/\D/g, ""), 10);
      total += isNaN(value) ? 0 : value;
    });
    return total.toString();
  },
};

export default CheckupModel;
