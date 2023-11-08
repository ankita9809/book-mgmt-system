const express = require("express");
const { createServer } = require("http");
const bodyParser = require("body-parser");

const { ENV } = require("./src/config/env.js");
const { connectDB } = require("./src/config/database.js");
const { STATUSCODE, clientErrorResponse } = require("./src/utils/response.js");
const { BooksRoutes } = require("./src/routes");

const app = express();
app.use(bodyParser.json());
const server = createServer(app);
const port = ENV.API_PORT;

BooksRoutes(app);

app.use("*", (req, res) =>
  clientErrorResponse(res, "API NOT FOUND!", STATUSCODE.NOTFOUND)
);

server.listen(port || 3000, async () => {
  console.log("Express app running on port " + (port || 3000));
  await connectDB();
});