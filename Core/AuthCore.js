const User = require("../Models/User");

const getUserDetail = async (email) => {
  let query = {
    email: {
      $in: [email.toLowerCase(), email],
    },
  };

  const userExist = await User.findOne(query);
  if (!userExist) {
    return undefined;
  }
  return userExist;
};

module.exports = { getUserDetail };
