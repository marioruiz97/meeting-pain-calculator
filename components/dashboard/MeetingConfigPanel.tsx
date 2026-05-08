"use client";

import { Users, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MeetingConfig } from "@/lib/types";

interface MeetingConfigPanelProps {
  config: MeetingConfig;
  onChange: (updates: Partial<MeetingConfig>) => void;
}

export function MeetingConfigPanel({ config, onChange }: MeetingConfigPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wider">
          Meeting Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="attendees" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            Attendees
          </Label>
          <Input
            id="attendees"
            type="number"
            min={1}
            max={100}
            value={config.attendeeCount}
            onChange={(e) =>
              onChange({ attendeeCount: Math.max(1, parseInt(e.target.value) || 1) })
            }
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <DollarSign className="w-3.5 h-3.5" />
            Avg. Hourly Rate ($/hr)
          </Label>
          <Input
            id="rate"
            type="number"
            min={1}
            max={10000}
            value={config.hourlyRate}
            onChange={(e) =>
              onChange({ hourlyRate: Math.max(1, parseInt(e.target.value) || 50) })
            }
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Planned Duration (min)
          </Label>
          <Input
            id="duration"
            type="number"
            min={5}
            max={480}
            step={5}
            value={config.durationMinutes}
            onChange={(e) =>
              onChange({ durationMinutes: Math.max(5, parseInt(e.target.value) || 30) })
            }
            className="bg-secondary border-border"
          />
        </div>

        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">Projected total cost</div>
          <div className="text-fire-400 font-bold text-lg counter-display">
            ${((config.attendeeCount * config.hourlyRate * config.durationMinutes) / 60).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
