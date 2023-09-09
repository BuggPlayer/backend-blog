const mongoose = require("mongoose");

const ConnectToDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blog-data",
    })
    .then(() => {
      console.log("Database Connection is ready...");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

module.exports = { ConnectToDB };
