const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/products" method="POST"><input type="text" name="title"/><button type="submit">Add product</button></form>'
  );
});

app.post("/products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Homepage</h1>");
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
