# README.md

````markdown
# Every Lil Thing I Want (ELTIW)

**Track your personal "wish list" with goal-setting, deadlines, progress tracking, and secure link-based sharing.**

---

## 🚀 Project Overview
ELTIW is a revolutionary Next.js web app that empowers you to:
- **Track Goals**: Add, edit, and organize personal goals with smart financial planning
- **Auto-Calculate**: Monthly savings needed, progress percentages, and deadline tracking
- **Visual Progress**: Dynamic progress bars, detailed history, and completion celebrations
- **Instant Sharing**: Generate shareable URLs with complete goal state using Slug Store technology
- **No Database Required**: All data persists in URLs - perfect offline-first architecture
- **Cross-Device Sync**: Share URLs between devices for instant goal access


## 🔧 Tech Stack
- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui** for UI components
- **@farajabien/slug-store-react** - Production-ready URL state management with:
  - 30-70% URL compression using LZ-String
  - Optional encryption for sensitive data
  - Zustand-like API with automatic URL persistence
  - Framework-agnostic core for maximum flexibility
- **Resend** for transactional emails
- **Browser Notifications** (optional) for reminders
- **No Database Required** - Complete client-side persistence via URL state


## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/eltiw.git
   cd eltiw
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Configure environment**
   Create a `.env.local` file at the project root:

   ```env
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=you@yourdomain.com
   ```
4. **Run the development server**

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Folder Structure

```
/eltiw
├── app
│   ├── layout.tsx           # Global layout & styling
│   ├── page.tsx             # Home page with list, goal cards, add modal
│   ├── goals/
│   │   └── [slug]/
│   │       └── page.tsx     # Shareable goal view via slug
│   └── components           # Reusable React components
│       ├── ItemList.tsx     # Displays list of wants & goals
│       ├── AddItemModal.tsx # Multi-step modal to add new items
│       ├── GoalCard.tsx     # Renders cost, deadline, progress
│       ├── CheckInModal.tsx # Log partial progress
│       └── SlugManager.tsx  # Manage shareable slug links
├── lib
│   ├── useLocalStorage.ts   # Hook for syncing state
│   ├── slugStore.ts         # Slug store integration utilities
│   └── notify.ts            # Browser notification util
├── styles
│   └── globals.css          # Tailwind/global styles
├── .env.local               # Environment variables
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project metadata & scripts
```

## 📋 Usage

1. **Add a new goal**: Click **"Add New Goal"**, fill in name, cost, target date, and category, then save.
2. **Track progress**: Click **"Add Progress"** to log savings; visual progress bars update automatically.
3. **Edit goals**: Use the **"Edit"** button to modify name, cost, deadline, or category while preserving progress.
4. **View history**: Click **"View History"** on progress bars to see detailed savings timeline.
5. **Share instantly**: Click **"Share Goals"** to generate a compressed URL containing your complete goal state.
6. **URL State Management**: ELTIW uses [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react) for revolutionary URL-based persistence:
   - **Smart Compression**: 30-70% URL size reduction using LZ-String
   - **Instant Sharing**: Complete goal state encoded in shareable URLs
   - **No Database Required**: Everything persists in the URL itself
   - **Cross-Device Sync**: Share URL between devices for instant access
   - **Offline First**: Works completely offline once loaded
7. **Auto-calculations**: Monthly savings needed, progress percentages, and time remaining calculated automatically.
8. **Complete goals**: When saved amount reaches target cost, goals auto-complete with celebration UI.

## 🔐 URL State Technology & Security

