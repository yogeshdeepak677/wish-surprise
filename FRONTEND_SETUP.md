# Wish Surprise - Frontend Configuration

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Wish Surprise
VITE_APP_VERSION=1.0.0
```

## Development

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Deployment

The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command: `npm run build`
Build output: `dist/`
