import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDb is connected");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDb connection error", err);
    });
}

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import usersRoutes from './routes/userRoutes.js';
import financeRoutes from './routes/financeRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

app.use(express.json()); //to parse incoming JSON requests
if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDb is connected");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDb connection error", err);
    });

    app.use("/api/users", usersRoutes);
    app.use("/api/finance", financeRoutes);
}