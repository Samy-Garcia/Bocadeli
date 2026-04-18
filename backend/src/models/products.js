/*
campos 
name
description
price
stock
categoryId (referencia a la categoría)
isActive
*/

import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    isActive: {
        type: Boolean,
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Product", productSchema);