### 🚀 The No-Database Revolution
ELTIW demonstrates [Slug Store React](https://www.npmjs.com/package/@farajabien/slug-store-react) - the perfect balance between ephemeral state and complex databases. This **production-ready solution** provides:

```
Ephemeral State ←→ [SLUG STORE] ←→ Full Database
                    ↑
               Perfect Balance:
               • Instant persistence
               • Zero infrastructure  
               • Unlimited scalability
               • Maximum simplicity
```

### ✨ Live Implementation Features
* **URL State Persistence**: Complete goal state automatically encoded in URLs using [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react)
* **Smart Compression**: 30-70% URL size reduction using LZ-String compression
* **Instant Sharing**: Click "Share Goals" to generate shareable URLs with complete state
* **Auto-Sync**: Debounced URL updates (500ms) for smooth user experience
* **Offline First**: Works completely offline - no server dependencies
* **Cross-Device**: Share URLs between any devices for instant goal access
* **No Database Required**: All state management handled client-side
* **Zero Infrastructure**: No servers, no storage costs, infinite scalability

### 🔒 Security & Privacy
* **Client-Side Only**: All processing happens in your browser
* **No Data Transmission**: Goals never leave your device unless you share the URL
* **Compressed State**: Only goal data (names, costs, progress) encoded in URLs
* **No Personal Info**: No user accounts, emails, or personal data collected

### 🌐 Try Slug Store Technology
* **Live Demo**: [slugstore.fbien.com](https://slugstore.fbien.com) - Interactive demos and documentation
* **GitHub**: [farajabien/slug-store](https://github.com/farajabien/slug-store) - Full monorepo with examples
* **NPM Package**: [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react) - React hooks for URL state

## 🔄 **Upcoming Architecture Refactor**

### 🎯 **The Insight: Slug Store is Both State AND Database**
After studying the [Slug Store documentation](https://slugstore.fbien.com/faq) and NPM packages, we realized we're underutilizing Slug Store's full potential. It's designed to act as **both state management AND database replacement** - not just URL persistence.

### 🚀 **Planned Improvements**
- **Eliminate Redundant State**: Remove separate `useGoalsStore` and `useGoalCalculations` hooks
- **Single Source of Truth**: Use Slug Store's `create()` function for Zustand-like global state
- **Enhanced Features**: Built-in compression, encryption, validation, and migration
- **Simplified Architecture**: 90% less code, better performance, easier maintenance

### 📅 **Refactor Timeline**
- **Week 1**: Create new Slug Store architecture
- **Week 2**: Migrate components to new store  
- **Week 3**: Add advanced features (encryption, validation)
- **Week 4**: Testing and optimization

This refactor will demonstrate the true power of Slug Store as a complete state management and persistence solution.

## 🛠️ Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm run dev`   | Start dev server at `localhost:3000` |
| `pnpm run build` | Build production assets              |
| `pnpm run start` | Run production server                |
| `pnpm run lint`  | Run ESLint                           |

## 📈 Roadmap

* [x] **Core Goal Management** - Add/edit/delete goals with smart calculations
* [x] **Progress Tracking** - Visual progress bars, detailed history, completion flow
* [x] **URL State Persistence** - [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react) integration
* [x] **Smart Compression** - 30-70% URL size reduction with LZ-String
* [x] **Instant Sharing** - "Share Goals" button with copy-to-clipboard
* [x] **Auto-Sync** - Debounced URL updates for smooth UX
* [x] **Offline First** - Complete functionality without server
* [x] **Professional UI** - Animations, loading states, responsive design
* [x] **Email Integration** - Resend API for goal snapshots
* [ ] **Slug Store Refactor** - Eliminate redundant state management
* [ ] **Optional Encryption** - Password-protected goal sharing
* [ ] **Dedicated Share Views** - `/goals/[slug]` route for shared goals
* [ ] **Reminder System** - Email/browser notifications for deadlines
* [ ] **Analytics Dashboard** - Progress charts and completion statistics
* [ ] **Collaborative Goals** - Multi-user goal tracking
* [ ] **Theming** - Dark/light mode support

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

## 📜 License

MIT © \[Your Name]

````

---

# PROJECT_OVERVIEW.md

```markdown
# ELTIW Project Overview

## Purpose & Goals
Every Lil Thing I Want (ELTIW) helps you set, track, and celebrate personal goals—big or small—by combining wish-list logging with robust goal-planning and secure link-based sharing:
- **Cost & Deadline Planning**: Calculate monthly savings needed automatically.
- **Check-ins & Progress Bars**: Record partial amounts and visualize momentum.
- **Reminders & Snapshots**: Schedule emails or browser prompts to stay accountable.
- **Secure Slug Links**: Unique, unguessable slugs in emails let you load your personal dashboard without accounts.

## Key Features
1. **Client-side Persistence**: All goal data lives in `localStorage`, ensuring offline-first behavior.
2. **Dynamic Goal Cards**: Display cost, deadline, months remaining, monthly needed, and visual progress bars.
3. **Check-In Modal**: Quick logging of incremental savings or notes.
4. **Link Slug Manager**: Generate, copy, or reset your unique access slug for shareable dashboards using [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react).
5. **Notifications Service**: Resend integration for email snapshots and browser push reminders.
6. **Export/Import**: Backup or transfer data via JSON or shareable URLs.

## Architecture & Data Flow
1. **UI Layer (Next.js + shadcn/ui)**
   - **AddItemModal**: Captures name, cost, deadline.
   - **GoalCard**: Shows computed fields, progress bar, and check-in button.
   - **SlugManager**: Handles slug generation & link copying using slug-store-react.

2. **State & Storage**
   - **useLocalStorage**: Manages read/write of goal arrays.
   - **@farajabien/slug-store-react**: Handles URL state management and slug generation.
   - **Schema**: `{ id, name, cost, deadline, history: [{ date, amount }], slug?, createdAt }`.

3. **Calculation Logic**
   - `monthsRemaining = max(1, diffInMonths(deadline, today))`.
   - `monthlyNeeded = round(cost / monthsRemaining)`.
   - `totalSaved = sum(history.amount)`; `progress = totalSaved / cost`.

4. **Shareable Slugs**
   - Generated using [@farajabien/slug-store-react](https://www.npmjs.com/package/@farajabien/slug-store-react) package.
   - Managed client-side with no database required.
   - Included in email snapshot links.
   - On `/goals/{slug}` route, client reads slug and loads matching data.

5. **Notifications Service**
   - **Resend API**: Sends HTML emails with embedded slug links (potentially integrated via @farajabien/slug-store-core).
   - **notify.ts**: Triggers browser push if enabled.

6. **Deployment**
   - Host on Vercel or Netlify with env vars for RESEND_API_KEY and EMAIL_FROM.
   - No database setup required - fully client-side with slug store management.

## User Journey
1. **First Use**: App generates slug using slug-store-react and prompts you to save/export it.
2. **Add Goals**: Name, cost, deadline → cards appear on dashboard.
3. **Review Plan**: Each card shows monthly savings needed.
4. **Check-In**: Log amounts; see progress bars move.
5. **Email Snapshot**: Send a progress email with your slug link via Resend.
6. **Secure Access**: Click the emailed link → app loads your goals from slug store.
7. **Celebrate**: Goals auto-complete when fully funded.

## Future Enhancements
- **Collaborative Goals**: Shared editable dashboards via slug permissions.
- **Analytics Dashboard**: Visualize all goals in charts (using Recharts).
- **Goal Templates**: Pre-defined common templates (e.g. "Car fund").
- **Authentication Layer**: Optional OAuth for cross-device sync.

## High-Level Timeline
| Phase               | Duration      | Milestones                                                    |
|---------------------|---------------|---------------------------------------------------------------|
| MVP & Core Features | 3 weeks       | Add/list/toggle, localStorage, deadline & cost logic, slug-store integration |
| Check-Ins & Emails  | 1 week        | Check-in modals, Resend email integration                     |
| Reminder Scheduler  | 1 week        | Browser notifications, scheduled emails                       |
| Polish & Testing    | 2 weeks       | UI/UX refinements, accessibility, bug fixes                   |
| Beta Release        | 2 weeks       | Invite-only testing, feedback loops                           |
| Public Launch       | 1 week        | Marketing, documentation, community kickoff                   |

## Team & Roles
- **Bienvenu Faraja**: Product owner & full-stack developer
- Future hires: UX designer, QA tester, growth marketer

## Metrics of Success
- **Monthly Active Users** > 100 within two months
- **Goals Created** > 200 by month 1
- **Email Engagement** (link clicks) > 50%
- **Retention Rate** (returning users monthly) > 70%
```

❓ Frequently Asked Questions (FAQ)

1. What is ELTIW?

ELTIW (Every Lil Thing I Want) is a revolutionary client-side Next.js web app that helps you track personal goals and wish-list items by logging costs, deadlines, and progress. It uses the enterprise-ready [Slug Store](https://github.com/farajabien/slug-store) technology to provide instant persistence and sharing without any database requirements.

2. How does the slug link work?

ELTIW leverages the production-ready [Slug Store](https://github.com/farajabien/slug-store) to generate compressed, unguessable slugs tied to snapshots of your goal data. With 30-70% URL compression and optional encryption, the link https://eltiw.fbien.com/goals/{slug} loads the exact state in a view-only dashboard - no user accounts, no database, infinite scalability.

3. How do I add a goal?

Click "Add New Want", enter the name, cost, and deadline, then save. A goal card appears showing required monthly savings and a progress bar.

4. How is the monthly savings amount calculated?

ELTIW divides the total cost by the number of months remaining until the deadline (minimum 1). It updates automatically over time.

5. How do I record progress?

Click "Log Progress" on a goal card, enter the saved amount or notes, and the progress bar and remaining balance update in real time.

6. What happens when I reach my target?

Once the cumulative saved amount meets or exceeds the goal's cost, the card auto-marks Completed, turns green, and displays a ✅.

7. Can I get reminders?

Yes—enable email or browser notifications in the Settings. You can receive monthly or milestone alerts via Resend emails or browser push.

8. Is my data secure?

Absolutely! ELTIW uses the enterprise-grade [Slug Store](https://github.com/farajabien/slug-store) with multiple security layers:
- All data lives in localStorage - never sent to servers
- Slugs use cryptographically secure randomization  
- 30-70% URL compression reduces exposure
- Optional Web Crypto API encryption for sensitive data
- No personal data transmission to any backend

9. Can I export or import my data?

Use the Export button to download your goals as JSON. The Import option lets you paste JSON to restore or transfer data across devices. The [Slug Store](https://github.com/farajabien/slug-store) technology also enables instant sharing via URLs.

10. Will ELTIW work offline?

Yes! ELTIW embraces the "No-Database Revolution" - it's fully client-side with zero infrastructure requirements. Once loaded, it runs completely offline with full functionality.

11. Are there limits on goals?

No limits! ELTIW leverages the enterprise-ready [Slug Store](https://github.com/farajabien/slug-store) for unlimited scalability. Performance stays smooth through efficient localStorage operations and smart URL compression.

12. What's coming next?

Collaborative goal sharing

Analytics dashboard and mini charts

Goal templates (e.g., car fund)

Theming (dark/light mode)

Optional OAuth-based sync

Feel free to contribute or request new questions!

