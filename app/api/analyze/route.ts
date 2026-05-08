import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const AgendaItemSchema = z.object({
  topic: z.string().describe("The agenda item topic"),
  estimatedMinutes: z.number().describe("Estimated duration in minutes"),
  priority: z.enum(["critical", "high", "medium", "low"]).describe("Item priority"),
  canBeAsync: z
    .boolean()
    .describe("Whether this item could be handled asynchronously (email/doc)"),
  recommendation: z.string().describe("Brief recommendation for this item"),
});

const MeetingAnalysisSchema = z.object({
  meetingTitle: z.string().describe("Inferred or provided meeting title"),
  overallEfficiencyScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Overall efficiency score 0-100"),
  estimatedNecessaryMinutes: z
    .number()
    .describe("Minutes that are truly necessary"),
  estimatedWastedMinutes: z
    .number()
    .describe("Minutes that could be eliminated or made async"),
  agendaItems: z.array(AgendaItemSchema),
  topRecommendations: z
    .array(z.string())
    .max(5)
    .describe("Top 3-5 actionable recommendations"),
  asyncCandidates: z
    .array(z.string())
    .describe("Items that could be handled async"),
  meetingType: z
    .enum([
      "status-update",
      "decision-making",
      "brainstorming",
      "planning",
      "review",
      "other",
    ])
    .describe("Type of meeting"),
  painScore: z
    .number()
    .min(0)
    .max(10)
    .describe("Pain score: how unnecessary this meeting is (0=essential, 10=pure waste)"),
  verdict: z
    .string()
    .describe("One-sentence verdict on this meeting's necessity"),
});

export type MeetingAnalysis = z.infer<typeof MeetingAnalysisSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agenda, attendeeCount, hourlyRate, durationMinutes } = body;

    if (!agenda || typeof agenda !== "string" || agenda.trim().length < 10) {
      return NextResponse.json(
        { error: "Agenda text is required (minimum 10 characters)" },
        { status: 400 }
      );
    }

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: MeetingAnalysisSchema,
      prompt: `You are an expert in organizational efficiency and meeting optimization.

Analyze the following meeting agenda and provide a detailed assessment:

MEETING DETAILS:
- Agenda: ${agenda}
- Number of attendees: ${attendeeCount || "not specified"}
- Planned duration: ${durationMinutes || "not specified"} minutes
- Average hourly rate per person: $${hourlyRate || "not specified"}

TASK:
1. Identify each agenda item and assess its necessity
2. Flag items that could be handled via email, Slack, or a shared document
3. Calculate what percentage of the meeting is genuinely necessary
4. Provide actionable recommendations to reduce waste
5. Give an honest "pain score" — how much of a waste of time this meeting is

Be direct and honest. Many meetings are unnecessary. If this looks like a meeting that could be an email, say so clearly.`,
    });

    return NextResponse.json({ analysis: object });
  } catch (error) {
    console.error("Analysis error:", error);

    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze meeting agenda. Please try again." },
      { status: 500 }
    );
  }
}
