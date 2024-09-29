const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pawarharsh191:harsh123@cluster0.bq00w.mongodb.net/ProjectRid');
        console.log("Mongodb connection successful");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;


