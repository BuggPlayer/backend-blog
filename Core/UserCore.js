const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const createNewUserCore = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  return await user.save();
};

const getallUserCore = async () => {
  return await User.find();
};

const getSingleuserCore = async (req, res) => {
  // console.log("req" ,req.params);
  return await User.findById(req.query.id);
};

const updateuserCore = async (req) => {
  let updateCategory = await User.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.password && bcrypt.hashSync(req.body.password, 10),
    },
    { new: true }
  );
  return updateCategory;
};

const checkUserExistence = async (email) => {
  // console.log("email" );
  const isUserExist = await User.findOne({ email });
  console.log("isU", isUserExist);
  if (!isUserExist) return false;
  return true;
};

const deleteUserCore = (req) => {
  const deletecategory = User.findByIdAndDelete(req.params.id);
  return deletecategory;
};

module.exports = {
  createNewUserCore,
  getallUserCore,
  getSingleuserCore,
  updateuserCore,
  deleteUserCore,
  checkUserExistence,
};
