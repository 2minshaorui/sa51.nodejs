// 1. import express library
const express = require("express");

// 2. create an instance of express
const app = express();

/**
 * 3. API Testing
 * handler function that returns message that includes
 * method & originalUrl of current request
 */

// const handler = (req, res) => {
//   res.send(`Got a ${req.method} request at ${req.originalUrl}`);
// };

// 4. Content Negotiation
const handler = (req, res) => {
  console.log(req.headers);
  // setting Accept header to the different available formats
  res.format({
    "text/html": () => {
      res.send(`<h1>Got a ${req.method} request at ${req.originalUrl}</h1>`);
    },
    "text/plain": () => {
      res.send(`Got a ${req.method} request at ${req.originalUrl}`);
    },
    default: () => {
      res.status(406).send("Not Applicable");
    },
  });
  res.send(`Got a ${req.method} request at ${req.originalUrl}`);
};

// endpoints with 4 different method and paths
app.get("/", handler);
/**
 * Get/time endpoint which returns current date time
 * returns different res depending on Accept header type
 */
app.get("/time", (req, res) => {
  const date = new Date();
  res.format({
    "application/json": () => {
      res.send({ datetime: date.toISOString() });
    },
    "text/plain": () => {
      res.send(date.toISOString());
    },
    "text/html": () => {
      res.send(`<h1>${date.toISOString()}</h1>`);
    },
    default: () => {
      res.status(406).send("Not Applicable");
    },
  });
});

app.post("/todo", handler);
app.put("/puppy", handler);
app.delete("/user", handler);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
