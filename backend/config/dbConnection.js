const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shaheedshanu:shanu7510@cluster0.0dbcyhk.mongodb.net/e-commerce");
    console.log("MongoDB connected...");
    }
    
   catch (err) {
    console.error(err.message);
    
  }
};

module.exports = connectDB;
