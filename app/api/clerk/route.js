import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("📩 Incoming webhook...");

  const wh = new Webhook(process.env.SIGNING_SECRET);

  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"), // ✅ fixed typo
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;
  try {
    evt = wh.verify(body, svixHeaders);
    console.log("✅ Verified event:", evt.type);
  } catch (err) {
    console.error("❌ Verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { data, type } = evt;

  const userData = {
    _id: data.id,
    email: data.email_addresses?.[0]?.email_address || "",
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    image: data.image_url,
  };

  await connectDB();

  switch (type) {
    case "user.created":
      const created = await User.create(userData);
      console.log("✅ User created:", created);
      break;

    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      console.log("🗑️ User deleted:", data.id);
      break;

    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData, { new: true });
      console.log("♻️ User updated:", userData);
      break;

    default:
      console.log("ℹ️ Unhandled event type:", type);
  }

  return NextResponse.json({ message: "event received" });
}
