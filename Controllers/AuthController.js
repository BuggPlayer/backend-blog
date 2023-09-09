const AuthCore = require("../Core/AuthCore");
const Utils = require("../Utils/auth");

const Login = async (req, res) => {
  console.log("login", req.body);
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await AuthCore.getUserDetail(email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user && user.passwordHash) {
    const validCredentials = await Utils.comparePassword(password, user.passwordHash);
    if (validCredentials) {
      const values = {
        email: user.email,
        userId: user._id,
        isAdmin: user.isAdmin,
      };
      const secret = process.env.JWT_SECRET_KEY;
      const expiry = { expiresIn: "2h" };
      const token = Utils.JwtSign(values, expiry, secret);
      if (!token) {
        return res.status(400).json({ message: "Login Failed, please try again" });
      }
      // res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 1000 });

      res.status(200).json({ message: "Login successful", token: token, userInfo: { email: user.email, userId: user._id, isAdmin: user.isAdmin, } });
    } else {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
  }
};

module.exports = { Login };
