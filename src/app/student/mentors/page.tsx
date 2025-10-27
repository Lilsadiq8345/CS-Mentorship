'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, Star } from 'lucide-react';

export default function MentorsPage() {
    const mentors = [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            department: 'Computer Science',
            expertise: ['Machine Learning', 'Data Science'],
            rating: 4.8,
            status: 'active'
        },
        {
            id: '2',
            name: 'Prof. Michael Chen',
            department: 'Software Engineering',
            expertise: ['Web Development', 'React'],
            rating: 4.6,
            status: 'active'
        }
    ];

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Mentors</h1>
                <p className="text-gray-600 mt-2">Your current mentorship relationships</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                    <Card key={mentor.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{mentor.name}</CardTitle>
                                    <p className="text-gray-600">{mentor.department}</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800">{mentor.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{mentor.rating}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Message
                                </Button>
                                <Button variant="outline">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
