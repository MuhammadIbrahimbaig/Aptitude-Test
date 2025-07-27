const express = require("express");
const cors = require("cors");

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());

const route = require("./Routes/route");
app.use("/", route); // ✅ Must be used to activate /save

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
