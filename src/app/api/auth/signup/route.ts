import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, role } = await request.json();

        // Validate input
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            return NextResponse.json(
                { error: 'Error checking existing user' },
                { status: 500 }
            );
        }

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const { data: user, error: insertError } = await supabase
            .from('users')
            .insert({
                name,
                email,
                password: hashedPassword,
                role,
                created_at: new Date().toISOString()
            })
            .select('id, name, email, role, created_at')
            .single();

        if (insertError) {
            console.error('User creation error:', insertError);
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
