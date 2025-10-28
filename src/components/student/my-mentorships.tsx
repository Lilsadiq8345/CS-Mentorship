'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, User, Target, Calendar, MessageSquare } from 'lucide-react';

interface Mentorship {
    _id: string;
    lecturerId: {
        _id: string;
        name: string;
        email: string;
    };
    status: 'pending' | 'active' | 'completed' | 'rejected';
    goals: string[];
    startDate: string;
    endDate?: string;
    notes: string;
    rating?: number;
    feedback?: string;
    createdAt: string;
}

interface MyMentorshipsProps {
    studentId: string;
}

export function MyMentorships({ studentId }: MyMentorshipsProps) {
    const [mentorships, setMentorships] = useState<Mentorship[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMentorships();
    }, [studentId]);

    const fetchMentorships = async () => {
        try {
            const response = await fetch(`/api/mentorships?studentId=${studentId}`);
            if (response.ok) {
                const data = await response.json();
                setMentorships(data);
            }
        } catch (error) {
            console.error('Error fetching mentorships:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
            case 'active':
                return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Active</Badge>;
            case 'completed':
                return <Badge variant="outline" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completed</Badge>;
            case 'rejected':
                return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'active':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'completed':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'rejected':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading mentorships...</p>
                </div>
            </div>
        );
    }

    if (mentorships.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center py-8">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-muted-foreground mb-2">No Mentorships Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            You haven&apos;t requested any mentorships yet. Start by browsing available lecturers.
                        </p>
                        <Button asChild>
                            <a href="/student/browse-lecturers">Browse Lecturers</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const pendingMentorships = mentorships.filter(m => m.status === 'pending');
    const activeMentorships = mentorships.filter(m => m.status === 'active');
    const completedMentorships = mentorships.filter(m => m.status === 'completed');
    const rejectedMentorships = mentorships.filter(m => m.status === 'rejected');

    return (
        <div className="space-y-8">
            {/* Pending Requests */}
            {pendingMentorships.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
                    <div className="space-y-4">
                        {pendingMentorships.map((mentorship) => (
                            <MentorshipCard key={mentorship._id} mentorship={mentorship} />
                        ))}
                    </div>
                </div>
            )}

            {/* Active Mentorships */}
            {activeMentorships.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Active Mentorships</h2>
                    <div className="space-y-4">
                        {activeMentorships.map((mentorship) => (
                            <MentorshipCard key={mentorship._id} mentorship={mentorship} />
                        ))}
                    </div>
                </div>
            )}

            {/* Completed Mentorships */}
            {completedMentorships.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Completed Mentorships</h2>
                    <div className="space-y-4">
                        {completedMentorships.map((mentorship) => (
                            <MentorshipCard key={mentorship._id} mentorship={mentorship} />
                        ))}
                    </div>
                </div>
            )}

            {/* Rejected Requests */}
            {rejectedMentorships.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Rejected Requests</h2>
                    <div className="space-y-4">
                        {rejectedMentorships.map((mentorship) => (
                            <MentorshipCard key={mentorship._id} mentorship={mentorship} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MentorshipCard({ mentorship }: { mentorship: Mentorship }) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
            case 'active':
                return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Active</Badge>;
            case 'completed':
                return <Badge variant="outline" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completed</Badge>;
            case 'rejected':
                return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={mentorship.lecturerId.name} />
                            <AvatarFallback>{mentorship.lecturerId.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{mentorship.lecturerId.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <span>{mentorship.lecturerId.email}</span>
                                <span>•</span>
                                <span>Started {formatDate(mentorship.startDate)}</span>
                            </CardDescription>
                        </div>
                    </div>
                    {getStatusBadge(mentorship.status)}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Target className="h-4 w-4" />
                        Goals
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {mentorship.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {goal}
                            </Badge>
                        ))}
                    </div>
                </div>

                {mentorship.notes && (
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Notes</div>
                        <p className="text-sm text-muted-foreground">{mentorship.notes}</p>
                    </div>
                )}

                {mentorship.rating && (
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Rating</div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < mentorship.rating! ? 'text-yellow-400' : 'text-gray-300'}>
                                    ★
                                </span>
                            ))}
                            <span className="text-sm text-muted-foreground ml-2">({mentorship.rating}/5)</span>
                        </div>
                    </div>
                )}

                {mentorship.feedback && (
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Feedback</div>
                        <p className="text-sm text-muted-foreground">{mentorship.feedback}</p>
                    </div>
                )}

                <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                    </Button>
                    {mentorship.status === 'active' && (
                        <Button size="sm" className="flex-1">
                            Schedule Meeting
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
