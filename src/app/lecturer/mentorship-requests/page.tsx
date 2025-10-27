'use client';

import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MentorshipRequests } from '@/components/mentorship/mentorship-requests';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function MentorshipRequestsPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <DashboardLayout userRole="lecturer">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mentorship Requests</h1>
                        <p className="text-muted-foreground">
                            Review and respond to mentorship requests from students.
                        </p>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    if (!session?.user?.id) {
        return (
            <DashboardLayout userRole="lecturer">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mentorship Requests</h1>
                        <p className="text-muted-foreground">
                            Review and respond to mentorship requests from students.
                        </p>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">Please sign in to view mentorship requests.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mentorship Requests</h1>
                    <p className="text-muted-foreground">
                        Review and respond to mentorship requests from students.
                    </p>
                </div>

                <Suspense fallback={
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                }>
                    <MentorshipRequests requests={[]} lecturerId={session.user.id} />
                </Suspense>
            </div>
        </DashboardLayout>
    );
}
