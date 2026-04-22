# LetterSprint

A modern typing speed test application built with React, TypeScript, and Firebase. Improve your typing skills with customizable tests, track your progress, and compete with yourself.

![LetterSprint](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-green)

## Features

### Core Functionality

- **Typing Speed Test**: Measure your Words Per Minute (WPM) with standard ISO calculations
- **Multiple Test Modes**: 
  - Time-based (15, 30, 60, 120 seconds)
  - Word-based (10, 25, 50, 100 words)
- **Difficulty Levels**:
  - Easy: Short, simple paragraphs (~15 words)
  - Medium: Longer paragraphs with varied vocabulary (~50 words)
  - Hard: Complex paragraphs with technical terms (~80 words)
- **Real-time Statistics**: Live WPM and accuracy tracking during tests
- **Detailed Results**: View your performance after each test

### Configuration Options

- **Punctuation**: Enable/disable punctuation in tests
- **Numbers**: Include/exclude numbers from test content
- **Custom Settings**: All configurations are saved to your profile

### User Management

- **Authentication**: Multiple sign-in methods
  - Google OAuth
  - GitHub OAuth
  - Email & Password
- **Profile**: Personalized user profile with statistics
- **History**: View past test results with dates and details

### Technical Features

- **Responsive Design**: Works on desktop and mobile devices
- **Local Paragraph Generator**: 30 built-in paragraphs in English (expandable)
- **Firebase Backend**: Real-time data synchronization
- **Redux State Management**: Predictable application state

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Redux Toolkit | State Management |
| React Router DOM | Routing |
| Firebase (Firestore, Auth) | Backend & Authentication |
| Tailwind CSS | Styling |
| React Toastify | Notifications |
| Vite | Build Tool |

## Project Structure

```
LetterSprint/
├── src/
│   ├── Auth/                    # Authentication pages
│   │   └── LoginAndRegistrationPage.tsx
│   ├── components/              # Reusable UI components
│   │   ├── CheckingAuth.tsx
│   │   ├── CheckingCurrentUser.tsx
│   │   ├── ExternalAuthentication.tsx
│   │   ├── Footer.tsx
│   │   ├── FormSignIn.tsx
│   │   ├── FormSignUp.tsx
│   │   ├── GuestRoute.tsx
│   │   ├── HistoricalScoreTable.tsx
│   │   ├── Nav.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ScoreModeTable.tsx
│   │   ├── TestConfiguration.tsx
│   │   ├── TestConfigurationModal.tsx
│   │   ├── TestResult.tsx
│   │   ├── Tooltip.tsx
│   │   ├── UserNameModal.tsx
│   │   └── UserOptions.tsx
│   ├── data/                    # Static data
│   │   └── paragraphs.ts        # Paragraph database
│   ├── Errors/                  # Error pages
│   │   └── NotFoundPage.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCheckingCurrentUser.ts
│   │   ├── useLoading.ts
│   │   ├── useResult.ts
│   │   ├── useTestConfiguration.ts
│   │   ├── useTimer.ts
│   │   └── useUpdateConfig.ts
│   ├── icons/                   # Icon components
│   │   └── Icons.tsx
│   ├── interfaces/              # TypeScript interfaces
│   │   ├── Paragraph.ts
│   │   ├── Test.ts
│   │   └── testConfiguration.ts
│   ├── lettesSprint/
│   │   └── pages/
│   │       ├── UserPage.tsx
│   │       └── WritingTestPage.tsx
│   ├── home/
│   │   └── HomePage.tsx
│   ├── router/
│   │   └── Routes.tsx
│   ├── service/
│   │   └── generateTest.ts      # Test generation logic
│   ├── store/                   # Redux store
│   │   ├── auth/
│   │   │   └── slice.ts
│   │   ├── test/
│   │   │   └── slice.ts
│   │   ├── testResults/
│   │   │   └── slice.ts
│   │   ├── timer/
│   │   │   └── slice.ts
│   │   └── index.tsx
│   ├── utils/                   # Utility functions
│   │   ├── firebaseAuth.utils.ts
│   │   └── firebaseService.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── constants.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LetterSprint
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Google, GitHub, Email/Password)
   - Enable Firestore Database
   - Create a `.env` file with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## WPM Calculation (ISO Standard)

LetterSprint uses industry-standard typing speed calculations:

| Metric | Formula |
|--------|---------|
| **Raw WPM** | `(Total Characters Typed / 5) / Minutes` |
| **Net WPM** | `Raw WPM - (Uncorrected Errors / Minutes)` |
| **Accuracy** | `(Correct Characters / Total Characters) × 100` |

*Note: 1 word = 5 characters (including spaces) - the international standard*

## Roadmap

### Completed Features

- [x] Typing speed test with WPM calculation
- [x] Multiple time modes (15s, 30s, 60s, 120s)
- [x] Word modes (10, 25, 50, 100 words)
- [x] Difficulty levels (easy, medium, hard)
- [x] Punctuation and number options
- [x] Google authentication
- [x] GitHub authentication
- [x] Email/password registration
- [x] User profile with statistics
- [x] Test history with dates
- [x] Save user preferences
- [x] Protected routes
- [x] Mobile responsive design

### Future Enhancements

- [ ] Multi-language support (Spanish, French, etc.)
- [ ] Leaderboard/global rankings
- [ ] Theme customization (dark/light mode)
- [ ] Sound effects toggle
- [ ] Custom text input
- [ ] Challenge mode (race against others)
- [ ] Typing certificates
- [ ] Export results to CSV
- [ ] Keyboard shortcuts
- [ ] Progress charts and graphs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and for personal use only.

## Acknowledgments

- Typing speed calculation formulas based on [Monkeytype](https://monkeytype.com/) and ISO standards
- UI inspiration from modern typing test applications
