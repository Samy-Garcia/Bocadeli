const ordersController = {};

import ordersModel from "../models/orders.js";

//SELECT

ordersController.getOrders = async (req, res) => {
    try {
        const orders = await ordersModel.find();
        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//POST
ordersController.createOrder = async (req, res) => {
    try {
        const { clienteId, produtoId, total, status, date } = req.body;
        const order = new ordersModel({ clienteId, produtoId, total, status, date });
        await order.save();
        return res.status(201).json({ order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//UPDATE

ordersController.updateOrder = async (req, res) => {
    try {
        const { clienteId, produtoId, total, status, date } = req.body;
        const order = await ordersModel.findByIdAndUpdate(req.params.id, { clienteId, produtoId, total, status, date }, { new: true });
        return res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//DELETE

ordersController.deleteOrder = async (req, res) => {
    try {
        const order = await ordersModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default ordersController;

