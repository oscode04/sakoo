// routes/mlRoutes.js
import axios from "axios";

const mlRoutes = [
  {
    method: "POST",
    path: "/api/predict",
    handler: async (request, h) => {
      try {
        const payload = request.payload;

        const response = await axios.post(
          "http://localhost:5000/predict",
          payload
        );
        return h.response(response.data).code(200);
      } catch (error) {
        console.error(error.message);
        return h.response({ error: "Gagal mendapatkan prediksi" }).code(500);
      }
    },
  },
];

export default mlRoutes;
