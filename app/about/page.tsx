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
            Every Lil Thing I Want - A revolutionary goal and loan tracking app powered by Slug Store technology
          </p>
        </div>

        {/* What is ELTIW */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 What is ELTIW?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              ELTIW (Every Lil Thing I Want) is a comprehensive financial tracking application that helps you organize, 
              track, and achieve your goals while managing your personal loans. From saving for a new gadget 
              to tracking money you&apos;ve lent to friends, ELTIW keeps you motivated and organized.
            </p>
            <p>
              What makes ELTIW unique is its revolutionary approach to data storage and sharing. Unlike 
              traditional apps that require databases and user accounts, ELTIW uses cutting-edge Slug Store 
              technology to compress your entire financial data into shareable URLs.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 font-medium">
                💡 <strong>Fun Fact:</strong> ELTIW can compress your complete financial data by up to 70%, 
                fitting months of goal tracking and loan records into a single, shareable URL!
              </p>
            </div>
          </div>
        </section>

        {/* Dual Functionality */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="text-2xl font-bold text-gray-900">Goals Tracking</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Set and track savings goals</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Visual progress tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Card and table view options</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Goal categories and deadlines</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Progress history and notes</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900">Loan Management</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-purple-500">✓</span>
                <span>Track people who owe you money</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-purple-500">✓</span>
                <span>Record partial payments</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-purple-500">✓</span>
                <span>Follow-up reminders and notes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-purple-500">✓</span>
                <span>Payment history tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-purple-500">✓</span>
                <span>Overdue alerts and deadlines</span>
              </li>
            </ul>
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
                  <p className="text-gray-600 text-sm">Set targets, track progress, and visualize your journey with beautiful charts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💳</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Payment Tracking</h3>
                  <p className="text-gray-600 text-sm">Record partial payments, track payment methods, and maintain payment history</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Multiple Views</h3>
                  <p className="text-gray-600 text-sm">Switch between cute card views and detailed table views</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Sync</h3>
                  <p className="text-gray-600 text-sm">Share across devices without accounts or login</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🔔</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Follow-up System</h3>
                  <p className="text-gray-600 text-sm">Set follow-up dates and maintain relationship notes for loans</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Snapshots</h3>
                  <p className="text-gray-600 text-sm">Send goal and loan summaries to yourself or others</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mobile Optimized</h3>
                  <p className="text-gray-600 text-sm">Perfect experience on all devices with responsive design</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                  <p className="text-gray-600 text-sm">No loading screens, instant updates, offline functionality</p>
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
                  Advanced algorithms compress your complete financial data into compact, shareable URLs
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🚫</div>
                <h3 className="font-semibold mb-2">No Database Required</h3>
                <p className="text-sm text-blue-100">
                  Complete application state lives in the URL - no servers, no accounts needed
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold mb-2">Instant Sharing</h3>
                <p className="text-sm text-blue-100">
                  Share your goals and loans across devices with a simple URL copy
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">The No-Database Revolution</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Traditional financial apps require complex backend infrastructure, user accounts, and database management. 
                Slug Store eliminates all of this by encoding your complete application state directly into URLs. 
                This means instant loading, perfect offline functionality, zero server costs, and seamless sharing 
                without any authentication barriers. Your financial data is always under your control.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔧 How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Goals:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Goals</h4>
                    <p className="text-gray-600 text-sm">Add your aspirations with target amounts and deadlines</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Track Progress</h4>
                    <p className="text-gray-600 text-sm">Log your savings with notes and watch progress grow</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Celebrate Success</h4>
                    <p className="text-gray-600 text-sm">Achieve your goals and celebrate milestones</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Loans:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Record Loans</h4>
                    <p className="text-gray-600 text-sm">Add borrower details, amounts, and follow-up notes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Track Payments</h4>
                    <p className="text-gray-600 text-sm">Record partial payments and maintain payment history</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Follow Up</h4>
                    <p className="text-gray-600 text-sm">Use follow-up dates and notes to maintain relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔒 Privacy & Security</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Your financial privacy is our priority. ELTIW operates on a privacy-first architecture:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2">
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
                  <span><strong>Optional Encryption:</strong> Password-protect sensitive financial data</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>No Tracking:</strong> We don&apos;t use cookies or analytics that compromise privacy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Your Control:</strong> Export, share, or delete your data anytime</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Open Source:</strong> Transparent code for complete trust</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Finance Enthusiasts</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Students saving for gadgets or trips</li>
                <li>• Professionals planning major purchases</li>
                <li>• Anyone wanting to build better savings habits</li>
                <li>• People who prefer privacy-first solutions</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Loan Managers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Friends and family who lend money</li>
                <li>• Small business owners tracking receivables</li>
                <li>• Anyone who wants to maintain good relationships</li>
                <li>• People who need organized financial records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join the no-database revolution and experience the future of personal finance tracking. 
              No signup required - start organizing your financial life today!
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link 
                href="/dashboard"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Tracking Now
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
            Built with ❤️ using Next.js, TypeScript, and Slug Store technology
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2025 ELTIW - Every Lil Thing I Want. Privacy-first financial tracking.
          </p>
        </footer>
      </div>
    </div>
  );
} 