"use client";

import { 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle, 
  Send, 
  ArrowRight, 
  XCircle, 
  User 
} from "lucide-react"
import { format } from "date-fns"

interface Event {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  responsible?: "TKPAY" | "ZiraatBank" | "Customer";
}

interface ChargebackFlowTimelineProps {
  events: Event[];
  type: "POS" | "ATM";
}

export function ChargebackFlowTimeline({ events, type }: ChargebackFlowTimelineProps) {
  // Sort events by timestamp (oldest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  return (
    <div className="relative space-y-0">
      <div className="absolute inset-0 flex justify-center pt-2">
        <div className="h-full w-0.5 bg-muted"></div>
      </div>
      
      {sortedEvents.map((event, index) => (
        <div key={index} className="relative flex items-start gap-4 pb-8 pt-2">
          <div className="absolute flex h-full w-6 items-center justify-center pt-8">
            <div className="h-full w-0.5 bg-muted"></div>
          </div>
          
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background z-10">
            {getEventIcon(event.type)}
          </div>
          
          <div className="flex-1 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h4 className="font-medium">{event.title}</h4>
                {event.responsible && (
                  <ResponsibleBadge responsible={event.responsible} />
                )}
              </div>
              <time className="text-xs text-muted-foreground">
                {format(new Date(event.timestamp), "dd MMM yyyy HH:mm")}
              </time>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
            
            {/* Special rendering for specific event types */}
            {(event.type === "status_bank_review" && type === "POS") && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Flow:</span> TKPAY → Ziraat Bank → Banksoft CTM
              </div>
            )}
            
            {(event.type === "status_bank_review" && type === "ATM") && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Flow:</span> TKPAY → Ziraat Bank → Anahtar System
              </div>
            )}
            
            {event.type === "info_requested" && (
              <div className="mt-2 rounded-md bg-blue-50 p-2 text-xs text-blue-700">
                <span className="font-medium">Action Required:</span> TKPAY needs to collect additional information from the customer.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function getEventIcon(type: string) {
  switch (type) {
    case "created":
      return <User className="h-3 w-3" />;
    case "status_tkpay_review":
      return <Clock className="h-3 w-3" />;
    case "status_bank_review":
      return <Send className="h-3 w-3" />;
    case "info_requested":
      return <AlertCircle className="h-3 w-3" />;
    case "document_added":
      return <FileText className="h-3 w-3" />;
    case "status_change":
      return <ArrowRight className="h-3 w-3" />;
    case "approved":
      return <CheckCircle className="h-3 w-3" />;
    case "rejected":
      return <XCircle className="h-3 w-3" />;
    default:
      return <Clock className="h-3 w-3" />;
  }
}

function ResponsibleBadge({ responsible }: { responsible: string }) {
  let classes = "ml-2 rounded-full px-2 py-0.5 text-xs ";
  
  switch (responsible) {
    case "TKPAY":
      classes += "bg-rose-50 text-rose-700";
      break;
    case "ZiraatBank":
      classes += "bg-green-50 text-green-700";
      break;
    case "Customer":
      classes += "bg-blue-50 text-blue-700";
      break;
    default:
      classes += "bg-gray-50 text-gray-700";
  }
  
  return <span className={classes}>{responsible}</span>;
} 