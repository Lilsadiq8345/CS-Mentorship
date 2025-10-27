# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `mentorship-app`
   - Database Password: Choose a strong password
   - Region: Choose closest to you
6. Click "Create new project"

## 2. Get Project Credentials

1. In your project dashboard, go to Settings → API
2. Copy the following values:
   - Project URL (e.g., `https://your-project.supabase.co`)
   - Anon public key (starts with `eyJ...`)

## 3. Update Environment Variables

Update your `.env.local` file with the actual values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

## 4. Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL commands
4. This will create all necessary tables and policies

## 5. Test the Setup

1. Restart your Next.js development server
2. Try to sign up a new user
3. Check the Supabase dashboard → Table Editor to see if data is being created

## 6. Database Tables Created

- **users**: User accounts with authentication
- **profiles**: Extended user information (student/lecturer specific)
- **mentorships**: Mentorship relationships and requests

## 7. Security Features

- Row Level Security (RLS) enabled
- Policies ensure users can only access their own data
- Admins have full access to all data
- Students can only create mentorship requests
- Lecturers can only update their mentorship status

## 8. Troubleshooting

If you encounter issues:

1. Check that your environment variables are correct
2. Ensure the database schema was created successfully
3. Check the Supabase logs in the dashboard
4. Verify that RLS policies are working correctly

## 9. Next Steps

After setup:
1. Test user registration and login
2. Create some test users (student, lecturer, admin)
3. Test mentorship request creation
4. Test profile creation and updates
