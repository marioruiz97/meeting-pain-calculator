"use client";

import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  TrendingDown,
  Zap,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { getPainColor, getPainLabel } from "@/lib/utils";
import type { MeetingAnalysis } from "@/lib/types";

interface AnalysisResultsProps {
  analysis: MeetingAnalysis;
  hourlyRate: number;
  attendeeCount: number;
}

const MEETING_TYPE_LABELS: Record<MeetingAnalysis["meetingType"], string> = {
  "status-update": "Status Update",
  "decision-making": "Decision Making",
  brainstorming: "Brainstorming",
  planning: "Planning",
  review: "Review",
  other: "Other",
};

export function AnalysisResults({ analysis, hourlyRate, attendeeCount }: AnalysisResultsProps) {
  const painColor = getPainColor(analysis.painScore);
  const painLabel = getPainLabel(analysis.painScore);

  const timeData = [
    {
      name: "Necessary",
      value: analysis.estimatedNecessaryMinutes,
      fill: "#22c55e",
    },
    {
      name: "Wasted",
      value: analysis.estimatedWastedMinutes,
      fill: "#ea580c",
    },
  ];

  const wastedCost =
    (analysis.estimatedWastedMinutes / 60) * hourlyRate * attendeeCount;
  const totalMinutes =
    analysis.estimatedNecessaryMinutes + analysis.estimatedWastedMinutes;
  const wastePercent = totalMinutes > 0
    ? Math.round((analysis.estimatedWastedMinutes / totalMinutes) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Header / Verdict */}
      <Card className="border-fire-700/50">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {analysis.meetingTitle}
              </h3>
              <p className="text-sm text-muted-foreground italic">
                &quot;{analysis.verdict}&quot;
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">
                {MEETING_TYPE_LABELS[analysis.meetingType]}
              </Badge>
              <Badge
                className={`${
                  analysis.painScore >= 7
                    ? "bg-red-600"
                    : analysis.painScore >= 4
                    ? "bg-orange-600"
                    : "bg-green-600"
                } text-white`}
              >
                {painLabel}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Pain Score
            </div>
            <div className={`text-4xl font-bold counter-display ${painColor}`}>
              {analysis.painScore}
              <span className="text-lg text-muted-foreground">/10</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Efficiency
            </div>
            <div className="text-4xl font-bold counter-display text-blue-400">
              {analysis.overallEfficiencyScore}
              <span className="text-lg text-muted-foreground">%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Wasted $
            </div>
            <div className="text-4xl font-bold counter-display text-red-400">
              ${Math.round(wastedCost)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Time Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="h-[140px] w-[140px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {timeData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0 0% 7%)",
                      border: "1px solid hsl(0 0% 14.9%)",
                      borderRadius: "6px",
                    }}
                    formatter={(v: number) => [`${v} min`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                    Necessary
                  </span>
                  <span className="font-medium">
                    {analysis.estimatedNecessaryMinutes} min
                  </span>
                </div>
                <Progress
                  value={100 - wastePercent}
                  className="h-2 [&>div]:bg-green-500 [&>div]:fire-gradient-none"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                    Wasted
                  </span>
                  <span className="font-medium text-orange-400">
                    {analysis.estimatedWastedMinutes} min ({wastePercent}%)
                  </span>
                </div>
                <Progress value={wastePercent} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agenda Items */}
      {analysis.agendaItems.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Agenda Item Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.agendaItems.map((item, i) => (
              <div key={i} className="bg-secondary/40 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {item.canBeAsync ? (
                      <MessageSquare className="w-4 h-4 text-orange-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    )}
                    <span className="text-sm font-medium truncate">{item.topic}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {item.estimatedMinutes}m
                    </span>
                    <Badge
                      variant={
                        item.priority === "critical"
                          ? "destructive"
                          : item.priority === "high"
                          ? "fire"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {item.priority}
                    </Badge>
                    {item.canBeAsync && (
                      <Badge variant="warning" className="text-xs">
                        async
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pl-6">
                  {item.recommendation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {analysis.topRecommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-fire-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.topRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Async Candidates */}
      {analysis.asyncCandidates.length > 0 && (
        <Card className="border-orange-800/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              Could Be an Email
            </CardTitle>
            <CardDescription>
              These items don&apos;t require real-time discussion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {analysis.asyncCandidates.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
