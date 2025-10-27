import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    name: string
                    email: string
                    password: string
                    role: 'student' | 'lecturer' | 'admin'
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    password: string
                    role: 'student' | 'lecturer' | 'admin'
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    password?: string
                    role?: 'student' | 'lecturer' | 'admin'
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    user_id: string
                    major?: string
                    year?: number
                    department?: string
                    expertise?: string[]
                    research_areas?: string[]
                    years_of_experience?: number
                    bio?: string
                    max_students?: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    major?: string
                    year?: number
                    department?: string
                    expertise?: string[]
                    research_areas?: string[]
                    years_of_experience?: number
                    bio?: string
                    max_students?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    major?: string
                    year?: number
                    department?: string
                    expertise?: string[]
                    research_areas?: string[]
                    years_of_experience?: number
                    bio?: string
                    max_students?: number
                    created_at?: string
                }
            }
            mentorships: {
                Row: {
                    id: string
                    student_id: string
                    lecturer_id: string
                    status: 'pending' | 'active' | 'completed' | 'rejected'
                    goals: string
                    start_date?: string
                    notes?: string
                    rating?: number
                    feedback?: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    student_id: string
                    lecturer_id: string
                    status?: 'pending' | 'active' | 'completed' | 'rejected'
                    goals: string
                    start_date?: string
                    notes?: string
                    rating?: number
                    feedback?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    student_id?: string
                    lecturer_id?: string
                    status?: 'pending' | 'active' | 'completed' | 'rejected'
                    goals?: string
                    start_date?: string
                    notes?: string
                    rating?: number
                    feedback?: string
                    created_at?: string
                }
            }
        }
    }
}
