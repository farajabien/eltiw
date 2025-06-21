# README.md

````markdown
# Every Lil Thing I Want (ELTIW)

**Track your personal “wish list” with goal-setting, deadlines, and progress reminders.**

---

## 🚀 Project Overview
ELTIW is a lightweight Next.js web app that lets you:
- Log and categorize every item or goal you want to acquire.
- Assign cost, target date, and calculate monthly savings needed.
- Track partial progress with check-ins and dynamic progress bars.
- Receive periodic reminders and progress snapshots via email or browser notifications.
- Store all data in `localStorage` for seamless, offline-first persistence.


## 🔧 Tech Stack
- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui** for UI components
- **Resend** for transactional emails
- **Browser Notifications** (optional) for reminders
- **localStorage** for client-side persistence


## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/eltiw.git
   cd eltiw
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env.local` file:

   ```env
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=you@yourdomain.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000).

## 🗂️ Folder Structure

```
/eltiw
├── app
│   ├── layout.tsx           # Global layout & styling
│   ├── page.tsx             # Home page with list, goal cards, add modal
│   └── components           # Reusable React components
│       ├── ItemList.tsx     # Displays list of wants & goals
│       ├── AddItemModal.tsx # Multi-step modal to add new items
│       ├── GoalCard.tsx     # Renders cost, deadline, progress
│       └── CheckInModal.tsx # Log partial progress
├── lib
│   ├── useLocalStorage.ts   # Hook for syncing state
│   ├── resend.ts            # Wrapper for Resend email service
│   └── notify.ts            # Browser notification util
├── styles
│   └── globals.css          # Tailwind/global styles
├── .env.local               # Environment variables
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project metadata & scripts
```

## 📋 Usage

1. **Add a new want/goal**: Click **“Add New Want”**, fill in name, cost, and target date, then save.
2. **View goal details**: Each card shows cost, deadline, monthly savings needed, and progress bar.
3. **Check-in**: Click **“Log Progress”** to record partial savings; the progress bar updates accordingly.
4. **Mark done**: When saved amount reaches cost, it auto-completes (green ✅).
5. **Reminders**: Enable email or browser notifications in settings to get monthly or milestone alerts.
6. **Export/Import**: Export JSON to backup or share; import to restore.

## 🛠️ Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start dev server at `localhost:3000` |
| `npm run build` | Build production assets              |
| `npm run start` | Run production server                |
| `npm run lint`  | Run ESLint                           |

## 📈 Roadmap

* [x] Core add/list/toggle + localStorage sync
* [x] Audio progress & completed state
* [x] Resend email snapshots
* [ ] **Cost & deadline inputs** + auto-calc monthly savings
* [ ] **Check-in flow** for partial progress logging
* [ ] **Reminder scheduler** via email/browser notifications
* [ ] **Progress dashboard** with bars & charts
* [ ] Export/import via shareable link
* [ ] Theming (dark/light mode)
* [ ] Mobile optimization

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
Every Lil Thing I Want (ELTIW) helps you set, track, and celebrate personal goals—big or small—by combining wish-list logging with goal-planning features:
- **Cost, Deadline & Savings Plan**: Enter an item’s cost and target date; ELTIW calculates how much you need to save per month.
- **Check-ins & Partial Progress**: Log weekly or monthly contributions toward each goal, updating dynamic progress bars.
- **Reminders & Notifications**: Receive email or browser reminders to review your goals and stay on track.
- **Visual Reinforcement**: Completed goals turn green with a ✅, and upcoming goals show deadline & savings pace.

## Key Features
1. **Client‑side Persistence**: Data stored in `localStorage`; no backend required for core flow.
2. **Dynamic Goal Cards**: Show cost, deadline, monthly required, and progress bar per goal.
3. **Check-In Modal**: Record partial savings or notes; update totals instantly.
4. **Reminders**: Monthly or milestone-based alerts via Resend emails or browser push.
5. **Export/Import**: One-click JSON export and easy import via URL parameter or file.

## Architecture & Data Flow
1. **UI Layer (Next.js + shadcn/ui)**
   - `AddItemModal` captures name, cost, deadline.
   - `GoalCard` displays computed fields and progress bar.
   - `CheckInModal` logs partial amounts.

2. **State & Storage**
   - `useLocalStorage` hook manages read/write state to `localStorage`.
   - Goal objects follow schema: `{ id, name, cost, deadline, history: [{ date, amount }], createdAt }`.

3. **Calculation Logic**
   - On render, compute `monthsRemaining = max(1, diffInMonths(deadline, today))`.
   - `monthlyNeeded = round(cost / monthsRemaining)`.
   - `totalSaved = sum(history.amount)`; progress = `totalSaved / cost`.

4. **Notifications Service**
   - `resend.ts` for email snapshots.
   - `notify.ts` for browser push reminders.
   - Schedule in-app or email reminders on goal creation.

5. **Deployment**
   - Vercel or Netlify, with env vars for Resend and notification config.

## User Journey
1. **Add Goal**: Enter name, cost, and deadline → new card appears on dashboard.
2. **Review Plan**: Card shows required monthly savings and timeline.
3. **Log Savings**: Use Check-In to record amounts; bar updates.
4. **Receive Reminder**: Monthly prompt to check progress.
5. **Celebrate**: Upon reaching cost, card auto-completes and shows a ✅.
6. **Export/Import**: Backup or share progress via JSON link.

## Future Enhancements
- **Collaborative Goals**: Shared lists with friends or partners.
- **Analytics Dashboard**: Charts of goals by category, term, completion rate.
- **Goal Templates**: Pre-defined templates (e.g. “Car fund,” “Vacation fund”).
- **Authentication**: OAuth to sync across devices.

## High‑Level Timeline
| Phase             | Duration      | Milestones                                            |
|-------------------|---------------|-------------------------------------------------------|
| MVP Development   | 2 weeks       | Core add/list/toggle, localStorage, basic UI          |
| Goal Planning     | 1 week        | Cost, deadline, monthlyNeeded logic                   |
| Check-In & Reminders | 1 week     | CheckIn flow + Resend/browser notifications           |
| Polishing         | 1 week        | UI tweaks, charts, accessibility                      |
| Beta Testing      | 2 weeks       | User feedback, bug fixes                              |
| Launch            | 1 week        | Public release, social announcement                   |

## Team & Roles
- **Bienvenu Faraja**: Product owner & full‑stack dev
- Future hires: UX designer, QA tester, growth marketer

## Metrics of Success
- **Monthly Active Users** > 100 within two months
- **Goals Created** > 200 in month 1
- **Reminder Engagement** (emails opened) > 50% click-through
- **Retention** (users returning monthly) > 70%
````
