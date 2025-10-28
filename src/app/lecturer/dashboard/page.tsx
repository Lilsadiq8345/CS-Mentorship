'use client';

import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Users,
    MessageSquare,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function LecturerDashboard() {
    const { data: session } = useSession();

    // Mock data - in real app, this would come from API
    const mockData = {
        totalStudents: 8,
        activeMentorships: 6,
        pendingRequests: 3,
        upcomingMeetings: 4,
        recentMessages: 5,
    };

    const recentStudents = [
        {
            id: 1,
            name: 'Alex Johnson',
            major: 'Computer Science',
            year: '3rd Year',
            lastContact: '2 days ago',
            status: 'active',
            avatar: '/avatars/alex.jpg',
        },
        {
            id: 2,
            name: 'Sarah Chen',
            major: 'Software Engineering',
            year: '2nd Year',
            lastContact: '1 week ago',
            status: 'active',
            avatar: '/avatars/sarah.jpg',
        },
        {
            id: 3,
            name: 'Mike Rodriguez',
            major: 'Data Science',
            year: '4th Year',
            lastContact: '3 days ago',
            status: 'pending',
            avatar: '/avatars/mike.jpg',
        },
    ];

    const upcomingMeetings = [
        {
            id: 1,
            student: 'Alex Johnson',
            topic: 'Career Planning Discussion',
            date: 'Tomorrow',
            time: '2:00 PM - 3:00 PM',
            type: 'scheduled',
        },
        {
            id: 2,
            student: 'Sarah Chen',
            topic: 'Project Review',
            date: 'Friday',
            time: '10:00 AM - 11:00 AM',
            type: 'scheduled',
        },
        {
            id: 3,
            student: 'Mike Rodriguez',
            topic: 'Technical Interview Prep',
            date: 'Next Monday',
            time: '1:00 PM - 2:00 PM',
            type: 'pending',
        },
    ];

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {session?.user?.name}! 👨‍🏫
                    </h1>
                    <p className="text-gray-600">
                        Here&apos;s an overview of your mentorship activities and students.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">
                                Across all programs
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.activeMentorships}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently mentoring
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.pendingRequests}</div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting response
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.upcomingMeetings}</div>
                            <p className="text-xs text-muted-foreground">
                                This week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.recentMessages}</div>
                            <p className="text-xs text-muted-foreground">
                                Unread messages
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Students */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Students</CardTitle>
                            <CardDescription>
                                Students you&apos;ve been working with recently
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentStudents.map((student) => (
                                    <div key={student.id} className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={student.avatar} />
                                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {student.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {student.major} • {student.year}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Last contact: {student.lastContact}
                                            </p>
                                        </div>
                                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                                            {student.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Link href="/lecturer/students">
                                    <Button variant="outline" className="w-full">
                                        View All Students
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and next steps
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/lecturer/requests">
                                <Button className="w-full justify-start" variant="outline">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Review Mentorship Requests
                                </Button>
                            </Link>

                            <Link href="/lecturer/schedule">
                                <Button className="w-full justify-start" variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Manage Schedule
                                </Button>
                            </Link>

                            <Link href="/lecturer/resources">
                                <Button className="w-full justify-start" variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Share Resources
                                </Button>
                            </Link>

                            <Link href="/lecturer/profile">
                                <Button className="w-full justify-start" variant="outline">
                                    <Users className="mr-2 h-4 w-4" />
                                    Update Profile
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Meetings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Meetings</CardTitle>
                        <CardDescription>
                            Your scheduled mentorship sessions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingMeetings.map((meeting) => (
                                <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">{meeting.topic}</p>
                                            <p className="text-sm text-gray-600">with {meeting.student}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{meeting.date}</p>
                                        <p className="text-xs text-gray-500">{meeting.time}</p>
                                        <Badge variant={meeting.type === 'scheduled' ? 'default' : 'secondary'} className="mt-1">
                                            {meeting.type}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Mentorship Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mentorship Insights</CardTitle>
                        <CardDescription>
                            Key metrics and achievements
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
                                <div className="text-sm text-gray-600">Student Satisfaction</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                                <div className="text-sm text-gray-600">Students Placed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
