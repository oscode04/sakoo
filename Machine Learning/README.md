# 🤖 Sakoo - Machine Learning Module

Modul ini merupakan bagian dari sistem **Cek Keuangan Sakoo**, yang memanfaatkan Machine Learning untuk menganalisis kondisi keuangan pengguna dan memberikan rekomendasi personal.

## 📁 Struktur Direktori

```

├── 1\_clustering/        # Segmentasi pengguna dengan KMeans
├── 2\_klasifikasi/       # Model ANN untuk klasifikasi cluster
├── 3\_testing/           # Pengujian dengan input user
├── 4\_vertex.ai/         # Deployment model via Vertex AI
└── README.md            # Dokumentasi ini

````

---

## 🔹 Clustering (KMeans)

Mengelompokkan pengguna ke dalam 4 cluster berdasarkan **rasio keuangan**:

- `ExpenseToIncomeRatio`
- `SavingToIncomeRatio`
- `DebtToIncomeRatio`
- `EmergencyFundRatio`
- `AssetToDebtRatio`
- `DebtToAssetRatio`

Setiap cluster menggambarkan kondisi finansial yang berbeda, misalnya:
- **Cluster 0** → Cashflow sehat tapi aset < utang (berisiko)
- **Cluster 2** → Pengeluaran > pendapatan tapi aset sangat besar (stabil)

---

## 🔸 Klasifikasi (ANN)

Model **Artificial Neural Network** digunakan untuk memprediksi cluster dari input pengguna baru. Input berupa 7 data keuangan akan diubah menjadi rasio, lalu diklasifikasikan ke salah satu cluster (0–3).

Contoh input:
```json
{
  "Pendapatan Bulanan": 7000000,
  "Total Pengeluaran": 8000000,
  "Tabungan": 100000,
  "Cicilan Per Bulan": 1500000,
  "Dana Darurat": 500000,
  "Total Aset": 50000000,
  "Total Utang": 90000000
}
````

---

## ☁️ Vertex AI Integration

Model ANN di-deploy ke **Google Cloud Vertex AI** agar bisa dipanggil lewat API Flask secara online.

Contoh pemanggilan:

```python
text = "pendapatan Rp15jt, pengeluaran Rp5jt, cicilan Rp1.5jt, aset Rp50jt, utang Rp1jt..."
generate(text)
```

Model menggunakan konfigurasi seperti:

* `temperature=1`
* `max_output_tokens=8192`
* `endpoint`: `projects/.../endpoints/...`

---

## ✅ Status

Model telah:

* Diuji dengan data nyata
* Di-deploy ke production (Flask + Vertex AI)
* Di-fine-tuning untuk meningkatkan relevansi saran keuangan
* Memberikan rekomendasi berbasis cluster untuk pengguna Sakoo

---

