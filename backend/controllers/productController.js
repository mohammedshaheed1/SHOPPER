const Product = require("../models/productModel");

const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
};

const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, id: req.body.id });
};

const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    res.send(products);
};

const newCollections = async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    res.send(newCollection);
};

const popularInWomen = async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popularInWomen = products.slice(0, 4);
    res.send(popularInWomen);
};

const updateProduct = async (req, res) => {
    const { id, name, old_price, new_price, category, image } = req.body;
    try {
        const product = await Product.findOneAndUpdate(
            { id: id },
            { name, old_price, new_price, category, image },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts,
    newCollections,
    popularInWomen,
    updateProduct
};
