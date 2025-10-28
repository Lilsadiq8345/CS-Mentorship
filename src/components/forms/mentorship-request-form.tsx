'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Send } from 'lucide-react';

interface Lecturer {
    id: string;
    name: string;
    email: string;
    profile?: {
        department?: string;
        expertise?: string[];
        bio?: string;
    };
}

interface MentorshipRequestFormProps {
    lecturers: Lecturer[];
    studentId: string;
}

export function MentorshipRequestForm({ lecturers, studentId }: MentorshipRequestFormProps) {
    const router = useRouter();
    const [selectedLecturer, setSelectedLecturer] = useState<string | undefined>(undefined);
    const [goals, setGoals] = useState('');
    const [startDate, setStartDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedLecturer || !goals || !startDate) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/mentorships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId,
                    lecturerId: selectedLecturer,
                    goals: goals.split(',').map(goal => goal.trim()),
                    startDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create mentorship request');
            }

            setSuccess('Mentorship request sent successfully');
            // Show a blocking browser alert for clear feedback, then navigate
            if (typeof window !== 'undefined') {
                window.alert('Mentorship request sent successfully');
            }
            router.push('/student/dashboard');
            router.refresh();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Request Mentorship
                </CardTitle>
                <CardDescription>
                    Send a mentorship request to a lecturer. Make sure to clearly state your goals.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="lecturer">Select Lecturer</Label>
                        <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a lecturer..." />
                            </SelectTrigger>
                            <SelectContent>
                                {lecturers.map((lecturer) => (
                                    <SelectItem key={lecturer.id} value={String(lecturer.id)}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{lecturer.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {lecturer.profile?.department} • {lecturer.email}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="goals">Mentorship Goals</Label>
                        <Textarea
                            id="goals"
                            placeholder="Describe your goals for this mentorship (separate multiple goals with commas)"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <div className="relative">
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                            <p className="text-sm text-emerald-700">{success}</p>
                        </div>
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Sending Request...' : 'Send Mentorship Request'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
