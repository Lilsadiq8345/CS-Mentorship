import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = supabaseServer
      .from('profiles')
      .select(`
                *,
                users!inner(id, name, email, role)
            `);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: profiles, error } = await query;

    if (error) {
      console.error('Error fetching profiles:', error);
      return NextResponse.json(
        { error: 'Failed to fetch profiles' },
        { status: 500 }
      );
    }

    return NextResponse.json(profiles);

  } catch (error) {
    console.error('Profiles fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      major,
      year,
      department,
      expertise,
      researchAreas,
      yearsOfExperience,
      bio,
      maxStudents
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const profileData: {
      user_id: string;
      created_at: string;
      major?: string;
      year?: number;
      department?: string;
      expertise?: string[];
      research_areas?: string[];
      years_of_experience?: number;
      bio?: string;
      max_students?: number;
    } = {
      user_id: userId,
      created_at: new Date().toISOString()
    };

    if (major) profileData.major = major;
    if (year) profileData.year = year;
    if (department) profileData.department = department;
    if (expertise) profileData.expertise = Array.isArray(expertise) ? expertise : expertise.split(',').map((e: string) => e.trim());
    if (researchAreas) profileData.research_areas = Array.isArray(researchAreas) ? researchAreas : researchAreas.split(',').map((r: string) => r.trim());
    if (yearsOfExperience) profileData.years_of_experience = yearsOfExperience;
    if (bio) profileData.bio = bio;
    if (maxStudents) profileData.max_students = maxStudents;

    const { data: profile, error } = await supabaseServer
      .from('profiles')
      .insert(profileData)
      .select('*')
      .single();

    if (error) {
      console.error('Profile creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      );
    }

    return NextResponse.json(profile, { status: 201 });

  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
