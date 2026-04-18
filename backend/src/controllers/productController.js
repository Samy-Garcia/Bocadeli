const productsController = {};

import productsModel from "../models/products.js";

//SELECT

productsController.getProducts = async (req, res) => {
    try {
        const products = await productsModel.find();
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

};

//POST
productsController.createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, isActive } = req.body;
        const product = new productsModel({ name, description, price, categoryId, isActive });
        await product.save();
        return res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//UPDATE

productsController.updateProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, isActive } = req.body;
        const product = await productsModel.findByIdAndUpdate(req.params.id, { name, description, price, categoryId, isActive }, { new: true });
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//DELETE

productsController.deleteProduct = async (req, res) => {
    try {
        const product = await productsModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default productsController;
