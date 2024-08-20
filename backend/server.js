const express = require("express");
// const multer = require("multer");
// const methodOverride = require("method-override");
const app = express();
const path = require("path");

// static middleware
app.use(express.static(path.join(__dirname, "public")));

//file upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       "C:/Users/DELL/OneDrive/Desktop/SalaryCorner/backend/public/upload"
//     );
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = 8080;

app.listen(port, (req, res) => {
  console.log(`app listen on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/myteam", (req, res) => {
  res.render("myteam");
});

app.get("/attendance", (req, res) => {
  res.render("attendance");
});

app.post("/attendance", (req, res) => {
  console.log(req.body);
  res.send("working");
});

app.get("/recruitment", (req, res) => {
  res.render("recruitment");
});

app.get("/payroll", (req, res) => {
  res.render("payroll");
});

app.get("/reports", (req, res) => {
  res.render("reports");
});

app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("error");
    return;
  }
});
