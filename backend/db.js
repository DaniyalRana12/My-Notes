const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectToMongo;
