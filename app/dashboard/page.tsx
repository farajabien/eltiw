import { DashboardClient } from './DashboardClient';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            📊 Dashboard
          </h1>
          <p className="text-gray-600">
            Track your progress and stay motivated with your goal achievements
          </p>
        </div>

        {/* Client-side dashboard content */}
        <DashboardClient />
      </div>
    </div>
  );
} 