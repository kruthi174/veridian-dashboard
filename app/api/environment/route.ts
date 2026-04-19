import { connectDB } from "@/lib/mongodb";
import Environment from "@/models/Environment";
import { NextResponse } from "next/server";

// GET all data
export async function GET() {
  await connectDB();
  const data = await Environment.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

// POST new data
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newData = await Environment.create(body);

  return NextResponse.json(newData);
}