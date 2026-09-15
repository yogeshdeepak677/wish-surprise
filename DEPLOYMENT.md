# Wish Surprise - Deployment Guide

## Overview

This guide covers deploying both frontend and backend to production.

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect GitHub**
   - Go to vercel.com
   - Click "New Project"
   - Import GitHub repository

2. **Configure**
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app is live!

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Update `vite.config.js`:
   ```javascript
   export default {
     base: '/wish-surprise/',
   }
   ```

2. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## Backend Deployment

### Option 1: Heroku

```bash
# Create Heroku account and install CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create wish-surprise-api

# Add Procfile to backend/Procfile:
web: node server.js

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wish-surprise
heroku config:set JWT_SECRET=your-super-secret-key

# Deploy
cd backend
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Railway

1. Go to railway.app
2. Connect GitHub account
3. Create new project from repo
4. Add MongoDB plugin
5. Set environment variables
6. Deploy!

### Option 3: DigitalOcean

```bash
# Create droplet
# SSH into server

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-server
sudo systemctl start mongodb

# Clone repository
git clone https://github.com/yogeshdeepak677/wish-surprise.git
cd wish-surprise/backend

# Install dependencies
npm install

# Create .env file
echo "NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wish-surprise
JWT_SECRET=your-secret
CORS_ORIGIN=https://your-frontend-domain.com" > .env

# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "wish-surprise"
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt-get install -y nginx

# Configure /etc/nginx/sites-available/default
server {
    listen 80;
    server_name your-api-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable SSL with Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-api-domain.com
```

### Option 4: AWS EC2

1. Launch EC2 instance
2. Connect via SSH
3. Follow DigitalOcean steps above
4. Use Route 53 for DNS
5. Use S3 for file storage (optional)

## Database Setup

### MongoDB Atlas (Recommended for Cloud)

1. Create account at mongodb.com/cloud
2. Create cluster
3. Whitelist IP addresses
4. Get connection string
5. Add to backend `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wish-surprise?retryWrites=true&w=majority
   ```

## File Storage

### Option 1: Local Server (Simple)
- Store uploads in `/backend/uploads`
- Works for small deployments
- Backup uploads regularly

### Option 2: AWS S3 (Scalable)

```bash
npm install aws-sdk
```

Update backend code to use S3 for uploads.

### Option 3: Cloudinary (Easiest)

1. Sign up at cloudinary.com
2. Get API credentials
3. Use SDK for uploads
4. No server storage needed

## SSL/HTTPS

Always use HTTPS in production!

- **Heroku**: Free SSL automatically
- **Vercel**: Free SSL automatically
- **Self-hosted**: Use Let's Encrypt (Certbot)

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/wish-surprise-api.git main
```

## Monitoring & Maintenance

### Uptime Monitoring
- UptimeRobot.com
- Pingdom.com
- StatusPage.io

### Error Tracking
- Sentry.io
- LogRocket
- Rollbar

### Performance Monitoring
- New Relic
- DataDog
- CloudFlare Analytics

### Backups
- Daily MongoDB backups
- Store backups in S3
- Test restore procedures

## Post-Deployment Checklist

- [ ] Frontend accessible at custom domain
- [ ] Backend API accessible
- [ ] HTTPS working for both
- [ ] CORS configured correctly
- [ ] File uploads working
- [ ] QR code generation working
- [ ] Database backups automated
- [ ] Error logging configured
- [ ] Performance monitoring active
- [ ] DNS records updated
- [ ] SSL certificates auto-renewing
- [ ] Rate limiting enabled
- [ ] Admin account created
- [ ] Test surprise created end-to-end

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify environment variables
- Check port availability
- Review error logs

### CORS errors
- Update `CORS_ORIGIN` in backend
- Check frontend API URL
- Verify headers in request

### File uploads failing
- Check file size limits
- Verify MIME types
- Check directory permissions
- Ensure disk space available

### Database issues
- Check connection string
- Verify IP whitelist
- Test connection locally
- Check backup status

## Cost Estimation

- **Frontend (Vercel)**: Free tier included
- **Backend (Heroku)**: $7-50/month
- **Database (MongoDB Atlas)**: Free tier or $57+/month
- **Total**: $7-100/month depending on usage

