# Wish Surprise - Backend Configuration

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/wish-surprise

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
ALLOWED_AUDIO_TYPES=audio/mpeg,audio/wav,audio/ogg,audio/mp4

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Database Setup

### Local MongoDB

```bash
# Install MongoDB
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows/Linux - Download from mongodb.com

# Create database (automatic on first connection)
# Collections are created automatically
```

### MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free account
3. Create new cluster
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

## Development

```bash
npm install
npm run dev      # Start with nodemon
npm start        # Start production
npm run test     # Run tests
```

## API Documentation

### Authentication Flow

1. Admin submits email and password to `/api/admin/login`
2. Server validates credentials and returns JWT token
3. Client stores token in session/local storage
4. Token included in `Authorization: Bearer <token>` header for protected routes

### File Upload

- Photos: `/api/surprises/:id/photos` - Upload JPEG, PNG, GIF, WebP
- Audio: `/api/surprises/:id/audio` - Upload MP3, WAV, OGG, M4A
- Max file size: 10MB (configurable)

### QR Code Generation

- Endpoint: `/api/surprises/:id/qr`
- Returns base64 encoded PNG image
- Links to `/surprise/:slug` when scanned

## Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Surprise Collection
```javascript
{
  _id: ObjectId,
  admin_id: ObjectId,
  slug: String (unique),
  recipient_name: String,
  birthday_date: Date,
  age: Number,
  message: String,
  theme: String,
  password: String (hashed),
  photos: [{
    _id: ObjectId,
    path: String,
    uploadedAt: Date
  }],
  audio: {
    path: String,
    uploadedAt: Date
  },
  expiry: String,
  expires_at: Date,
  views: Number,
  last_viewed: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create wish-surprise-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=strong_random_secret

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Railway

1. Connect GitHub repo
2. Deploy to Railway
3. Add environment variables
4. Connect MongoDB

### AWS/DigitalOcean

1. Create server/droplet
2. Install Node.js and MongoDB
3. Clone repository
4. Run `npm install && npm start`
5. Setup PM2 for process management

## Security Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Setup HTTPS in production
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Setup file upload validation
- [ ] Use environment variables for sensitive data
- [ ] Implement input validation
- [ ] Use helmet for security headers
- [ ] Setup MongoDB authentication
- [ ] Regular database backups

## Monitoring

- Use PM2 for process management
- Setup error logging (Sentry)
- Monitor API performance
- Track database usage
- Setup uptime monitoring

