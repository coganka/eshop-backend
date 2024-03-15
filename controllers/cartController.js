const Product = require('../models/Products');
const Cart = require('../models/Cart');


const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { cartItem, quantity } = req.body;
    try {
        const cart = await Cart.findOne({userId});
        if (cart) {
            const existingProd = cart.products.find(
                (product) => product.cartItem.toString() === cartItem
            );
            if (existingProd) {
                existingProd.quantity += 1;
            } else {
                cart.products.push({cartItem, quantity});
            }
            await cart.save();
            res.status(200).json('Product Added');
        } else {
            const newCart = new Cart({
                userId,
                products: [{
                    cartItem,
                    quantity: quantity
                }]
            });
            await newCart.save();
            res.status(200).json('Product Added');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.find({ userId: userId })
            .populate('products.cartItem', '_id title imageUrl price supplier');
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteCartItem = async (req, res) => {
    const cartItemId  = req.params.cartItemId;
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { 'products._id': cartItemId },
            { $pull: { products: { _id: cartItemId } } },
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json('Cart item not found');
        }
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

const decrementCartItem = async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
        const cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json('cart not found');
        }
        const existingProd = cart.products.find(
            (product) => product.cartItem.toString() === cartItem
        );
        if (!existingProd) {
            return res.status(404).json('product not found');
        }
        if (existingProd.quantity === 1) {
            cart.products = cart.products.filter(
                (product) => product.cartItem.toString() !== cartItem
            )
        } else {
            existingProd.quantity -= 1
        }
        await cart.save();
        if (existingProd.quantity === 0) {
            await Cart.updateOne(
                { userId },
                { $pull: { products: { cartItem } } }
            );
        }
        res.status(200).json('Product Updated');
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    addToCart,
    getCart,
    deleteCartItem,
    decrementCartItem
};