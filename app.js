const express = require("express");

const app = express();
const port = 3000;

app.use("/add-product", (req, res, next) => {
  res.send("<h1>Add products</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome from Express->node framework</h1>");
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
