import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const lecturerId = searchParams.get('lecturerId');

        let query = supabase
            .from('mentorships')
            .select(`
                *,
                students:users!mentorships_student_id_fkey(id, name, email),
                lecturers:users!mentorships_lecturer_id_fkey(id, name, email)
            `);

        if (studentId) {
            query = query.eq('student_id', studentId);
        }

        if (lecturerId) {
            query = query.eq('lecturer_id', lecturerId);
        }

        const { data: mentorships, error } = await query;

        if (error) {
            console.error('Error fetching mentorships:', error);
            return NextResponse.json(
                { error: 'Failed to fetch mentorships' },
                { status: 500 }
            );
        }

        return NextResponse.json(mentorships);

    } catch (error) {
        console.error('Mentorships fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { studentId, lecturerId, goals, notes } = await request.json();

        if (!studentId || !lecturerId || !goals) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if mentorship already exists
        const { data: existingMentorship } = await supabase
            .from('mentorships')
            .select('id')
            .eq('student_id', studentId)
            .eq('lecturer_id', lecturerId)
            .eq('status', 'pending')
            .single();

        if (existingMentorship) {
            return NextResponse.json(
                { error: 'Mentorship request already exists' },
                { status: 400 }
            );
        }

        const { data: mentorship, error } = await supabase
            .from('mentorships')
            .insert({
                student_id: studentId,
                lecturer_id: lecturerId,
                goals,
                notes: notes || '',
                status: 'pending',
                created_at: new Date().toISOString()
            })
            .select('*')
            .single();

        if (error) {
            console.error('Mentorship creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create mentorship request' },
                { status: 500 }
            );
        }

        return NextResponse.json(mentorship, { status: 201 });

    } catch (error) {
        console.error('Mentorship creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
