# RehabGames - Gamified Rehabilitation Platform

A comprehensive web application that transforms rehabilitation into an engaging, game-based experience. Built with Next.js, MongoDB, and modern web technologies.

## Features

### 🎮 Interactive Games
- **Hand Coordination Training** - Improve fine motor skills
- **Balance Training** - Enhance stability and balance
- **Memory Challenge** - Boost cognitive function
- **Reaction Time** - Improve reflexes and speed
- **Finger Dexterity** - Enhance finger movement control
- **Gait Training** - Improve walking patterns
- **Attention Training** - Enhance focus and concentration
- **Coordination Master** - Advanced multi-tasking challenges

### 📊 Progress Tracking
- Real-time session monitoring
- Detailed performance analytics
- Progress visualization with charts
- Achievement system with badges
- Experience points and leveling
- Streak tracking for motivation

### 👤 Personalized Experience
- User profiles with rehabilitation conditions
- Adaptive difficulty based on progress
- Customizable goals and preferences
- Condition-specific game recommendations

### 🔐 User Management
- Secure authentication system
- User registration with rehabilitation profiles
- Progress history and statistics
- Session data storage and retrieval

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: Custom JWT-like token system
- **Database**: MongoDB (local or cloud)
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Context API

## Prerequisites

- Node.js 18+ 
- MongoDB (local installation or cloud service)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle/my
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rehab-games
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── games/             # Game session endpoints
│   │   └── user/              # User management endpoints
│   ├── components/            # Reusable UI components
│   ├── context/               # React context providers
│   ├── games/                 # Game pages
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Landing page
├── lib/                       # Utility libraries
│   └── mongodb.js             # Database connection
├── models/                    # MongoDB models
│   ├── User.js               # User schema
│   ├── GameSession.js        # Game session schema
│   └── Progress.js           # Progress tracking schema
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Database Models

### User Model
- Basic authentication info (username, email, password)
- Rehabilitation profile (condition, recovery stage, injury date)
- Progress tracking (sessions, experience, level)
- Preferences and settings

### GameSession Model
- Session metadata (game type, duration, score)
- Performance metrics (accuracy, difficulty, movements)
- User feedback and ratings
- Timestamps and analytics

### Progress Model
- Long-term progress tracking
- Condition-specific metrics
- Goal achievement tracking
- Achievement history

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Games
- `POST /api/games/session` - Save game session
- `GET /api/games/session` - Get user's game sessions

### User Management
- `GET /api/user/stats` - Get user statistics
- `PUT /api/user/profile` - Update user profile

## Game Development

### Adding New Games
1. Create a new game page in `app/games/[game-name]/page.js`
2. Implement game logic with React hooks
3. Add game metadata to the games overview page
4. Update the game categories and filtering

### Game Session Data
Each game should save session data including:
- Game type and duration
- Score and accuracy metrics
- Performance data
- User feedback

## Customization

### Themes
The application uses a green, white, and black color scheme. Customize colors in:
- `app/globals.css` - CSS custom properties
- Tailwind configuration for component classes

### Styling
- Use Tailwind CSS utility classes
- Custom component classes defined in `globals.css`
- Responsive design with mobile-first approach

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Ensure all environment variables are set in your production environment:
- `MONGODB_URI` - Production MongoDB connection string
- `NEXTAUTH_SECRET` - Secure random string for authentication
- `NEXTAUTH_URL` - Production domain URL

### Database
- Use MongoDB Atlas for cloud hosting
- Set up proper authentication and network access
- Configure backups and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## Future Enhancements

- Real-time multiplayer games
- AI-powered difficulty adjustment
- Integration with rehabilitation devices
- Mobile app development
- Advanced analytics and reporting
- Social features and leaderboards
- Telemedicine integration
- Custom game creation tools

---

**Note**: This is a demonstration application. For production use, implement proper security measures, error handling, and data validation.
