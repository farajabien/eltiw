import { Metadata } from "next";
import { LoansClient } from "./LoansClient";

export const metadata: Metadata = {
  title: "ELTIW - Loans & Goals",
  description: "Track your loans, goals, and personal finances with deadline planning and progress tracking.",
};

export default function LoansPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        {/* Page Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">ELTIW Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              Powered by <span className="font-medium">Slug Store</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Track your loans, goals, and personal finances with smart planning and progress visualization.
          </p>
        </div>

        {/* Client-side Loans & Goals Management */}
        <LoansClient />
      </div>
    </div>
  );
} 