import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // allow all origin
      },
    },
  });

  server.route(authRoutes);
  server.route(mlRoutes);
  server.route(userRoutes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
