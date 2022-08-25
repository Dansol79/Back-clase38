import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products'
    },
    quantity:{
        type: Number,
        require: true,
        trim: true,
    }
});

export default cartItemSchema;