import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Issue from "@/models/Issue";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return NextResponse.json([]);

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const issues = await Issue.find({ userId: decoded.userId });

    return NextResponse.json(issues);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const data = await req.json();

    const issue = await Issue.create({
      ...data,
      userId: decoded.userId,
    });

    return NextResponse.json(issue);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}





