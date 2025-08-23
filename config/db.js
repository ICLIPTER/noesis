import mongoose from "mongoose";

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  const cached = global.mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false, // optional: disables mongoose buffering
      })
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // reset on failure
    console.error("Error connecting to database:", error);
    throw error;
  }

  return cached.conn;
}
