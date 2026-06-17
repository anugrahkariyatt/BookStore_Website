import booksModel from "../models/books.model.js";
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
    const categories = await categoriesModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "category",
          as: "books",
        },
      },
      {
        $project: {
          name: 1,
          bookCount: { $size: "$books" },
        },
      },
    ]);
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
    console.log("Reach");

    const categoryId = req.params.id;
    // console.log("cateid", categoryId);

    if (!categoryId) {
      return res.status(400).json({ error: "Category Id is not provided" });
    }
    const { categoryNewName } = req.body;

    if (!categoryNewName) {
      return res.status(400).json({
        error: " category new name are required for the update",
      });
    }

    const updateCategory = await categoriesModel.findByIdAndUpdate(
      categoryId,
      {
        name: categoryNewName,
      },
      { new: true, runValidators: true },
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
    const categoryToFind = await categoriesModel.findOne({ name: name });
    if (!categoryToFind) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    const associatedBooksCount = await booksModel.countDocuments({
      category: categoryToFind._id,
    });
    if (associatedBooksCount > 0) {
      return res.status(400).json({
        error: `Cannot delete category '${name}'. There are ${associatedBooksCount} book(s) currently in this category.`,
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
    console.log("Error >>>>>>>>>", err.message);
    return res.status(500).json({ error: err.message });
  }
};
