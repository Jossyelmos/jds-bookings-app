const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;