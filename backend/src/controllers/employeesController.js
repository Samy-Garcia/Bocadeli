import employeesModel from "../models/employees.js";

const employeesController = {};

//Get
employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await employeesModel.find();
        return res.status(200).json({ employees });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Update
employeesController.updateEmployees = async (req, res) => {
    try {
        let { name, lastName, email, password, role, salary, phone, isVerified} = req.body;

        //Validaciones
        //Sanitizar
         name = name?.trim();
         email = email?.trim();

        //Validar campos requeridos

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fields required" });
        }

        //Logintud de caracteres
        if (name.length < 3 || name.length > 15) {
            return res.status(400).json({ message: "Please insert a valid name" });
        }

        //Actualizar en la base de datos
        const employeeUpdated = await employeesModel.findByIdAndUpdate(
            req.params.id,
            { name, lastName, email, password, role, salary, phone, isVerified },
            { new: true }
        );

        if (!employeeUpdated) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ employee: employeeUpdated });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Delete
employeesController.deleteEmployee = async (req, res) => {
    try {
        const employeeDeleted = await employeesModel.findByIdAndDelete(req.params.id);

        if (!employeeDeleted) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default employeesController;