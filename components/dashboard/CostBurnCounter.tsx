"use client";

import { useEffect, useState, useRef } from "react";
import { Flame, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateMeetingCost, formatCurrency, formatDuration } from "@/lib/utils";

interface CostBurnCounterProps {
  attendeeCount: number;
  hourlyRate: number;
}

export function CostBurnCounter({ attendeeCount, hourlyRate }: CostBurnCounterProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          setTotalCost(calculateMeetingCost(attendeeCount, hourlyRate, next));
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, attendeeCount, hourlyRate]);

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setTotalCost(0);
  };

  const costPerMinute = (attendeeCount * hourlyRate) / 60;
  const isHighCost = totalCost > 500;
  const isCriticalCost = totalCost > 2000;

  return (
    <Card
      className={`border-2 transition-all duration-500 ${
        isCriticalCost
          ? "border-red-500 glow-red"
          : isHighCost
          ? "border-orange-500 glow-orange"
          : isRunning
          ? "border-fire-600"
          : "border-border"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame
            className={`w-5 h-5 ${
              isRunning ? "text-orange-400 animate-burn-pulse" : "text-muted-foreground"
            }`}
          />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Money Burning
          </span>
        </div>

        {/* Main Cost Display */}
        <div className="text-center mb-6">
          <div
            className={`font-bold counter-display transition-all duration-300 ${
              isCriticalCost
                ? "text-5xl text-red-400 glow-red"
                : isHighCost
                ? "text-5xl text-orange-400"
                : "text-5xl fire-text"
            }`}
          >
            {formatCurrency(totalCost)}
          </div>
          <div className="text-muted-foreground text-sm mt-2 counter-display">
            {formatDuration(elapsedSeconds)} elapsed
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Per Minute</div>
            <div className="text-fire-400 font-semibold counter-display text-sm">
              {formatCurrency(costPerMinute)}
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Per Hour</div>
            <div className="text-fire-400 font-semibold counter-display text-sm">
              {formatCurrency(attendeeCount * hourlyRate)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant={isRunning ? "outline" : "fire"}
            size="lg"
            className="flex-1"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {elapsedSeconds > 0 ? "Resume" : "Start Meeting"}
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" onClick={handleReset} disabled={elapsedSeconds === 0}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {isCriticalCost && (
          <div className="mt-3 text-center text-xs text-red-400 animate-burn-pulse font-medium">
            ⚠ Critical spend threshold reached
          </div>
        )}
      </CardContent>
    </Card>
  );
}
