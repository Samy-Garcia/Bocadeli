/**
 
campos
clienteId
produtoId
total
status
date

 */

import {Schema, model} from 'mongoose';

const orderSchema = new Schema({
    clienteId: {
        type: Schema.Types.ObjectId,
         ref: 'Customer'
        },

    produtoId: {
        type: Schema.Types.ObjectId,
         ref: 'Product'
        },

    total: {
        type: Number
    },

    status: {
        type: String
    },

    date: {
        type: Date
    }
    
}, {
    timestamps: true,
    strict: false
});

export default model('Order', orderSchema);