import mongoose from "mongoose";

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  const cached = global.mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("Connecting to MongoDB:", process.env.MONGODB_URI);

    mongoose.set("strictQuery", true);

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // reset on failure
    console.error("❌ Error connecting to database:", error);
    throw error;
  }

  return cached.conn;
}
