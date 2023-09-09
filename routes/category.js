const express = require("express");
const router = express.Router();
const { addNewCategory, getallCategory, getSingleCategory, updateCategory, deleteCategory } = require("../Controllers/CategoryController");


router.post("/create", addNewCategory)
router.get("/getcategories", getallCategory)
router.get("/singlecategory", getSingleCategory)
router.post("/updatecategory/:id", updateCategory)
router.delete("/deletecategory/:id", deleteCategory)


module.exports = router;