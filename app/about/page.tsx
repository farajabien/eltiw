import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">ELTIW</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every Lil Thing I Want - A revolutionary goal tracking app powered by Slug Store technology
          </p>
        </div>

        {/* What is ELTIW */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 What is ELTIW?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              ELTIW (Every Lil Thing I Want) is a modern goal tracking application that helps you organize, 
              track, and achieve your aspirations - no matter how big or small. From saving for a new gadget 
              to planning major life purchases, ELTIW keeps you motivated and on track.
            </p>
            <p>
              What makes ELTIW unique is its revolutionary approach to data storage and sharing. Unlike 
              traditional apps that require databases and user accounts, ELTIW uses cutting-edge Slug Store 
              technology to compress your entire goal data into shareable URLs.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Goal Tracking</h3>
                  <p className="text-gray-600 text-sm">Set targets, track progress, and visualize your journey</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💰</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Financial Planning</h3>
                  <p className="text-gray-600 text-sm">Track savings goals with progress calculations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visual Progress</h3>
                  <p className="text-gray-600 text-sm">Beautiful progress bars and completion indicators</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Sync</h3>
                  <p className="text-gray-600 text-sm">Share across devices without accounts</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Optional Encryption</h3>
                  <p className="text-gray-600 text-sm">Password-protect sensitive goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Snapshots</h3>
                  <p className="text-gray-600 text-sm">Send goal summaries to yourself or others</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mobile Friendly</h3>
                  <p className="text-gray-600 text-sm">Works perfectly on all devices</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                  <p className="text-gray-600 text-sm">No loading screens, instant updates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slug Store Technology */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">🚀 Powered by Slug Store Technology</h2>
          <div className="space-y-6">
            <p className="text-blue-100 leading-relaxed">
              ELTIW is built on revolutionary Slug Store technology - a breakthrough in client-side state 
              management that eliminates the need for traditional databases and user authentication systems.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🗜️</div>
                <h3 className="font-semibold mb-2">30-70% Compression</h3>
                <p className="text-sm text-blue-100">
                  Advanced algorithms compress your data into compact, shareable URLs
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🚫</div>
                <h3 className="font-semibold mb-2">No Database Required</h3>
                <p className="text-sm text-blue-100">
                  Complete application state lives in the URL - no servers needed
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold mb-2">Instant Sharing</h3>
                <p className="text-sm text-blue-100">
                  Share your goals across devices with a simple URL copy
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">The No-Database Revolution</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Traditional apps require complex backend infrastructure, user accounts, and database management. 
                Slug Store eliminates all of this by encoding your complete application state directly into URLs. 
                This means instant loading, perfect offline functionality, zero server costs, and seamless sharing 
                without any authentication barriers.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔧 How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Create Your Goals</h3>
                <p className="text-gray-600">Add your aspirations with target amounts, descriptions, and deadlines</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600">Log your savings and achievements as you work toward your goals</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Share & Sync</h3>
                <p className="text-gray-600">Copy your URL to access goals on any device or share with others</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Achieve Success</h3>
                <p className="text-gray-600">Stay motivated with visual progress tracking and milestone celebrations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔒 Privacy & Security</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Your privacy is our priority. ELTIW operates on a privacy-first architecture:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>No Data Collection:</strong> We don&apos;t store your personal information on our servers</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Client-Side Only:</strong> All data processing happens in your browser</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Optional Encryption:</strong> Password-protect sensitive goals with client-side encryption</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>No Tracking:</strong> We don&apos;t use cookies or analytics that compromise your privacy</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Get Started */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Achieving Your Goals?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join the no-database revolution and experience the future of goal tracking. 
              No signup required - start tracking your dreams today!
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link 
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Tracking Goals
              </Link>
              <a 
                href="https://slugstore.fbien.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-white/20"
              >
                Learn About Slug Store
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Built with ❤️ using Next.js and Slug Store technology
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2025 ELTIW - Every Lil Thing I Want
          </p>
        </footer>
      </div>
    </div>
  );
} 