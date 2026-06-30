"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics/ecommerce";

interface PurchaseTrackerProps {
  transactionId: string;
  value: number;
}

export default function PurchaseTracker({
  transactionId,
  value,
}: PurchaseTrackerProps) {
  useEffect(() => {
    if (!transactionId) return;
    const key = `purchase_tracked_${transactionId}`;
    if (sessionStorage.getItem(key)) return;
    trackPurchase({ transactionId, value });
    sessionStorage.setItem(key, "1");
  }, [transactionId, value]);

  return null;
}
