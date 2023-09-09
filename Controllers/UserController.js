const UserCoreApi = require("../Core/UserCore");

//create new category
const addNewUser = async (req, res) => {
  console.log("new" , req.boy);
  const { name, email, password } = req.body;
  if (!(email && password && name)) {
    return res.status(400).json({ message: "Email/Name/Password is missing" });
  }

  // checking if the user is already in the db.
  const isUserExist = await UserCoreApi.checkUserExistence(email)
  if (isUserExist) {
    return res.status(400).json({ status: 'Failed', message: "User Already exist" });
  }
  
  const user = await UserCoreApi.createNewUserCore(req, res);
  if (!user) return res.status(400).json({ status: "Success", message: "the user cannot be created!" });
  return res.status(200).json({ status: "Success", data: user });

};

// get all category data
const getallUser = async (req, res) => {
  const getalluserdata = await UserCoreApi.getallUserCore();
  if (!getalluserdata) return res.status(400).send("the data is not found");
  res.status(200).json({ data: getalluserdata });
};

// get single catgory
const getSingleuser = async (req, res) => {
  const signleuser = await UserCoreApi.getSingleuserCore(req);
  if (!signleuser)
    return res.status(400).json({
      message: "The User with the given ID was not found.",
    });
  res.status(200).json({ data: signleuser });
};

// put single catgory
const updateuser = async (req, res) => {
  const updateuser = await UserCoreApi.updateuserCore(req);
  if (!updateuser)
    return res.status(400).json({
      message: "The updateuser with the given ID was not found.",
    });
  res.status(200).json({ data: updateuser });
};

// delete single user
const deleteUser = async (req, res) => {
  const deteleuser = await UserCoreApi.deleteUserCore(req);
  if (!deteleuser)
    return res.status(400).json({ message: "The deteleuser with the given ID was not found." });
  res.status(200).json({ success: true, message: "the deteleuser is deleted!" });
};

module.exports = {
  addNewUser,
  getallUser,
  getSingleuser,
  updateuser,
  deleteUser,
};
