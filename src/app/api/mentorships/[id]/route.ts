import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: mentorship, error } = await supabase
      .from('mentorships')
      .select(`
        *,
        students:users!mentorships_student_id_fkey(id, name, email),
        lecturers:users!mentorships_lecturer_id_fkey(id, name, email)
      `)
      .eq('id', params.id)
      .single();

    if (error || !mentorship) {
      return NextResponse.json(
        { error: 'Mentorship not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mentorship);
  } catch (error) {
    console.error('Error fetching mentorship:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentorship' },
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
    const { status, notes, rating, feedback, start_date } = body;

    // Build update object
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (rating !== undefined) updateData.rating = rating;
    if (feedback !== undefined) updateData.feedback = feedback;
    if (start_date) updateData.start_date = start_date;

    const { data: mentorship, error } = await supabase
      .from('mentorships')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating mentorship:', error);
      return NextResponse.json(
        { error: 'Failed to update mentorship' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Mentorship updated successfully',
      mentorship,
    });
  } catch (error) {
    console.error('Error updating mentorship:', error);
    return NextResponse.json(
      { error: 'Failed to update mentorship' },
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
      .from('mentorships')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting mentorship:', error);
      return NextResponse.json(
        { error: 'Failed to delete mentorship' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Mentorship deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting mentorship:', error);
    return NextResponse.json(
      { error: 'Failed to delete mentorship' },
      { status: 500 }
    );
  }
}
