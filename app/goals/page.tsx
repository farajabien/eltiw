import { Metadata } from "next";
import { GoalsClient } from "./GoalsClient";

export const metadata: Metadata = {
  title: "My Goals",
  description: "Track and manage your personal goals with deadline planning and progress tracking.",
};

export default function GoalsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        {/* Page Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Goals</h1>
            <div className="text-sm text-muted-foreground">
              Powered by <span className="font-medium">Slug Store</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Track your personal goals with smart financial planning and progress visualization.
          </p>
        </div>

        {/* Client-side Goals Management */}
        <GoalsClient />
      </div>
    </div>
  );
} 