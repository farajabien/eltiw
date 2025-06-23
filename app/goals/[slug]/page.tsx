import Link from "next/link";

interface SharedGoalsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SharedGoalsPage({ params }: SharedGoalsPageProps) {
  const { slug } = await params;
  // This is a server component - Slug Store will handle client-side state loading
  // The actual goals will be loaded by the client-side Slug Store when the page renders
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shared Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Powered by Slug Store - No database required
          </p>
        </div>

        {/* Loading State - Will be replaced by client-side content */}
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-primary/40 animate-ping"></div>
            </div>
            <div>
              <p className="text-lg font-medium">Loading shared goals...</p>
              <p className="text-sm text-muted-foreground mt-1">Powered by Slug Store technology</p>
            </div>
          </div>
        </div>

        {/* Client-side content will be injected here by Slug Store */}
        <div id="shared-goals-content" data-slug={slug}>
          {/* This div will be populated by client-side JavaScript */}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Create Your Own Goals
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start tracking your personal goals with ELTIW - powered by Slug Store technology
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-12 px-8"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 