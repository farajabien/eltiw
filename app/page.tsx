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
            Powered by Slug Store - The No-Database Revolution
          </Link>
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Every Lil Thing I Want
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Track your personal goals with deadline planning, progress tracking, and secure link-based sharing. 
            <strong className="text-foreground"> No database required</strong> - powered by revolutionary Slug Store technology.
          </p>
          <div className="space-x-4">
            <Link
              href="/goals"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Start Tracking Goals
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
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to track, plan, and achieve your goals.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {/* Feature 1 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">💰 Smart Financial Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically calculate monthly savings needed based on your goal cost and deadline.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">📊 Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Visual progress bars and check-ins to keep you motivated and on track.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🔗 Instant Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Share your goals via compressed URLs with 30-70% size reduction. No login required.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🚀 No Database</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Slug Store technology. Zero infrastructure, infinite scalability.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">📧 Email Snapshots</h3>
                <p className="text-sm text-muted-foreground">
                  Send progress snapshots via email with embedded shareable links.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">🔐 Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Optional encryption, no personal data transmission, complete privacy control.
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
            ELTIW leverages Slug Store - the perfect balance between ephemeral state and complex databases.
          </p>
          <div className="w-full max-w-2xl mt-8">
            <div className="bg-muted rounded-lg p-6 font-mono text-sm">
              <div className="text-center space-y-2">
                <div>Ephemeral State ←→ <strong className="text-primary">[SLUG STORE]</strong> ←→ Full Database</div>
                <div className="text-xs text-muted-foreground mt-4">
                  ↑ Perfect Balance:
                </div>
                <div className="text-xs text-muted-foreground">
                  • Instant persistence • Zero infrastructure
                </div>
                <div className="text-xs text-muted-foreground">
                  • Unlimited scalability • Maximum simplicity
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="/goals"
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
            Simple, powerful goal tracking in three steps.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-xl">Add Your Goals</h3>
              <p className="text-muted-foreground">
                Enter what you want, how much it costs, and when you want it. We&apos;ll calculate the monthly savings needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-xl">Track Progress</h3>
              <p className="text-muted-foreground">
                Log your savings progress with visual progress bars. Watch as you get closer to your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-xl">Share & Celebrate</h3>
              <p className="text-muted-foreground">
                Share your progress via secure links or email snapshots. Celebrate when you reach your goals!
              </p>
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
            Join the no-database revolution. Track your goals with zero setup, infinite possibilities.
          </p>
          <Link
            href="/goals"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
          >
            Start Tracking Goals
          </Link>
        </div>
      </section>
    </div>
  );
}
