require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./Utils/config");
const PersonRouter = require("./Controllers/contacts");
const middleware = require("./Utils/middleware");
const app = express();

/* Middleware */
//app.use(express.static(path.join(__dirname, "Client/contacts-entry-fe/dist")));
app.use(express.static("Client/contacts-entry-fe/dist"));
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/api/persons", PersonRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const port = config.PORT || 3005;
app.listen(port, () => console.log(`Server listening on port ${port}`));
