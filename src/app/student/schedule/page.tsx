'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function SchedulePage() {
    const meetings = [
        {
            id: '1',
            title: 'Python Programming Review',
            lecturer: 'Dr. Smith',
            date: '2024-08-15',
            time: '14:00',
            status: 'confirmed',
            location: 'Room 301, Computer Science Building'
        },
        {
            id: '2',
            title: 'Career Planning Discussion',
            lecturer: 'Prof. Johnson',
            date: '2024-08-17',
            time: '10:00',
            status: 'pending',
            location: 'Online - Zoom'
        }
    ];

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
                <p className="text-gray-600 mt-2">Your meetings and appointments with lecturers</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Meetings</h2>
                {meetings.map((meeting) => (
                    <Card key={meeting.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{meeting.title}</CardTitle>
                                    <p className="text-gray-600 mt-1">with {meeting.lecturer}</p>
                                </div>
                                <Badge className={meeting.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                    {meeting.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>{meeting.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{meeting.location}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Reschedule</Button>
                                    <Button variant="outline" size="sm">Cancel</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
