# ShadowAI Frontend Service

A modern, responsive frontend application for the ShadowAI platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication**: Complete signup/login system with JWT token management
- **Dashboard**: Interactive dashboard with real-time system monitoring
- **Profile Management**: User profile editing and account management
- **Theme Support**: Dark/light mode toggle with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features
- **Next.js 14**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Smooth animations and page transitions
- **Radix UI**: Accessible, unstyled UI components
- **Zustand**: Lightweight state management (if needed)
- **Axios**: HTTP client with interceptors for API communication

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Theme**: next-themes
- **Icons**: Lucide React
- **State Management**: Zustand (optional)
- **Form Handling**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── dashboard/         # Dashboard pages
│   │   ├── profile/       # User profile page
│   │   └── page.tsx       # Main dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/            # API service layer
├── store/               # State management
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

## 🎨 Design System

### Colors
- **Primary**: ShadowAI blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Slate grays for text and backgrounds
- **Accent**: Purple and cyan for highlights
- **Status**: Green (success), Red (error), Yellow (warning)

### Components
- Glass-morphism effects for cards and modals
- Smooth hover transitions and micro-interactions
- Consistent spacing and typography scale
- Accessible color contrast ratios

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
   NEXT_PUBLIC_APP_NAME=ShadowAI
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 🔗 API Integration

### Backend Integration
The frontend integrates with the ShadowAI Backend Service APIs:

- **Health API**: `/api/v1/health` - System health monitoring
- **Auth APIs**: 
  - `POST /api/v1/signup` - User registration
  - `POST /api/v1/login` - User authentication
  - `POST /api/v1/logout` - User logout
- **User API**: `GET /api/v1/user/profile` - User profile data

### Service Layer
- **AuthService**: Handles authentication, token management
- **UserService**: User profile operations
- **HealthService**: System health monitoring
- **ApiService**: Base HTTP client with interceptors

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with animated background
- Feature showcase with cards
- Call-to-action buttons
- Responsive design

### Authentication (`/auth/*`)
- Login form with validation
- Signup form with password confirmation
- Animated layouts with branding
- Error handling and success states

### Dashboard (`/dashboard`)
- System status monitoring
- Statistics cards with animations
- Recent activity feed
- Real-time health checks

### Profile (`/dashboard/profile`)
- User information display
- Editable profile fields
- Account security settings
- Avatar and user stats

## 🔐 Authentication Flow

1. **Login/Signup**: Users authenticate via forms
2. **Token Storage**: JWT tokens stored in localStorage
3. **API Interceptors**: Automatic token attachment to requests
4. **Protected Routes**: Dashboard requires authentication
5. **Auto Redirect**: Unauthenticated users redirected to login

## 🎨 Animation & UX

### Framer Motion Animations
- Page transitions with stagger effects
- Hover animations on interactive elements
- Loading states with smooth transitions
- Micro-interactions for better feedback

### Custom CSS Animations
- Gradient backgrounds with movement
- Pulse effects for status indicators
- Smooth scrollbar styling
- Glass-morphism effects

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible sidebar on mobile
- **Touch Friendly**: Adequate tap targets and gestures

## 🛡️ Security Features

- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based authentication
- **Secure Storage**: Sensitive data in localStorage with cleanup
- **Route Protection**: Private routes require authentication

## 🔄 State Management

- **Local State**: React useState for component state
- **Auth State**: Service-based authentication state
- **API State**: Service layer with error handling
- **Theme State**: next-themes for dark/light mode

## 🧪 Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Absolute imports with path mapping

### Component Structure
- Functional components with hooks
- Props typing with TypeScript interfaces
- Logical component composition
- Reusable UI component library

### Performance
- Next.js optimizations (SSR, image optimization)
- Code splitting and lazy loading
- Optimized bundle size
- Efficient re-renders

## 🚀 Deployment

### Build Process
```bash
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Environment Configuration
- Development: `.env.local`
- Production: Set environment variables in deployment platform
- API endpoints configurable via environment variables

## 📊 Performance Metrics

- **Lighthouse Score**: 90+ for all categories
- **Core Web Vitals**: Optimized loading and interaction
- **Bundle Size**: Optimized with tree shaking
- **API Response**: Error handling and loading states

## 🤝 Contributing

1. Follow TypeScript and ESLint configurations
2. Use conventional commit messages
3. Ensure responsive design across devices
4. Test authentication and API integration
5. Maintain design system consistency

## 📝 License

This project is part of the ShadowAI platform. All rights reserved.

---

**ShadowAI Frontend Service** - Experience the future of AI with beautiful, intuitive interfaces.


