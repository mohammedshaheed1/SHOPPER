const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const upload = require("./middleware/fileUploade"); 

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve images
app.use('/images', express.static('upload/images'));

// Upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Database connection
connectDB();

// Routes
app.use(userRoutes);
app.use(productRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server Running on port ${port}`);
    } else {
        console.log("Error: " + error);
    }
});
