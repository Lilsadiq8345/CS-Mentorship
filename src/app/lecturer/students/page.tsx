'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Search,
    MessageSquare,
    Calendar,
    BookOpen,
    Target,
    TrendingUp,
    Clock,
    CheckCircle,
    Users
} from 'lucide-react';

interface Student {
    id: string;
    name: string;
    email: string;
    major: string;
    year: number;
    avatar?: string;
    status: 'active' | 'pending' | 'completed';
    lastContact: string;
    progress: number;
    goals: string[];
    nextMeeting?: string;
}

export default function LecturerStudentsPage() {

    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - in real app, this would come from API
    useEffect(() => {
        const mockStudents: Student[] = [
            {
                id: '1',
                name: 'Alex Johnson',
                email: 'alex.johnson@university.edu',
                major: 'Computer Science',
                year: 3,
                status: 'active',
                lastContact: '2 days ago',
                progress: 75,
                goals: ['Machine Learning Fundamentals', 'Data Structures', 'Career Planning'],
                nextMeeting: 'Tomorrow, 2:00 PM'
            },
            {
                id: '2',
                name: 'Sarah Chen',
                email: 'sarah.chen@university.edu',
                major: 'Software Engineering',
                year: 2,
                status: 'active',
                lastContact: '1 week ago',
                progress: 60,
                goals: ['Web Development', 'React Framework', 'Database Design'],
                nextMeeting: 'Friday, 10:00 AM'
            },
            {
                id: '3',
                name: 'Mike Rodriguez',
                email: 'mike.rodriguez@university.edu',
                major: 'Data Science',
                year: 4,
                status: 'pending',
                lastContact: '3 days ago',
                progress: 30,
                goals: ['Advanced Statistics', 'Python Programming', 'Research Methods'],
                nextMeeting: 'Next Monday, 1:00 PM'
            },
            {
                id: '4',
                name: 'Emma Wilson',
                email: 'emma.wilson@university.edu',
                major: 'Computer Science',
                year: 1,
                status: 'active',
                lastContact: '5 days ago',
                progress: 45,
                goals: ['Programming Basics', 'Mathematics', 'Study Skills'],
                nextMeeting: 'Next Wednesday, 3:00 PM'
            }
        ];

        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        let filtered = students;

        if (searchTerm) {
            filtered = filtered.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(student => student.status === statusFilter);
        }

        setFilteredStudents(filtered);
    }, [searchTerm, statusFilter, students]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'text-green-600';
        if (progress >= 60) return 'text-yellow-600';
        if (progress >= 40) return 'text-orange-600';
        return 'text-red-600';
    };

    if (isLoading) {
        return (
            <DashboardLayout userRole="lecturer">
                <div className="space-y-6">
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
                    <p className="text-muted-foreground">
                        Manage and track your mentorship relationships with students.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{students.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Under your mentorship
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {students.filter(s => s.status === 'active').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {students.filter(s => s.status === 'pending').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting response
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all students
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                        <CardDescription>
                            Find specific students or filter by status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search by name, major, or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Students List */}
                <div className="space-y-4">
                    {filteredStudents.map((student) => (
                        <Card key={student.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={student.avatar} />
                                            <AvatarFallback className="text-lg">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-semibold">{student.name}</h3>
                                                <Badge className={getStatusColor(student.status)}>
                                                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                                </Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>{student.major} • Year {student.year}</p>
                                                <p>{student.email}</p>
                                                <p>Last contact: {student.lastContact}</p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Target className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Progress:</span>
                                                    <span className={`text-sm font-semibold ${getProgressColor(student.progress)}`}>
                                                        {student.progress}%
                                                    </span>
                                                </div>

                                                {student.nextMeeting && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm text-blue-600 font-medium">
                                                            Next: {student.nextMeeting}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Message
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Schedule
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            Resources
                                        </Button>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Goals:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {student.goals.map((goal, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {goal}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredStudents.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-muted-foreground">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'No students match your search criteria.'
                                    : 'No students found. Start by accepting mentorship requests.'
                                }
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
