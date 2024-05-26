const port =4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");



app.use(express.json());
app.use(cors());

//Database connection with mongodb
mongoose.connect("mongodb+srv://shaheedshanu:shanu7510@cluster0.0dbcyhk.mongodb.net/e-commerce");

//API creation
app.get("/",(req,res)=>{
    
    res.send("Express App is Running")

})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})

const upload = multer({storage:storage})

//creating uploade endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
         res.json({
            success:1,
             image_url:`http://localhost:${port}/images/${req.file.filename}`
         })
})


//schema for creating products
const Product=mongoose.model("Product",{
       id:{
            type:Number,
            required:true,
       },
       name:{
             type:String,
             required:true,
       },
       image:{
             type:String,
             required:true,

       },
       category:{
             type:String,
             required:true,
       },
       new_price:{
             type:Number,
             required:true,
       },
       old_price:{
           type:Number,
           required:true,
       },
       date:{
        type:Date,
        default:Date.now,
       },
       available:{
            type:Boolean,
            default:true,
       }
})

//schema for creating Users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model("User", userSchema);

//Creating API for Getting All Products
app.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({});
        console.log("All users fetched");
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    });
    console.log(product);
    await product.save();
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating Api for remove product
app.post('/removeproduct',async(req,res)=>{
   await Product.findOneAndDelete({id:req.body.id});
   console.log("removed product");
   res.json({
       success:true,
       name:req.body.name

   })
})

//Creating API for Getting All Products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products)
})


//schema creating for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creatind endpoint for registering user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with email address"})
    }
    let cart={};
    for(let i=0; i<300; i++){
        cart[i]=0
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    
    const data={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating end point for login user
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
               
        }
        const token=  jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
     }
     else{
        res.json({success:false,errors:"Wrong Password"})
     }
    }
    else{
        res.json({success:false,errors:"Wrong Email"})
    }

})

//creating endpoint for new collection
app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({})
    let newcollection=products.slice(1).slice(-8);
    console.log("new collections fetched");
    res.send(newcollection)
})

//creating endpoint for popular in women
app.get("/popularinwomen",async(req,res)=>{
       let products=await Product.find({category:"women"});
       let popular_in_women=products.slice(0,4)
       console.log("popula in women fetched");
       res.send(popular_in_women)
})

//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//creating end point for adding product in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId)
      let userData = await Users.findOne({_id:req.user.id});
      userData.cartData[req.body.itemId]+=1;
      await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
      res.send("added")
})
 
//creatng endpoint for removing product in cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("removed")
})

//crearing endpoint for to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
      console.log("GetCart");
      let userData=await Users.findOne({_id:req.user.id})
      res.json(userData.cartData);
})
//creating endpoint for to get upadate
app.post('/updateproduct', async (req, res) => {
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
        console.log("Updated product:", product);
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port"+port);
    }
    else{
        console.log("error"+error);
    }
});