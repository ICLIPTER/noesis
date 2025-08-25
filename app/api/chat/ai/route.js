import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Node 18+ has fetch globally, no need to import extra libs

export async function POST(req) {
  try {
    // Connect to DB
    await connectDB();

    // Authenticate user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Extract chatId and message
    const { chatId, message } = await req.json();
    if (!chatId || !message) {
      return NextResponse.json(
        { success: false, message: "chatId and message are required" },
        { status: 400 }
      );
    }

    // Find the chat
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found or not authorized" },
        { status: 404 }
      );
    }

    // Push user message
    chat.messages.push({ role: "user", content: message });

    // Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // or "deepseek-reasoner" / "deepseek-v3"
        messages: chat.messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API error: ${errorText}`);
    }

    const data = await response.json();
    const aiReply = data.choices[0].message.content;

    // Save AI response
    chat.messages.push({ role: "assistant", content: aiReply });
    await chat.save();

    return NextResponse.json(
      { success: true, reply: aiReply, chat },
      { status: 200 }
    );
  } catch (error) {
    console.error("DeepSeek AI route error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
