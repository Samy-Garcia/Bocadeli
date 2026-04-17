/*
Campos:
    name
    lastName
    email
    password
    role
    salary
    phone
    isVerified
    loginAttemps
    timeOut
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    salary: {type: Number},
    phone: {type: String},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("Employee", employeesSchema)