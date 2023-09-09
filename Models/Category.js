const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category

//name color image
