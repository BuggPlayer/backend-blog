const Category = require("../Models/Category");

const createNewCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    image: req.body.image,
    slug: req.body.slug
  });
  return (category = await category.save());
};

const getallcategory = async () => {
  return await Category.find();
};

const getSingleCategoryCore = async (req, res) => {
  // console.log("req" ,req.params);
  return await Category.findById(req.query.id);
};

const updateCategoryCore = async (req) => {
  let updateCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      image: req.body.image,
    },
    { new: true }
  );
  return updateCategory;
};

const deleteCategoryCore = (req) => {
  const deletecategory = Category.findByIdAndDelete(req.params.id);
  return deletecategory;
};

module.exports = {
  createNewCategory,
  getallcategory,
  getSingleCategoryCore,
  updateCategoryCore,
  deleteCategoryCore,
};
