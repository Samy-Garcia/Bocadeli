import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import employeeModel from "../models/employees.js";

import { config } from "../../config.js";
import e from "express";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
    try {
        //#1- Solicitar los datos a guardar
        const {
            name,
            lastName,
            email,
            password,
            role,
            salary,
            phone,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body;

        //#2- Validar si el correo existe en la base de datos
        const existsEmployee = await employeeModel.findOne({ email });
        if (existsEmployee) {
            return res.status(400).json({ message: "Employee already exists " });
        }
        //Encriptar la contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //Generar un código aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //#1-¿Qué vamos a guardar?
            {
                randomCode: randomCode,
                name,
                lastName,
                email,
                password,
                role,
                salary,
                phone,
                isVerified,
                loginAttemps,
                timeOut,
            },
            //#2- Secret key
            config.JWT.secret,
            //#3- ¿Cúando expira?
            { expiresIn: "15m" },
        );

        
        //guardamos el token en una cookie
        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

            //Enviar el correo de verificación
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        await transporter.sendMail({
            from: config.email.user_email,
            to: email,
            subject: "Verification code",
            text: `Your verification code is: ${randomCode}`,
        });

        return res.status(200).json({ message: "Employee registered, please verify your email" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
        
}

//VERIFICAR EL CORREO ELECTRÓNICO

        registerEmployeesController.verifyCode = async (req, res) => {
            try {
                const { verificationCodeRequest } = req.body;
                const token = req.cookies.registrationCookie;

            //extraer la información del token
                const decoded = jsonwebtoken.verify(token, config.JWT.secret);
                const { randomCode, name, lastName, email, password, role, salary, phone, isVerified, loginAttemps, timeOut } = decoded;

                if (verificationCodeRequest !== randomCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    //Guardar al nuevo empleado en la base de datos

    const newEmployee = new employeeModel({
        name,
        lastName,
        email,
        password,
        role,
        salary,
        phone,
        isVerified: true,
        
    });
        

    await newEmployee.save();

    return res.status(200).json({ message: "Employee registered" });


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }

}

export default registerEmployeesController;