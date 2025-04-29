"use client";

import { format } from "date-fns";
import { User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Log } from "@/db/schema/ticket_collection";

interface LogEntry {
  date: Date;
  handleByUserId: string;
  handleByUsername: string;
  handleByRole: string;
  assignToUserId: string;
  assignToUsername: string;
  assignToRole: string;
  note: string;
  status: string;
}

interface TicketLogTimelineProps {
  logs: Log[];
}

export function TicketLogTimeline({ logs }: TicketLogTimelineProps) {
  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open":
        return "default";
      case "in progress":
        return "secondary";
      case "done":
        return "outline";
      case "escalated":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {logs.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No activity recorded yet.
        </p>
      ) : (
        logs
          .slice()
          .reverse()
          .map((log, index) => (
            <div key={index} className="relative pl-6 pb-8">
              {/* Timeline connector */}
              {index !== logs.length - 1 && (
                <div className="absolute left-2.5 top-2.5 h-full w-px bg-border"></div>
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-2.5 h-5 w-5 rounded-full border-2 border-background bg-primary"></div>

              {/* Log content */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">
                    {format(new Date(log.date), "PPP p")}
                  </span>
                  <Badge
                    variant={getStatusBadgeVariant(log.status as string)}
                    className="capitalize"
                  >
                    {log.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>
                    <span className="font-medium">{log.handleByUsername}</span>{" "}
                    ({log.handleByUserRole})
                  </span>
                </div>

                <div className="mt-2 rounded-md border p-3 text-sm">
                  <p className="whitespace-pre-line">{log.note}</p>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
}
