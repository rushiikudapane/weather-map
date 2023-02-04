const express = require("express");
const router = require("./routes/api");

const app = express();
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use("/api", router); //api route is made is routes folder
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working on port");
});

app.listen(8080, () => {
  console.log("Server started!!!");
});
