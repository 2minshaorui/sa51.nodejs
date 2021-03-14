// 1. install express library
const express = require("express");
// 5. install morgan library
const morgan = require("morgan");

// 2. create an instance of express
const app = express();
app.use(morgan("combined"));

// 3. GET/ endpoint to return "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 4. add middleware for logging
// logs every incoming req
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 6. handling 500 errors (error in server)
app.get("/", (req, res) => {
  throw new Error("Injected Error");
});

// 7. serve static files in public folder using middleware
// GET/about.html endpoint
app.use(express.static(__dirname + "/public"));

// // 5. handling 404 errors (route not found)
// // to be placed right before app.listen statement
// app.use((req, res) => {
//   res
//     .status(404)
//     .send(`<h1>Path not found: "${req.method} ${req.originalUrl}"</h1>`);
// });

// // 6a. handling 500 errors
// // to be placed after handler for 404 errors
// app.use(function (err, req, res, next) {
//   res
//     .status(500)
//     .send(`<h1>Sorry. It is broken! "${req.method} ${req.originalUrl}</h1>`);
// });

// 7. redirect to 404.html in public folder
app.use((req, res, next) => {
  res.status(404).redirect("/404.html");
});

// 8. redirect to 500.html in public folder
app.use(function (err, req, res, next) {
  res.status(500).sendFile(path.join(__dirname, "public", "500.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
