"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ExecutiveSummaryProps {
  summary?: string;
}

export default function ExecutiveSummary({
  summary,
}: ExecutiveSummaryProps) {
  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>

      <CardContent>
        {summary ? (
          <p className="leading-7 text-muted-foreground whitespace-pre-line">
            {summary}
          </p>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            AI summary will appear here after report generation.
          </div>
        )}
      </CardContent>
    </Card>
  );
}