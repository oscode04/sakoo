# Backend Sakoo

**Sakoo** adalah platform perencanaan keuangan pribadi yang menyediakan layanan analisis keuangan berbasis AI. Backend ini bertanggung jawab mengelola autentikasi pengguna, koneksi database, dan fitur utama seperti **Cek Keuangan**.

> 💡 Sakoo: Solusi Aman Kelola dan Optimalkan Keuangan

## 🌐 Teknologi Utama

- **Node.js** – Backend runtime
- **PostgreSQL** – Database relasional
- **JWT** – JSON Web Token untuk autentikasi
- **PM2 + Hosting** – Production deployment (DomaiNesia)
- **Hapi.js** – Web framework

## 📋 Prasyarat

Pastikan sistem Anda memiliki:

- Node.js & npm: [Download Node.js](https://nodejs.org/)
- PostgreSQL database aktif

## ⚙️ Instalasi & Konfigurasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/sakoo-finance/sakoo.git
   cd sakoo

2. **Checkout ke Branch Backend**

   ```bash
   git checkout Back-End
   git pull origin Back-End

3. **Instalasi Dependensi**

   ```bash
   npm install
   ```

4. **Konfigurasi Environment (.env)**
   Buat file `.env` di root folder dan isi:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=sakoo_db
   JWT_SECRET=your_jwt_secret
   ```

5. **Jalankan Server**

   ```bash
   npm start
   # atau
   npm run dev
   ```

---

## 🚀 Endpoint API

| Method | Endpoint  | Deskripsi                    | Autentikasi |
| ------ | --------- | ---------------------------- | ----------- |
| POST   | /register | Registrasi akun pengguna     | ❌           |
| POST   | /login    | Login dan dapatkan token JWT | ❌           |
| POST   | /predict  | Analisis keuangan pengguna   | ✅ JWT       |
| GET    | /user     | Info pengguna yang login     | ✅ JWT       |

---

### 🔐 `/register` - Registrasi Pengguna

```http
POST /register
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Budi",
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

**Success (201):**

```json
{ "message": "User registered successfully" }
```

---

### 🔐 `/login` - Login Pengguna

```http
POST /login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

**Success (200):**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---

### 📊 `/predict` - Checkup Keuangan

```http
POST /predict
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**

```json
{
  "income": 10000000,
  "expenses": 8000000,
  "savings": 100000,
  "installments": 1000000,
  "emergency_fund": 50000,
  "assets": 30000000,
  "debt": 5000000
}
```

**Response (200):**

```json
{
  "ai_advice": {
    "kondisi": "Keuangan Stabil",
    "motivasi": "Terus semangat dalam mengelola keuangan Anda!",
    "saran": [
      {
        "title": "Tingkatkan Dana Darurat",
        "desc": "* Dana darurat Anda sangat rendah. Idealnya minimal 3x pengeluaran bulanan."
      },
      {
        "title": "Evaluasi Cicilan",
        "desc": "* Total cicilan masih wajar, tapi pastikan tidak lebih dari 30% pendapatan."
      }
    ]
  }
}
```

---

### 👤 `/user` - Info Pengguna

```http
GET /user
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
{
  "user_id": "uuid",
  "name": "Budi",
  "email": "budi@email.com"
}
```

---

## 🔗 Link Produksi

* 🌐 Website: [https://sakoo.my.id](https://sakoo.my.id)
* 📦 Backend API: [https://hapi.sakoo.my.id](https://hapi.sakoo.my.id)
* 🤖 AI/Model API: [https://flask.sakoo.my.id](https://flask.sakoo.my.id)

---

## 👥 Kontribusi

Proyek ini masih dalam tahap MVP dan pengembangan aktif. Jika Anda tertarik untuk berkontribusi dalam pengembangan backend Sakoo, silakan hubungi tim Sakoo melalui GitHub Issue atau email.

