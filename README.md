# Seshn

A minimal, iOS-styled React Native app built with Expo and Expo Router, backed by Supabase. Seshn helps users track Pomodoro-style study sessions (“seshns”), share activity posts, and connect with friends.

---

## Features

- **Pomodoro Timer**: 25-minute work / 5-minute break cycles with sets counted.  
- **User Authentication**: Email-based sign in/out via Supabase Auth, with session persistence.  
- **Profile Page**: Displays user’s avatar, bio, total sessions completed, and a feed of their own activities.  
- **Activity Feed (Home)**: Shows all public study seshns from friends and other users:
  - Username and avatar  
  - Session title, description, sets completed, and duration  
  - Mood and productivity scores (placeholders for now)  
  - “Like” button (front-end UI only)  
- **Post Seshn**: After finishing a Pomodoro session, user can create a “posting”:
  - Enter title, caption, location, and mark as private or public  
  - Upon submission, the new activity is saved to Supabase and user’s `seshns_completed` counter is incremented  
