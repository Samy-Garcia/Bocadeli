const suppliersController = {};

import suppliersModel from '../models/suppliers.js';



//SELECT

suppliersController.getSuppliers = async (req, res) => {
    try {
        const suppliers = await suppliersModel.find();
        return res.status(200).json({ suppliers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//POST

suppliersController.createSupplier = async (req, res) => {
    try {
        const { name, company, email, phone, address, isActive } = req.body;
        const newSupplier = new suppliersModel({ name, company, email, phone, address, isActive });
        await newSupplier.save();
        return res.status(201).json({ supplier: newSupplier });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//UPDATE

suppliersController.updateSupplier = async (req, res) => {
    try {
        const { name, company, email, phone, address, isActive } = req.body;
        const updatedSupplier = await suppliersModel.findByIdAndUpdate(
            req.params.id,
            { name, company, email, phone, address, isActive },
            { new: true }
        );
        return res.status(200).json({ supplier: updatedSupplier });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//DELETE

suppliersController.deleteSupplier = async (req, res) => {
    try {
        await suppliersModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default suppliersController;