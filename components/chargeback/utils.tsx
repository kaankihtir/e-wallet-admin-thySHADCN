export function getCurrentStage(chargeback: any): string {
  // Determine the current stage based on status and timeline
  if (chargeback.status === "pending_at_tkpay") {
    return "TKPAY Initial Review";
  } else if (chargeback.status === "pending_at_bank") {
    return "Ziraat Bank Review";
  } else if (chargeback.status === "pending_info") {
    return "Waiting for Additional Info";
  } else if (chargeback.status === "approved") {
    return "Refund Processed";
  } else if (chargeback.status === "rejected") {
    return "Dispute Rejected";
  }
  return "Unknown Stage";
} 