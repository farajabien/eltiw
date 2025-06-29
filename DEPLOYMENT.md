# ELTIW Deployment Guide

This guide covers deploying the ELTIW application to a production environment. For the best results, we recommend deploying on [Vercel](https://vercel.com/), as the app is optimized for its serverless platform.

---

## 1. Prerequisites
- A [GitHub](https://github.com/) account.
- [Node.js](https://nodejs.org/) version 18 or later.
- `pnpm` package manager.

---

## 2. Fork & Clone Repository
First, create your own copy of the ELTIW repository by forking it on GitHub. Then, clone your forked repository to your local machine.

```bash
git clone https://github.com/farajabien/eltiw.git
cd eltiw
```

---

## 3. Environment Variables
ELTIW is configured via environment variables. You'll need to set these up both for local development and for your production deployment on Vercel.

### Local Development
1.  Copy the example environment file:
    ```bash
    cp env.example .env.local
    ```
2.  Fill in the values in `.env.local`. All available variables are documented in `env.example`. At a minimum, you will need `RESEND_API_KEY` and `EMAIL_FROM` if you wish to use the email snapshot feature.

### Production (Vercel)
When you deploy to Vercel, you must add the same environment variables from your `.env.local` file to your Vercel project's settings.
1.  Go to your project on Vercel.
2.  Navigate to the **Settings** tab.
3.  Click on **Environment Variables**.
4.  Add each variable from `env.example` with its corresponding value.

---

## 4. Deployment Steps

### With the Vercel Dashboard (Recommended)
1.  Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2.  Click **"Add New... -> Project"**.
3.  Import the Git repository you forked earlier.
4.  Vercel will automatically detect that it's a Next.js project.
5.  Before deploying, go to the **Environment Variables** section and add your variables as described above.
6.  Click **"Deploy"**. Your application will be built and deployed.

### With the Vercel CLI
For those who prefer the command line:
```bash
# Install the Vercel CLI globally
pnpm install -g vercel

# Log in to your Vercel account
vercel login

# Link your local project to your Vercel project
vercel link

# Deploy to production
vercel --prod
```

---

## 5. Email Service (Resend)
To enable the "Email Snapshot" feature, you need to:
1.  Sign up for a free account at [resend.com](https://resend.com).
2.  Create an API key and add it as the `RESEND_API_KEY` environment variable.
3.  Add and verify a sending domain within Resend to avoid spam filters.
4.  Set the `EMAIL_FROM` environment variable to an address from your verified domain (e.g., `noreply@yourdomain.com`).

---

That's it! Your instance of ELTIW should now be running in production.

## 🚀 Production Deployment

ELTIW is designed for seamless deployment with zero infrastructure requirements. This guide covers deploying to Vercel with full production optimization.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [pnpm](https://pnpm.io/) package manager
- [Vercel CLI](https://vercel.com/cli) (optional)
- [Git](https://git-scm.com/) repository

## 🌍 Vercel Deployment

### 1. **Prepare Your Repository**

```bash
# Clone your repository
git clone https://github.com/yourusername/eltiw.git
cd eltiw

# Install dependencies
pnpm install

# Build locally to test
pnpm run build
```

### 2. **Environment Variables**

Create a `.env.local` file for local development:

```env
# Email Configuration (Optional - for email snapshots)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=you@yourdomain.com

# Analytics (Optional - for performance tracking)
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_APP_URL=https://eltiw.fbien.com
```

### 3. **Deploy to Vercel**

#### Option A: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables in the dashboard
5. Deploy

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. **Environment Variables in Vercel**

In your Vercel project dashboard, add these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for email snapshots | No |
| `EMAIL_FROM` | Sender email address | No |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics tracking | No |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | Yes |

## 🔧 Production Optimization

### 1. **Bundle Analysis**

```bash
# Analyze bundle size
pnpm run build
npx @next/bundle-analyzer
```

### 2. **Performance Monitoring**

ELTIW includes built-in performance monitoring:

- **Page Load Times**: Automatically tracked
- **Core Web Vitals**: Monitored via PerformanceMonitor
- **Analytics Events**: User interactions tracked
- **Error Tracking**: Automatic error logging

### 3. **SEO Optimization**

The app includes comprehensive SEO metadata:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "ELTIW - Every Lil Thing I Want",
  description: "Track your personal goals with deadline planning...",
  keywords: ["goal tracking", "wishlist", "savings calculator"],
  // ... full SEO configuration
};
```

### 4. **Security Headers**

Add security headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## 📊 Analytics & Monitoring

### 1. **Built-in Analytics**

ELTIW includes comprehensive analytics:

- **Goal Interactions**: Creation, updates, completions
- **Sharing Metrics**: URL copies, email snapshots
- **Performance Data**: Load times, user sessions
- **Error Tracking**: Automatic error logging

### 2. **View Analytics Data**

```javascript
// In browser console
const analyticsData = analytics.exportData();
console.log(analyticsData);

// Or download as JSON
const dataStr = JSON.stringify(analyticsData, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});
const url = URL.createObjectURL(dataBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'eltiw-analytics.json';
a.click();
```

## 🔐 Security Features

### 1. **Encryption**

- **Optional Password Protection**: Users can encrypt their goals
- **Web Crypto API**: Client-side encryption using browser APIs
- **No Server Storage**: All data stays in URLs

### 2. **Privacy**

- **No User Accounts**: No personal data collection
- **Client-Side Only**: All processing happens in browser
- **Optional Analytics**: Users can disable tracking

## 🚀 Performance Features

### 1. **Slug Store Technology**

- **30-70% URL Compression**: Using LZ-String
- **Instant Persistence**: No database required
- **Offline First**: Works completely offline
- **Cross-Device Sync**: Share URLs between devices

### 2. **Optimizations**

- **Code Splitting**: Automatic Next.js optimization
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with preconnect
- **Bundle Analysis**: Built-in bundle size monitoring

## 📱 Progressive Web App (PWA)

### 1. **PWA Features**

- **Offline Support**: Works without internet
- **Installable**: Add to home screen
- **Fast Loading**: Optimized for mobile
- **Responsive Design**: Works on all devices

### 2. **PWA Configuration**

```json
// public/manifest.json
{
  "name": "ELTIW - Every Lil Thing I Want",
  "short_name": "ELTIW",
  "description": "Track your personal goals with smart planning",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔄 Continuous Deployment

### 1. **GitHub Actions**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run build
      - run: pnpm run lint
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 2. **Environment Secrets**

Add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `ORG_ID`: Your Vercel organization ID
- `PROJECT_ID`: Your Vercel project ID

## 📈 Monitoring & Maintenance

### 1. **Health Checks**

```bash
# Check app health
curl https://your-app.vercel.app/api/health

# Monitor performance
curl https://your-app.vercel.app/api/analytics
```

### 2. **Error Monitoring**

ELTIW includes automatic error tracking:

- **Client Errors**: JavaScript errors logged
- **Performance Issues**: Slow loads tracked
- **User Feedback**: Analytics events for debugging

### 3. **Updates & Migrations**

The app includes automatic state migration:

- **Schema Versioning**: Automatic data migration
- **Backward Compatibility**: Old URLs still work
- **Graceful Degradation**: Handles missing data

## 🎯 Production Checklist

- [ ] **Environment Variables**: All required vars set
- [ ] **Domain Configuration**: Custom domain configured
- [ ] **SSL Certificate**: HTTPS enabled
- [ ] **Performance**: Bundle size optimized
- [ ] **SEO**: Meta tags and sitemap configured
- [ ] **Analytics**: Tracking enabled and working
- [ ] **Error Monitoring**: Error tracking active
- [ ] **Backup Strategy**: Data export functionality tested
- [ ] **Security**: Headers and encryption working
- [ ] **Mobile Testing**: Responsive design verified

## 🚀 Launch Strategy

### 1. **Pre-Launch**

- [ ] Beta testing with select users
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation review

### 2. **Launch Day**

- [ ] Monitor deployment
- [ ] Check analytics
- [ ] Verify all features
- [ ] Social media announcement

### 3. **Post-Launch**

- [ ] Monitor user feedback
- [ ] Track performance metrics
- [ ] Plan feature updates
- [ ] Scale as needed

## 📞 Support

For deployment issues:

1. **Check Vercel Logs**: Dashboard → Functions → Logs
2. **Review Analytics**: Browser console → Analytics data
3. **Test Locally**: `pnpm run dev` for debugging
4. **Community**: GitHub issues and discussions

---

**ELTIW is production-ready with enterprise-grade features, zero infrastructure requirements, and infinite scalability through Slug Store technology! 🚀** 