# Deployment Guide

## Vercel Deployment

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit: Pulse token discovery table"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Environment Variables (if needed)
If you need to configure WebSocket endpoints or API keys:
1. Go to Project Settings > Environment Variables
2. Add your variables
3. Redeploy

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Performance Testing

### Lighthouse Audit
1. Build the project: `npm run build && npm start`
2. Open Chrome DevTools
3. Go to Lighthouse tab
4. Run audit for Mobile and Desktop
5. Target: ≥ 90 on all metrics

### Responsive Testing
1. Open Chrome DevTools
2. Toggle Device Toolbar (Cmd/Ctrl + Shift + M)
3. Test at: 320px, 768px, 1024px, 1920px
4. Verify layout adapts correctly

## Video Recording

To create the 1-2 minute demo video:

1. **Screen Recording Tools:**
   - macOS: QuickTime Player or ScreenFlow
   - Windows: OBS Studio or Windows Game Bar
   - Online: Loom, Screencastify

2. **What to Show:**
   - Opening the application
   - Three columns displaying tokens
   - Hover effects on token cards
   - Clicking a token to open modal
   - Using popover on "View" button
   - Sorting functionality (V and MC buttons)
   - Real-time price updates (watch percentages change)
   - Responsive design (resize window)
   - Loading states (refresh page)

3. **Upload to YouTube:**
   - Set video to Public or Unlisted
   - Add description with project details
   - Share link in README

## Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### WebSocket Connection
- The mock WebSocket runs automatically
- For production, configure real WebSocket endpoint
- Update `useMockWebSocket.ts` or use `useWebSocket.ts`

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.ts` for correct paths
- Verify `globals.css` imports Tailwind directives

