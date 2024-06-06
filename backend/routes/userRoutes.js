const express = require("express");
const { signup, login, addToCart, removeFromCart, getCart, blockUser, unblockUser, getAllUsers, activeUser } = require("../controllers/userController");
const { fetchUser, checkToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);
router.post('/getcart', fetchUser, getCart);
router.post('/blockuser', blockUser);
router.post('/unblockuser', unblockUser);
router.get('/allusers', getAllUsers);
router.get('/activeUser', checkToken, activeUser);

module.exports = router;
