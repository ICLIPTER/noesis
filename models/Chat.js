import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    messages: [
      {
        role: { type: String, required: true }, // "user" or "assistant"
        content: { type: String, required: true },
        timestamp: { type: Number, required: true }, // Unix timestamp (Date.now())
      },
    ],
    userId: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
