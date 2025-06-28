import Link from "next/link";
import { SampleDataLoader } from "@/components/SampleDataLoader";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Sample Data Loader - Hidden but functional */}
      <SampleDataLoader />
      
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://github.com/farajabien/slug-store"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            ✨ Powered by Slug Store v3.1 - Now with Built-in Dev Tools
          </Link>
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Every Lil Thing I Want
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Complete financial tracking for <strong className="text-foreground">goals & loans</strong> with deadline planning, progress tracking, and instant URL sharing. 
            <strong className="text-foreground"> No database required</strong> - powered by revolutionary Slug Store technology.
          </p>
          <div className="space-x-4">
            <Link
              href="/loans"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Start Tracking
            </Link>
            <Link
              href="https://slugstore.fbien.com"
            target="_blank"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Learn About Slug Store
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Complete Financial Toolkit
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to track goals, manage loans, and plan your financial future.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {/* Feature 1 - Goals */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🎯 Smart Goal Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Track savings goals with automatic monthly calculations, progress bars, and deadline management.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 - Loans */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">💸 Loan Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Manage loans to friends & family with categories, deadlines, and repayment status tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 - Sharing */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">📱 Instant Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  One-click URL sharing with native share dialog, clipboard copy, and compressed URLs.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 - No Database */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🚀 Zero Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Slug Store v3.1. No servers, no databases, no maintenance. Just works.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 - Dev Tools */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🛠️ Built-in Dev Tools</h3>
                <p className="text-sm text-muted-foreground">
                  copySlug(), shareSlug(), getSlugData() - powerful utilities for effortless URL state management.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6 - Security */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🔐 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  IndexedDB offline storage, optional encryption, and complete privacy control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container mx-auto py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            The No-Database Revolution
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            ELTIW leverages Slug Store v3.1 - the perfect balance between ephemeral state and complex databases.
          </p>
          <div className="w-full max-w-3xl mt-8">
            <div className="bg-muted rounded-lg p-6 font-mono text-sm">
              <div className="text-center space-y-3">
                <div>Ephemeral State ←→ <strong className="text-primary">[SLUG STORE v3.1]</strong> ←→ Full Database</div>
                <div className="text-xs text-muted-foreground mt-4">
                  ↑ Perfect Balance + Built-in Dev Tools:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2">
                  <div>• copySlug() - Instant clipboard</div>
                  <div>• shareSlug() - Native sharing</div>
                  <div>• getSlugData() - State access</div>
                  <div>• 72% smaller bundle size</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="/loans"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Try It Now
            </Link>
            <Link
              href="https://github.com/farajabien/slug-store"
          target="_blank"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              View Source
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            How It Works
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Complete financial tracking in three simple steps.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-xl">Add Goals & Loans</h3>
              <p className="text-muted-foreground">
                Track what you want to save for and money you&apos;ve loaned out. Set deadlines and amounts automatically.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-xl">Track Progress</h3>
              <p className="text-muted-foreground">
                Log savings progress, mark loans as repaid, and watch visual progress bars keep you motivated.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-xl">Share Instantly</h3>
              <p className="text-muted-foreground">
                One-click sharing via URLs, native share dialog, or clipboard copy. No signup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Built for Real Life
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Real features for real financial tracking needs.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Complete Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Servers Required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5.5KB</div>
              <div className="text-sm text-muted-foreground">Total Bundle Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Scalability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Start?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join the no-database revolution. Track goals and loans with zero setup, infinite possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/loans"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Start Tracking
            </Link>
            <Link
              href="/goals"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              View Goals Only
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
