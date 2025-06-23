# ELTIW (Every Lil Thing I Want)

ELTIW is a modern, privacy-focused goal tracker for personal finance and life planning. It features deadline planning, progress tracking, secure link-based sharing, optional encryption, analytics, and more.

---

## Features
- Add, edit, and track personal goals
- Progress tracking with history
- Deadline and monthly savings planning
- Secure sharing (public/private, optional password)
- Optional end-to-end encryption
- Analytics integration (Vercel Analytics)
- Email goal snapshot sharing (Resend)
- Sample data loader for onboarding
- Responsive, modern UI with dark mode

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/eltiw.git
cd eltiw
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Copy the example environment file and fill in your values:
```bash
cp env.example .env.local
```

#### Required variables:
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_NAME` | The app name (displayed in UI and emails) |
| `NEXT_PUBLIC_APP_URL` | The base URL of your deployed app |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App description for SEO and sharing |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for email snapshot sharing |
| `EMAIL_FROM` | Sender email address for outgoing emails (e.g., `ELTIW <mail@fbien.com>`) |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | (Optional) Vercel Analytics project ID |

#### Feature flags:
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ENABLE_ENCRYPTION` | Enable optional goal encryption |
| `NEXT_PUBLIC_ENABLE_COMPRESSION` | Enable data compression for sharing |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics tracking |
| `NEXT_PUBLIC_ENABLE_EMAIL_SHARING` | Enable email snapshot sharing |
| `NEXT_PUBLIC_ENABLE_GOAL_CATEGORIES` | Enable goal categories feature |
| `NEXT_PUBLIC_ENABLE_PROGRESS_TRACKING` | Enable progress tracking feature |
| `NEXT_PUBLIC_ENABLE_DEADLINE_ALERTS` | Enable deadline alerts |

#### Goal management:
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_MAX_GOALS_PER_USER` | Max number of goals per user |
| `NEXT_PUBLIC_MAX_PROGRESS_ENTRIES_PER_GOAL` | Max progress entries per goal |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | Default currency (e.g., KES) |
| `NEXT_PUBLIC_SUPPORTED_CURRENCIES` | Supported currencies (comma-separated) |

#### Sharing & Security:
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ENABLE_PUBLIC_GOAL_SHARING` | Enable public goal sharing |
| `NEXT_PUBLIC_ENABLE_PASSWORD_PROTECTION` | Enable password protection for shared links |
| `NEXT_PUBLIC_MAX_SHARE_URL_LENGTH` | Max length for shareable URLs |

#### Development:
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to `development` or `production` |
| `NEXT_PUBLIC_DEBUG_MODE` | Enable debug mode (extra logs/UI) |
| `NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING` | Enable performance monitor overlay |

---

### 4. Run the app locally
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

## Deployment
- Deploy to [Vercel](https://vercel.com/) for best results (auto-detects Next.js)
- Set all environment variables in your Vercel dashboard
- For email features, set up [Resend](https://resend.com) and verify your sender domain

---

## License
MIT
