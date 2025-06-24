# ELTIW (Every Lil Thing I Want)

ELTIW is a modern, privacy-focused goal tracker that helps you plan and achieve your personal finance and life goals. It features deadline planning, progress tracking, and secure, shareable goal states, all powered by [`@farajabien/slug-store`](https://github.com/farajabien/slug-store).

**The core principle: Your data lives in the URL.** There's no database and no server-side state. This makes it infinitely scalable, completely private, and instantly shareable.

---

## Features
- **URL-Powered Persistence**: All your goals are stored directly in the URL, powered by `slug-store`. Close your browser, come back later, and your goals are still there.
- **Instant Sharing**: Share your goals with anyone by simply copying and sending the URL. The recipient will see exactly what you see.
- **Add, Edit, and Track Goals**: Full CRUD functionality for your financial and personal goals.
- **Automatic Financial Planning**: Calculates monthly savings needed, progress percentage, and time remaining.
- **Optional Encryption & Compression**: Secure your data with password-based encryption and reduce URL length with powerful compression, controlled by environment variables.
- **Full-Featured Dashboard**: Get a complete overview of your total progress, completed goals, and recent activity.
- **Modern UI/UX**: A clean, responsive interface with dark mode, built with Next.js, Tailwind CSS, and shadcn/ui.
- **Email Snapshots**: Send a summary of your goals to any email address using Resend.
- **Sample Data**: A pre-populated set of sample goals helps new users get started instantly.

---

## Getting Started

### 1. Clone & Install
   ```bash
   git clone https://github.com/yourusername/eltiw.git
   cd eltiw
pnpm install
```

### 2. Configure Environment
Copy the example environment file and fill in your values. This is crucial for enabling features like email sharing and analytics.
```bash
cp env.example .env.local
```

All configurable variables are documented in `env.example`.

### 3. Run Locally
```bash
pnpm dev
```
The app will be available at `http://localhost:3000` (or the next available port).

---

## How Sharing Works

Thanks to `@farajabien/slug-store-react`, sharing is seamless:
1.  Add or update your goals.
2.  The URL in your address bar automatically updates to reflect the new state.
3.  Click the "Copy Share URL" button on the dashboard.
4.  This copies a clean link (e.g., `https://yourapp.com/?goals=...`) to your clipboard.
5.  Send this link to anyone. When they open it, the app will load with your exact set of goals.

---

## Deployment
This app is optimized for deployment on [Vercel](https://vercel.com/).
1.  Fork the repository.
2.  Create a new project on Vercel and link it to your forked repository.
3.  Add all the environment variables from your `.env.local` file to the Vercel project settings.
4.  For the email feature, sign up for a [Resend](https://resend.com) account, get your API key, and verify your sending domain.

---

## License
MIT
