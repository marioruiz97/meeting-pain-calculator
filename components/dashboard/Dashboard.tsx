"use client";

import { useState } from "react";
import { Flame, Github } from "lucide-react";
import { CostBurnCounter } from "./CostBurnCounter";
import { MeetingConfigPanel } from "./MeetingConfigPanel";
import { AgendaAnalyzer } from "./AgendaAnalyzer";
import { AnalysisResults } from "./AnalysisResults";
import { Separator } from "@/components/ui/separator";
import type { MeetingConfig, MeetingAnalysis } from "@/lib/types";

const DEFAULT_CONFIG: MeetingConfig = {
  attendeeCount: 5,
  hourlyRate: 75,
  durationMinutes: 60,
  agenda: "",
};

export function Dashboard() {
  const [config, setConfig] = useState<MeetingConfig>(DEFAULT_CONFIG);
  const [analysis, setAnalysis] = useState<MeetingAnalysis | null>(null);

  const handleConfigChange = (updates: Partial<MeetingConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 fire-gradient rounded-lg flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-foreground">Meeting Pain</span>
              <span className="fire-text font-bold"> Calculator</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Stop burning money on bad meetings</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left Sidebar */}
          <aside className="space-y-4">
            {/* Hero text */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Is this meeting{" "}
                <span className="fire-text">worth the money?</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time cost tracking + AI agenda analysis to eliminate meeting waste.
              </p>
            </div>

            <MeetingConfigPanel config={config} onChange={handleConfigChange} />

            <CostBurnCounter
              attendeeCount={config.attendeeCount}
              hourlyRate={config.hourlyRate}
            />
          </aside>

          {/* Main Content */}
          <main className="space-y-4">
            <AgendaAnalyzer
              agenda={config.agenda}
              onAgendaChange={(agenda) => handleConfigChange({ agenda })}
              attendeeCount={config.attendeeCount}
              hourlyRate={config.hourlyRate}
              durationMinutes={config.durationMinutes}
              onAnalysisComplete={setAnalysis}
            />

            {analysis && (
              <>
                <Separator className="my-2" />
                <AnalysisResults
                  analysis={analysis}
                  hourlyRate={config.hourlyRate}
                  attendeeCount={config.attendeeCount}
                />
              </>
            )}

            {!analysis && (
              <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
                <Flame className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">
                  Paste your meeting agenda above and click{" "}
                  <span className="text-fire-500 font-medium">Analyze Meeting Pain</span>{" "}
                  to get started.
                </p>
                <p className="text-xs mt-2 opacity-60">
                  Requires an OpenAI API key in <code>.env.local</code>
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            Meeting Pain Calculator · Built with Next.js 14, Vercel AI SDK &amp; OpenAI ·{" "}
            <span className="fire-text">Stop the madness.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
