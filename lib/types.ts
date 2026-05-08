export interface MeetingConfig {
  attendeeCount: number;
  hourlyRate: number;
  durationMinutes: number;
  agenda: string;
}

export interface AgendaItem {
  topic: string;
  estimatedMinutes: number;
  priority: "critical" | "high" | "medium" | "low";
  canBeAsync: boolean;
  recommendation: string;
}

export interface MeetingAnalysis {
  meetingTitle: string;
  overallEfficiencyScore: number;
  estimatedNecessaryMinutes: number;
  estimatedWastedMinutes: number;
  agendaItems: AgendaItem[];
  topRecommendations: string[];
  asyncCandidates: string[];
  meetingType:
    | "status-update"
    | "decision-making"
    | "brainstorming"
    | "planning"
    | "review"
    | "other";
  painScore: number;
  verdict: string;
}

export type AnalysisState = "idle" | "loading" | "success" | "error";
