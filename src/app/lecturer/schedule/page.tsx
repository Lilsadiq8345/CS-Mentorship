'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import 'react-day-picker/dist/style.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    Video,
    MapPin,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { format } from 'date-fns';

interface Meeting {
    id: string;
    title: string;
    student: string;
    date: Date;
    time: string;
    duration: number;
    type: 'in-person' | 'virtual' | 'hybrid';
    location?: string;
    link?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
}

export default function LecturerSchedulePage() {
    const { data: _session } = useSession();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

    // Mock data - in real app, this would come from API
    useEffect(() => {
        const mockMeetings: Meeting[] = [
            {
                id: '1',
                title: 'Career Planning Discussion',
                student: 'Alex Johnson',
                date: new Date(2024, 7, 15),
                time: '14:00',
                duration: 60,
                type: 'virtual',
                link: 'https://meet.google.com/abc-defg-hij',
                status: 'scheduled',
                notes: 'Discuss internship opportunities and career path'
            },
            {
                id: '2',
                title: 'Project Review Session',
                student: 'Sarah Chen',
                date: new Date(2024, 7, 16),
                time: '10:00',
                duration: 45,
                type: 'in-person',
                location: 'Room 301, Computer Science Building',
                status: 'scheduled',
                notes: 'Review React project implementation'
            },
            {
                id: '3',
                title: 'Technical Interview Prep',
                student: 'Mike Rodriguez',
                date: new Date(2024, 7, 19),
                time: '13:00',
                duration: 90,
                type: 'hybrid',
                location: 'Room 205',
                link: 'https://zoom.us/j/123456789',
                status: 'scheduled',
                notes: 'Practice coding problems and system design'
            }
        ];

        setMeetings(mockMeetings);
    }, []);

    const getMeetingTypeIcon = (type: string) => {
        switch (type) {
            case 'virtual': return <Video className="h-4 w-4" />;
            case 'in-person': return <MapPin className="h-4 w-4" />;
            case 'hybrid': return <Users className="h-4 w-4" />;
            default: return <CalendarIcon className="h-4 w-4" />;
        }
    };

    const getMeetingTypeColor = (type: string) => {
        switch (type) {
            case 'virtual': return 'bg-blue-100 text-blue-800';
            case 'in-person': return 'bg-green-100 text-green-800';
            case 'hybrid': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const todayMeetings = meetings.filter(meeting =>
        format(meeting.date, 'yyyy-MM-dd') === format(selectedDate || new Date(), 'yyyy-MM-dd')
    );

    const upcomingMeetings = meetings
        .filter(meeting => meeting.date > new Date() && meeting.status === 'scheduled')
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>
                        <p className="text-muted-foreground">
                            Manage your mentorship meetings and availability.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Select value={viewMode} onValueChange={(value: 'calendar' | 'list') => setViewMode(value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="calendar">Calendar</SelectItem>
                                <SelectItem value="list">List</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Meeting
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today&apos;s Meetings</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{todayMeetings.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Scheduled for today
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Week</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {meetings.filter(m => {
                                    const weekFromNow = new Date();
                                    weekFromNow.setDate(weekFromNow.getDate() + 7);
                                    return m.date <= weekFromNow && m.date >= new Date();
                                }).length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upcoming meetings
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(meetings.map(m => m.student)).size}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                With scheduled meetings
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Availability</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">85%</div>
                            <p className="text-xs text-muted-foreground">
                                Time slots available
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar View */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Calendar</CardTitle>
                                <CardDescription>
                                    Select a date to view and manage meetings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Today's Meetings */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Today&apos;s Meetings</CardTitle>
                                <CardDescription>
                                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {todayMeetings.length > 0 ? (
                                    <div className="space-y-3">
                                        {todayMeetings.map((meeting) => (
                                            <div key={meeting.id} className="p-3 border rounded-lg">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{meeting.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{meeting.student}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{meeting.time} ({meeting.duration}min)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {getMeetingTypeIcon(meeting.type)}
                                                            <Badge className={getMeetingTypeColor(meeting.type)}>
                                                                {meeting.type}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-muted-foreground">
                                        No meetings scheduled for this date
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Upcoming Meetings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Meetings</CardTitle>
                                <CardDescription>
                                    Next 5 scheduled meetings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {upcomingMeetings.length > 0 ? (
                                    <div className="space-y-3">
                                        {upcomingMeetings.map((meeting) => (
                                            <div key={meeting.id} className="p-3 border rounded-lg">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{meeting.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{meeting.student}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{format(meeting.date, 'MMM d')} at {meeting.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {getMeetingTypeIcon(meeting.type)}
                                                            <Badge className={getMeetingTypeColor(meeting.type)}>
                                                                {meeting.type}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <Badge className={getStatusColor(meeting.status)}>
                                                        {meeting.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-muted-foreground">
                                        No upcoming meetings
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
