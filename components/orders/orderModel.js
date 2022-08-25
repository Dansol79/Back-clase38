import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    products:[],
    userEmail:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    date:{
        type: String,
        required: true,
        trim: true,
    },
    state:{
        type: String,
        required: true,
        trim: true,
    }
});

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;