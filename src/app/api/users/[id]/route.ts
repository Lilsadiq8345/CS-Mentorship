import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at')
            .eq('id', params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { error: 'Failed to fetch user' },
                { status: 500 }
            );
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error('User fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, email, role } = body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: 'No fields to update' },
                { status: 400 }
            );
        }

        const { data: user, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', params.id)
            .select('id, name, email, role, created_at')
            .single();

        if (error) {
            console.error('User update error:', error);
            return NextResponse.json(
                { error: 'Failed to update user' },
                { status: 500 }
            );
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error('User update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', params.id);

        if (error) {
            console.error('User deletion error:', error);
            return NextResponse.json(
                { error: 'Failed to delete user' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('User deletion error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
