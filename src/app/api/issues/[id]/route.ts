import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Issue from "@/models/Issue"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await params   // ✅ THIS IS THE FIX

  const deleted = await Issue.findByIdAndDelete(id)

  if (!deleted) {
    return NextResponse.json(
      { message: "Issue not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(
    { message: "Issue deleted successfully" },
    { status: 200 }
  )
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await params   // ✅ SAME FIX HERE
  const body = await req.json()

  const updated = await Issue.findByIdAndUpdate(
    id,
    body,
    { new: true }
  )

  if (!updated) {
    return NextResponse.json(
      { message: "Issue not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(updated, { status: 200 })
}






