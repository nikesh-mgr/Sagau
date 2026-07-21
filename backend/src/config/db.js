import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);

    // Stop the server if database connection fails
    process.exit(1);
  }
};

export default connectDB;
