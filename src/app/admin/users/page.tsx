import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { UsersManagement } from '@/components/admin/users-management';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function UsersPage() {
    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">
                        Manage all users in the mentorship system.
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
                    <UsersManagement />
                </Suspense>
            </div>
        </DashboardLayout>
    );
}
