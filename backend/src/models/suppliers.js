/*
 campos:
 name
 comapany
 email
 phone
 address
 isActive
*/

import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
    name: {
        type: String,
    },
    company: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    isActive: {
        type: Boolean,
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Supplier", supplierSchema);