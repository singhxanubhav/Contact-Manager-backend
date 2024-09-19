import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.route.js";
import { errorHandler } from "./middleware/errorhandler.js";
import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(errorHandler);

app.use("/api/contacts", contactRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at port ${port}`);
});
