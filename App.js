const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
var cookieParser = require("cookie-parser");
const path = require('path')

const DbConn = require("./Database/dbcon");
// for more data
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ limit: "60mb", extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
// app.use(authJwt());

//Routes
app.use("/", require("./routes/routes"));

app.use("/api/blog", require("./routes/blog"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/category", require("./routes/category"));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client

// Serve static assets if in production

// Set static folder
app.use(express.static("./uploads"));

// console.log("path",express.static("/uplaods"))
// if (process.env.NODE_ENV === "production") {


// index.html for all page routes
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
// } 

//Database
const connectToDb = () => {
  DbConn.ConnectToDB(); // this function is to establish the connection with db
};
connectToDb();

//Server
app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
});
