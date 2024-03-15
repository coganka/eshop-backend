const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    userId: { type: String, required: true },
    customId: { type: String, required: true },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    delivery_status: { type: Number, default: 'pending' },
    payment_status: { type: String, required: true},
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;