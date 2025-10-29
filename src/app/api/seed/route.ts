import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 12);
    const results = [];

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
    ];

    // Process each user individually
    for (const userData of demoUsers) {
      try {
        // Check if user exists
        const { data: existingUser } = await supabaseServer
          .from('users')
          .select('id, email')
          .eq('email', userData.email)
          .maybeSingle();

        if (existingUser) {
          // Update existing user's password to ensure it matches
          const { data: updatedUser, error: updateError } = await supabaseServer
            .from('users')
            .update({ 
              password: hashedPassword,
              name: userData.name,
              role: userData.role
            })
            .eq('email', userData.email)
            .select('id, email, name, role')
            .single();

          if (updateError) {
            console.error(`Error updating user ${userData.email}:`, updateError);
            results.push({ email: userData.email, status: 'update_failed', error: updateError.message });
          } else {
            results.push({ email: userData.email, status: 'updated', user: updatedUser });
          }
        } else {
          // Insert new user
          const { data: insertedUser, error: insertError } = await supabaseServer
            .from('users')
            .insert(userData)
            .select('id, email, name, role')
            .single();

          if (insertError) {
            console.error(`Error inserting user ${userData.email}:`, insertError);
            results.push({ email: userData.email, status: 'insert_failed', error: insertError.message });
          } else {
            results.push({ email: userData.email, status: 'created', user: insertedUser });
          }
        }
      } catch (error) {
        console.error(`Error processing user ${userData.email}:`, error);
        results.push({ 
          email: userData.email, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    const successful = results.filter(r => r.status === 'created' || r.status === 'updated');
    const failed = results.filter(r => r.status !== 'created' && r.status !== 'updated');

    return NextResponse.json({
      success: failed.length === 0,
      message: `Processed ${results.length} users. ${successful.length} successful, ${failed.length} failed.`,
      results,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return seedUsers();
}

export async function POST() {
  return seedUsers();
}

