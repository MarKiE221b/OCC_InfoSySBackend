import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import sucRoute from "./routes/sucRoute.js";
import memberRoute from "./routes/memberRoute.js";
import loginRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import programRoute from "./routes/programRoutes.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://192.168.127.155:5173",
  "http://10.40.2.35:5173",
  "https://occ-info-sys.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(new URL(origin).origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT"],
};

app.use(cors(corsOptions));

app.use("/", sucRoute);
app.use("/", memberRoute);
app.use("/", loginRoute);
app.use("/", userRoute);
app.use("/", programRoute);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
