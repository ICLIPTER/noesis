import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String }, // full name if you want quick access
    image: { type: String, default: "/default-avatar.png" },
    metadata: { type: mongoose.Schema.Types.Mixed }, // store Clerk extras if needed
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
