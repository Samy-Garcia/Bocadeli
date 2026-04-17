const categoryController = {};

import categoryModel from "../models/category.js";

//SELECT

categoryController.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//POST

categoryController.createCategory = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        const category = new categoryModel({ name, description, isActive });

        await category.save();

        return res.status(201).json({ category });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//UPDATE

categoryController.updateCategory = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        const category = await categoryModel.findByIdAndUpdate(req.params.id, { name, description, isActive }, { new: true });

        return res.status(200).json({ category });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }
};

//DELETE

categoryController.deleteCategory = async (req, res) => {

    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};

export default categoryController;
