import categoriesModel from "../models/categories.model.js";

export const createCategory = async (req, res) => {
  try {
    const categoryName = req.body;
    if (!categoryName) {
      return res.status(400).json({
        error: "Category name is required for create new categoryName",
      });
    }
    const existingCategory = await categoriesModel.findOne({
      categoryName,
    });

    if (existingCategory) {
      return res.status(400).json({
        error: "Category already exists",
      });
    }
    const category = await categoriesModel.create(categoryName);
    return res.status(201).json({
      message: "Category created successfully",
      Category: category,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.find({});
    return res.status(201).json({
      message: "Fetch  all Categories successfully",
      Categories: categories,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryOldName, categoryNewName } = req.body;
    if (!categoryOldName || !categoryNewName) {
      return res.status(400).json({
        error:
          "Both category old name and category new name are required for the update",
      });
    }

    const updateCategory = await categoriesModel.findOneAndUpdate(
      { name: categoryOldName },
      { name: categoryNewName },
      { new: true },
    );

    if (!updateCategory) {
      return res.status(400).json({
        error: "Category does not exists",
      });
    }
    return res.status(201).json({
      message: "Category updated successfully",
      Category: updateCategory,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Category name is required to deleted",
      });
    }

    const deletedCategory = await categoriesModel.findOneAndDelete({
      name: name,
    });

    if (!deletedCategory) {
      return res.status(400).json({
        error: "Category does not exists",
      });
    }
    return res.status(201).json({
      message: "Category created successfully",
      Category: deletedCategory,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
