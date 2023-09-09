// It will contains all the routes

const express = require("express");
const router = express.Router();

// All controller imports here...

// const CategoryController = require("../Controllers/CategoryController");
const UserController = require("../Controllers/UserController");
const AuthController = require("../Controllers/AuthController");
const Utility = require("../Utils/auth");

// auth
router.post("/auth/blog/login", AuthController.Login);



// user////////////////////////////////////
//signup(user)
router.post("/auth/blog/singup", UserController.addNewUser);


//get all users(admin)
router.get("/allusers", Utility.verifyToken, UserController.getallUser);
//get sigle user data
router.get("/user", Utility.verifyToken, UserController.getSingleuser);
//update users
router.put("/updateuser", Utility.verifyToken, UserController.updateuser);
//delete user
router.delete("/deleteuser", Utility.verifyToken, UserController.deleteUser);

module.exports = router;
