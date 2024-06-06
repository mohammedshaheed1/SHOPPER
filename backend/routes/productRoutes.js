const express = require("express");
const { addProduct, removeProduct, getAllProducts, newCollections, popularInWomen, updateProduct } = require("../controllers/productController");
const router = express.Router();

router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/newcollections', newCollections);
router.get('/popularinwomen', popularInWomen);
router.post('/updateproduct', updateProduct);

module.exports = router;
