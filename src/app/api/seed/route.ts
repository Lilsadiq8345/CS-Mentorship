import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Check if users already exist
    const { data: existingUsers } = await supabaseServer
      .from('users')
      .select('email')
      .in('email', ['student@example.com', 'lecturer@example.com', 'admin@example.com']);

    const existingEmails = existingUsers?.map(u => u.email) || [];

    const demoUsers = [
      {
        email: 'student@example.com',
        name: 'Demo Student',
        password: hashedPassword,
        role: 'student',
      },
      {
        email: 'lecturer@example.com',
        name: 'Demo Lecturer',
        password: hashedPassword,
        role: 'lecturer',
      },
      {
        email: 'admin@example.com',
        name: 'Demo Admin',
        password: hashedPassword,
        role: 'admin',
      },
    ].filter(user => !existingEmails.includes(user.email));

    if (demoUsers.length === 0) {
      return NextResponse.json({ message: 'Demo users already exist' });
    }

    // Insert users that don't exist
    const { data: insertedUsers, error } = await supabaseServer
      .from('users')
      .insert(demoUsers)
      .select('id, email, name, role');

    if (error) {
      console.error('Error seeding users:', error);
      return NextResponse.json(
        { error: 'Failed to seed users', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully created ${insertedUsers?.length || 0} demo users`,
      users: insertedUsers,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

