const mongoose = require("mongoose");

async function connectDB() {
  // Accept both names so local MongoDB examples and MongoDB Atlas copy-paste strings work.
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI or MONGODB_URI is required. Add it to backend/.env.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = connectDB;
