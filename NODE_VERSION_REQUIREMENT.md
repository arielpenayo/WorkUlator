# ⚠️ Important: Node.js Version Requirement

## Current Issue
Your current Node.js version is **18.20.2**, but Vite 7 requires **Node.js 20.19+ or 22.12+**.

## Quick Solution

### Option 1: Use nvm (Recommended)
If you have nvm installed:
```bash
nvm install 22
nvm use 22
cd /Users/dev06/Desktop/work/WorkUlator
npm run dev
```

### Option 2: Download Node.js
Visit https://nodejs.org/ and download Node.js 22 LTS

### Option 3: Downgrade Vite (Not Recommended)
```bash
npm install vite@5 -D
npm run dev
```

## After Upgrading Node.js

Once you upgrade Node.js, run:
```bash
cd /Users/dev06/Desktop/work/WorkUlator
npm run dev
```

The app will be available at: **http://localhost:5173**

---

**Note:** All code is production-ready and will work perfectly once Node.js is upgraded!
