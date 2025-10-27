-- Create users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'lecturer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    major VARCHAR(255),
    year INTEGER,
    department VARCHAR(255),
    expertise TEXT[],
    research_areas TEXT[],
    years_of_experience INTEGER,
    bio TEXT,
    max_students INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorships table
CREATE TABLE mentorships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lecturer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'rejected')),
    goals TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_mentorships_student_id ON mentorships(student_id);
CREATE INDEX idx_mentorships_lecturer_id ON mentorships(lecturer_id);
CREATE INDEX idx_mentorships_status ON mentorships(status);

-- Insert sample demo users (password: password123)
INSERT INTO users (name, email, password, role) VALUES
('Demo Student', 'student@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vHhHhqG', 'student'),
('Demo Lecturer', 'lecturer@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vHhHhqG', 'lecturer'),
('Demo Admin', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vHhHhqG', 'admin');

-- Insert sample profiles
INSERT INTO profiles (user_id, major, year, department, expertise, bio, max_students) VALUES
((SELECT id FROM users WHERE email = 'student@example.com'), 'Computer Science', 2, 'Computer Science', ARRAY['Python', 'JavaScript', 'React'], 'Passionate CS student interested in AI and web development', NULL),
((SELECT id FROM users WHERE email = 'lecturer@example.com'), NULL, NULL, 'Computer Science', ARRAY['Machine Learning', 'Data Science', 'Software Engineering'], 'Experienced lecturer with expertise in AI and software development', 5),
((SELECT id FROM users WHERE email = 'admin@example.com'), NULL, NULL, 'Administration', NULL, 'System administrator', NULL);
