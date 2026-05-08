"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MeetingAnalysis, AnalysisState } from "@/lib/types";

interface AgendaAnalyzerProps {
  agenda: string;
  onAgendaChange: (value: string) => void;
  attendeeCount: number;
  hourlyRate: number;
  durationMinutes: number;
  onAnalysisComplete: (analysis: MeetingAnalysis) => void;
}

export function AgendaAnalyzer({
  agenda,
  onAgendaChange,
  attendeeCount,
  hourlyRate,
  durationMinutes,
  onAnalysisComplete,
}: AgendaAnalyzerProps) {
  const [state, setState] = useState<AnalysisState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!agenda.trim() || agenda.trim().length < 10) return;

    setState("loading");
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenda, attendeeCount, hourlyRate, durationMinutes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      onAnalysisComplete(data.analysis);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setState("error");
    }
  };

  const canAnalyze = agenda.trim().length >= 10 && state !== "loading";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wider">
          Meeting Agenda
        </CardTitle>
        <CardDescription>
          Paste your agenda to get an AI-powered pain analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={`Paste your meeting agenda here...

Example:
1. Q3 status updates from all teams (30 min)
2. Discuss the new logo design (15 min)
3. Review last week's action items (10 min)
4. Open Q&A (15 min)`}
          value={agenda}
          onChange={(e) => onAgendaChange(e.target.value)}
          className="bg-secondary border-border min-h-[200px] font-mono text-sm leading-relaxed"
          disabled={state === "loading"}
        />

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-400 bg-red-950/30 border border-red-800 rounded-md p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          variant="fire"
          size="lg"
          className="w-full"
          onClick={handleAnalyze}
          disabled={!canAnalyze}
        >
          {state === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Meeting Pain
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Powered by GPT-4o-mini · Requires OPENAI_API_KEY
        </p>
      </CardContent>
    </Card>
  );
}
