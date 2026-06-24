require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productsRoute = require("./routes/products");

const app = express();

app.use(
  cors({
    origin: "https://neerajsutha973r-assignment.vercel.app", 
  })
);

app.use(express.json());

app.use("/products", productsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});