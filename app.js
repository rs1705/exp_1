const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const handlebars = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// const hbs = handlebars.create({
//   extname: "hbs",
//   layoutsDir: "views/layouts/",
//   defaultLayout: "main-layout",
// });
// app.engine("hbs", hbs.engine);

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404 not found" });
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
