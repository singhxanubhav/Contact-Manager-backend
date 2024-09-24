import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.route.js";
import userRoute from "./routes/user.route.js";
import { errorHandler } from "./middleware/errorhandler.js";
import connectDB from "./utils/db.js";
import cors from "cors";

dotenv.config({});

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(errorHandler);
app.use(cors());

app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at port ${port}`);
});
