# 🎉 Wish Surprise - Create Magical Birthday Experiences

Wish Surprise is a full-stack web application that allows users to create personalized, interactive birthday surprise experiences with photos, audio messages, and beautiful animations.

## ✨ Features

- 🎨 **6 Beautiful Themes** - Rose Dream, Sunset Love, Midnight Romance, Mint Celebration, Retro 80s, Elegant Gold
- 📸 **Photo Gallery** - Upload and showcase special memories
- 🔊 **Audio Messages** - Add personalized voice messages
- 🔐 **Password Protection** - Keep surprises secure
- 🔗 **QR Code Sharing** - Easy sharing via QR code or direct link
- ✨ **Confetti Animations** - Magical birthday celebration effects
- ⏰ **Auto Expiry** - Set when surprises expire (24h, 48h, 7d, 30d, or Never)
- 🎯 **Admin Dashboard** - Manage all your surprises
- 📱 **Responsive Design** - Works on all devices
- 🎬 **Smooth Animations** - Framer Motion powered interactions

## 🏗️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Routing
- **Canvas Confetti** - Confetti effects

### Backend
- **Node.js/Express** - Server
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **QRCode** - QR code generation
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
wish-surprise/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Layout/        # Header, Footer
│   │   │   ├── Surprise/      # Surprise creation & management
│   │   │   └── Recipient/     # Birthday experience components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── constants/         # App constants (themes, options)
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Express middleware
│   ├── config/                # Configuration
│   └── server.js              # Server entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yogeshdeepak677/wish-surprise.git
cd wish-surprise
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/wish-surprise
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=3000" > .env

# Start MongoDB (if not running)
# mongod

# Run backend
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env.local

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 How to Use

### For Admins (Creating Surprises)

1. **Sign Up/Login** to the admin dashboard
2. **Click "Create New"** to start creating a surprise
3. **Fill in Details**:
   - Recipient name
   - Birthday date
   - Age (optional)
   - Personal message
   - Choose a theme
   - Set password and expiry
4. **Upload Media**:
   - Add photos from special moments
   - Record or upload audio message
5. **Share**:
   - Generate QR code
   - Copy direct link
   - Send to recipient

### For Recipients (Viewing Surprises)

1. **Scan QR Code** or **Click Link**
2. **Enter Password** to unlock the surprise
3. **Enjoy the Experience**:
   - Watch confetti animation
   - Read the birthday message
   - Listen to audio message
   - View photo gallery

## 🔐 Security Features

- Password-protected surprises
- JWT-based admin authentication
- Secure file uploads (images only for photos)
- CORS protection
- Environment variable configuration
- Bcrypt password hashing

## 🎨 Customization

### Add New Theme

Edit `src/constants/themes.js`:
```javascript
export const THEMES = {
  'Your Theme Name': {
    primary: '#color1',
    secondary: '#color2',
    accent: '#color3',
    gradient: 'from-color1 to-color2',
    bgGradient: 'from-color1-light to-color2-light',
  },
  // ... other themes
};
```

### Modify Animations

Edit `src/utils/confetti.js` to customize confetti effects.

## 📝 API Endpoints

### Admin Routes
- `POST /api/admin/login` - Login
- `GET /api/admin/me` - Get current admin
- `POST /api/admin/logout` - Logout
- `POST /api/admin/change-password` - Change password

### Surprise Routes
- `POST /api/surprises` - Create surprise
- `GET /api/surprises` - Get all admin's surprises
- `PUT /api/surprises/:id` - Update surprise
- `DELETE /api/surprises/:id` - Delete surprise
- `POST /api/surprises/:id/photos` - Upload photo
- `POST /api/surprises/:id/audio` - Upload audio
- `GET /api/surprises/:id/qr` - Get QR code
- `DELETE /api/surprises/media/:mediaId` - Delete media

### Public Routes
- `GET /api/public/:slug` - Get surprise (public)
- `POST /api/public/:slug/unlock` - Unlock surprise

## 🚀 Deployment

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Deploy to Heroku (Backend)

```bash
# Create Heroku app
heroku create wish-surprise-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
cd backend
git push heroku main
```

### Database (MongoDB Atlas)

1. Create account at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create cluster
3. Get connection string
4. Add to `.env` file

## 🛠️ Development

### Running Tests
```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# This creates a `dist` folder ready for deployment
```

## 📦 Dependencies

### Frontend Key Packages
- react@^18.0.0
- react-router-dom@^6.0.0
- axios@^1.0.0
- framer-motion@^10.0.0
- tailwindcss@^3.0.0
- canvas-confetti@^1.5.0

### Backend Key Packages
- express@^4.18.0
- mongoose@^7.0.0
- jsonwebtoken@^9.0.0
- bcryptjs@^2.4.0
- multer@^1.4.0
- qrcode@^1.5.0

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check `VITE_API_URL` in `.env.local`
- Ensure backend is running on port 3000
- Check CORS settings in backend

### Upload not working
- Verify `uploads` folder exists
- Check file size limits
- Ensure proper permissions

### MongoDB connection failed
- Verify MongoDB is running
- Check connection string in `.env`
- Verify credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💝 Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📢 Sharing with others

## 🎯 Future Features

- [ ] Video support
- [ ] Countdown timer
- [ ] Guest book/messages from recipients
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Analytics dashboard
- [ ] Multiple languages
- [ ] Dark mode

## 📧 Contact

For questions or support, reach out to:
- Email: yogeshdeepak677@gmail.com
- GitHub: [@yogeshdeepak677](https://github.com/yogeshdeepak677)

---

**Made with ❤️ for special moments** 🎉