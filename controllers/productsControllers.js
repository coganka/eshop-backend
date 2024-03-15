const Product = require('../models/Products');

const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(200).json('product created successfully');
    } catch (err) {
        res.status(500).json('failed to create product');
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json('failed to fetch');
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json('failed to fetch');
    }
};

const searchProduct = async (req, res) => {
    try {
        const result = await Product.aggregate(
            [
                {
                  $search: {
                    index: "prod",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json('failed to search query');
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    searchProduct
}