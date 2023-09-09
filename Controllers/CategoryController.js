const {
  createNewCategory,
  getallcategory,
  getSingleCategoryCore,
  updateCategoryCore,
  deleteCategoryCore,
} = require("../Core/CategoryCore");
const LogController = require('../Controllers/LogController')

//create new category
const addNewCategory = async (req, res) => {
  const category = await createNewCategory(req, res);
  if (!category) return res.status(400).send("the category cannot be created!");
  return res.send(category);
};

// get all category data
const getallCategory = async (req, res) => {

  // to log every action in the backend "createLog" is used
  LogController.createLog('info', 'Hi this is a test log', req)
  const getallcategorydata = await getallcategory();
  if (!getallcategorydata) return res.status(400).send("the data is not found");
  res.status(200).send(getallcategorydata);
};

// get single catgory
const getSingleCategory = async (req, res) => {
  console.log("rber");
  const signleCategoy = await getSingleCategoryCore(req);
  if (!signleCategoy)
    return res.status(400).json({
      message: "The category with the given ID was not found.",
    });
  res.status(200).send(signleCategoy);
};

// put single catgory
const updateCategory = async (req, res) => {
  const updatecategory = await updateCategoryCore(req);
  if (!updatecategory)
    return res.status(400).json({
      message: "The category with the given ID was not found.",
    });
  res.status(200).send(updatecategory);
};

// delete single catgory
const deleteCategory = async (req, res) => {
  const detelecategory = await deleteCategoryCore(req);
  if (!detelecategory)
    return res.status(400).json({
      message: "The category with the given ID was not found.",
    });
  res.status(200).json({ success: true, message: "the category is deleted!" });
};

module.exports = {
  addNewCategory,
  getallCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
