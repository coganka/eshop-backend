const Order = require('../models/Order');

const getUserOrders = async (req, res) => {
    const userId = req.params.id;

    try {
        const userOrders = await Order.find({userId})
            .populate({
                path: 'productId',
                select: '-description -product_location'
            })
            .exec();
        res.status(200).json(userOrders);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getUserOrders
};