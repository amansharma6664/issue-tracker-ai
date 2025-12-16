import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { summary: "Please provide some text to summarize." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // ✅ WORKING CHEAP MODEL
      input: `Summarize the following issue in 2–3 professional sentences:\n\n${text}`,
    });

    const summary =
      response.output_text ||
      "Unable to generate summary at the moment.";

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("AI Error:", error);

    return NextResponse.json({
      summary:
        "AI service temporarily unavailable. Please try again later.",
    });
  }
}
