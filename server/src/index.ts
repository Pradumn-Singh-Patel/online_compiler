import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect.js";
import { compilerRouter } from "./routes/compilerRouter.js";

const app = express();

app.use(express.json());
app.use(cors({
  credentials:true,
  origin: "https://online-compiler-ui.vercel.app"
}));
config();

app.use("/compiler", compilerRouter);

dbConnect();
app.listen(4000, () => {
  console.log("http://localhost:4000");
});