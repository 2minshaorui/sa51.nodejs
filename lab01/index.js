// 1. import express library
const express = require("express");

// 2. create an instance of express
const app = express();

// 3. endpoint to "/"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 5. endpoint to "/time"
// display current time in browser
app.get("/time", (req, res) => {
  let currentDate = new Date().toLocaleDateString(); // result will be current date in 'dd/MM/yyyy'
  res.send(`<h1>Current time: ${currentDate}</h1>`); // using String literals
});

// 6. endpoint to "/greet"
// display greeting in browser, depending on hours of the day
app.get("/greet", (req, res) => {
  var currentHour = new Date().getHours(); // gets hour value of Date object
  if (currentHour > 5 && currentHour < 12) {
    res.send("Good morning");
  } else if (currentHour > 12 && currentHour < 19) {
    res.send("Good afternoon");
  } else {
    res.send("Good evening");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000 ...");
});

// 4. run file index.js
// listen to port at http://localhost:3000
/**
 * 2 ways to run
 *
 * 1st way, is to use 'node index.js'
 *
 * 2nd way, is to use 'nodemon'
 * - requires installation before use 'npm i -D nodemon'
 */

/**
 * however if nodemon is installed as -D,
 * running "nodemon index.js" was not allowed
 * page was not loaded
 * could be due to the installation was done in a -D 'development' mode
 * which resulted in a "SecurityError: (:) [], PSSecurityException"
 */

/**
 * running "npm run dev"
 * runs nodemon properly
 * as it listens and reloads whenever there are changes made
 */
