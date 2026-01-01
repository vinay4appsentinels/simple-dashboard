# How to Take a Snapshot of the Application

This guide documents the exact steps to clone the main branch, run the application, and capture a snapshot. Use this as a reference guide for future snapshot tasks.

> **Note:** This process runs in a containerized environment without a display or headful browser. All screenshots must be captured using headless browser automation.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step-by-Step Instructions](#step-by-step-instructions)
- [Checklist](#checklist)
- [Troubleshooting](#troubleshooting)
- [Notes](#notes)

## Prerequisites

Before taking a snapshot, ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **Angular CLI** installed globally (`npm install -g @angular/cli`)
- **Git** installed
- **Playwright or Puppeteer** installed for headless screenshot capture
- **AWS CLI** configured for S3 uploads (if uploading to S3)

## Step-by-Step Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vinay4appsentinels/simple-dashboard.git
cd simple-dashboard
```

### 2. Checkout Main Branch

If not already on main:

```bash
git checkout main
git pull origin main
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Playwright

If not already installed:

```bash
npm install -D playwright
npx playwright install chromium
```

### 5. Run the Application in Background

```bash
ng serve &
```

Wait for the message:
```
** Angular Live Development Server is listening on localhost:4200 **
```

You can verify the server is running with:
```bash
curl -s http://localhost:4200 | head -20
```

### 6. Capture Screenshot Using Playwright (Headless)

Create a script named `screenshot.js`:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport size for consistent screenshots
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto('http://localhost:4200');
  await page.waitForLoadState('networkidle');

  // Wait a bit for any animations to complete
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();

  console.log('Screenshot saved: screenshot.png');
})();
```

Run the script:

```bash
node screenshot.js
```

### 7. Upload to S3 (Optional)

Upload the screenshot to S3 with a timestamp:

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
aws s3 cp screenshot.png s3://agent-screenshots-488922454646/vinay4appsentinels/simple-dashboard/snapshots/screenshot-${TIMESTAMP}.png --region us-east-1
```

Generate a pre-signed URL (valid for 7 days):

```bash
aws s3 presign s3://agent-screenshots-488922454646/vinay4appsentinels/simple-dashboard/snapshots/screenshot-${TIMESTAMP}.png --region us-east-1 --expires-in 604800
```

### 8. Attach to Relevant Issue

Add the S3 URL as a comment to the relevant GitHub issue:

```bash
gh issue comment <issue-number> --repo vinay4appsentinels/simple-dashboard --body "Screenshot: <S3-URL>"
```

### 9. Cleanup

Stop the background Angular server:

```bash
pkill -f "ng serve"
```

Or find and kill the specific process:

```bash
lsof -ti:4200 | xargs kill -9
```

## Checklist

Use this checklist to ensure all steps are completed:

- [ ] Repository cloned
- [ ] Main branch checked out and up to date
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright installed with Chromium
- [ ] Application running on localhost:4200
- [ ] Headless screenshot captured
- [ ] Screenshot uploaded to S3 (if required)
- [ ] S3 link attached to the relevant issue (if required)
- [ ] Background server process stopped

## Troubleshooting

### Application fails to start

**Error:** `ng: command not found`
**Solution:** Install Angular CLI globally:
```bash
npm install -g @angular/cli
```

### Playwright browser installation fails

**Error:** Missing system dependencies for Chromium
**Solution:** Install system dependencies:
```bash
# On Ubuntu/Debian
sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2
```

Or use Playwright's built-in dependency installer:
```bash
npx playwright install-deps chromium
```

### Screenshot is blank or incomplete

**Possible causes:**
1. Application not fully loaded
2. Network requests still pending

**Solutions:**
- Increase the `waitForTimeout` value
- Use `waitForLoadState('networkidle')` to wait for all network requests
- Add explicit waits for specific elements:
```javascript
await page.waitForSelector('app-root');
```

### Port 4200 already in use

**Solution:** Kill the existing process:
```bash
lsof -ti:4200 | xargs kill -9
```

Or use a different port:
```bash
ng serve --port 4201 &
```

## Notes

- **Always pull the latest main** before taking a snapshot to ensure you're capturing the current state
- **Use headless browser** (Playwright/Puppeteer) - no display is available in containerized environments
- **Consistent naming convention** - Use timestamps in filenames for traceability
- **Resource cleanup** - Always stop the background `ng serve` process after capturing to free up resources
- **Viewport consistency** - Set a standard viewport size (e.g., 1280x720) for consistent screenshots across captures

## Quick Reference Script

Here's a complete script that automates the entire snapshot process:

```bash
#!/bin/bash
# snapshot.sh - Automated snapshot capture script

set -e

echo "Starting snapshot process..."

# Ensure we're on main and up to date
git checkout main
git pull origin main

# Install dependencies
npm install

# Install Playwright if needed
npm install -D playwright
npx playwright install chromium

# Start the server in background
ng serve &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
while ! curl -s http://localhost:4200 > /dev/null; do
  sleep 2
done
echo "Server is ready!"

# Create screenshot script
cat > /tmp/screenshot.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:4200');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved: screenshot.png');
})();
EOF

# Capture screenshot
node /tmp/screenshot.js

# Stop the server
kill $SERVER_PID 2>/dev/null || true

echo "Snapshot complete! Screenshot saved to screenshot.png"
```

Make the script executable:
```bash
chmod +x snapshot.sh
./snapshot.sh
```
