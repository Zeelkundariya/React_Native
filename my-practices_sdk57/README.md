# Expo SDK 57 Practice App 📱

This project is built with Expo SDK 57 and React Native 0.86, focusing on hands-on practice with native device features and Expo APIs.

## 🚀 Get Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

## 🛠 Practice Modules & Screens

- **`filesystem.jsx`**: File and directory operations using `expo-file-system`. Demonstrates file creation, reading, writing, and downloading media with pause, resume, and progress tracking.
- **`authentication.jsx` / `index.jsx`**: Biometric authentication using `expo-local-authentication` and secure token management with `expo-secure-store`.
- **`network.jsx`**: Real-time network state monitoring, IP address resolution, and airplane mode detection using `expo-network`.
- **`timercounter.jsx`**: Interval timers, countdowns, and tap-counter mechanisms using React hooks (`useState`, `useEffect`, `useRef`).
- **`fetch.jsx`**: REST API fetching patterns, JSON parsing, error handling, and `FlatList` rendering.
- **`_layout.tsx` & `app-tabs.tsx`**: Expo Router file-based tab navigation with native platform tabs.
