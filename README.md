# CS Mentorship App

A Computer Science Student-Lecturer Mentorship Pairing Platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Role-based Authentication**: Support for Students, Lecturers, and Admins
- **Mentorship Requests**: Students can browse and request mentorship from lecturers
- **User Profiles**: Detailed profiles for both students and lecturers
- **Admin Dashboard**: Comprehensive admin interface for user and mentorship management
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CS-Mentorship
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Set up the database:
   - Create a Supabase project (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
   - Run the SQL schema: `supabase-schema.sql`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

The database includes demo accounts for testing:
- **Student**: student@example.com (password: password123)
- **Lecturer**: lecturer@example.com (password: password123)
- **Admin**: admin@example.com (password: password123)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── admin/       # Admin dashboard pages
│   ├── auth/        # Authentication pages
│   ├── lecturer/    # Lecturer dashboard pages
│   ├── student/     # Student dashboard pages
│   └── api/         # API routes
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── forms/       # Form components
│   └── layout/      # Layout components
├── lib/             # Utility libraries
└── types/           # TypeScript type definitions
```

## Features by Role

### Students
- Browse available lecturers
- Request mentorship
- View mentorship status
- Manage profile and goals

### Lecturers
- View mentorship requests
- Accept/reject requests
- Manage students
- View resources and schedule

### Admins
- User management
- Mentorship oversight
- Analytics and reporting
- System settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
