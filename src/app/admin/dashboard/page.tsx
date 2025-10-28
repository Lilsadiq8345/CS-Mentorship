'use client';

import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    UserCheck,
    TrendingUp,
    CheckCircle,
    Clock,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { data: session } = useSession();

    // Mock data - in real app, this would come from API
    const mockData = {
        totalUsers: 156,
        totalStudents: 98,
        totalLecturers: 58,
        activeMentorships: 45,
        pendingRequests: 12,
        systemHealth: 'excellent',
        recentSignups: 8,
        totalRevenue: '$12,450',
    };

    const systemMetrics = [
        {
            name: 'User Growth',
            value: '+23%',
            change: 'from last month',
            trend: 'up',
        },
        {
            name: 'Mentorship Success Rate',
            value: '94%',
            change: 'completion rate',
            trend: 'up',
        },
        {
            name: 'System Uptime',
            value: '99.9%',
            change: 'last 30 days',
            trend: 'stable',
        },
        {
            name: 'Support Tickets',
            value: '3',
            change: 'open tickets',
            trend: 'down',
        },
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'user_signup',
            title: 'New Student Registration',
            description: 'Sarah Chen joined as a Computer Science student',
            time: '2 hours ago',
            status: 'completed',
        },
        {
            id: 2,
            type: 'mentorship_request',
            title: 'Mentorship Request',
            description: 'Alex Johnson requested mentorship from Dr. Smith',
            time: '4 hours ago',
            status: 'pending',
        },
        {
            id: 3,
            type: 'system_update',
            title: 'System Maintenance',
            description: 'Database optimization completed successfully',
            time: '1 day ago',
            status: 'completed',
        },
        {
            id: 4,
            type: 'user_verification',
            title: 'Lecturer Verification',
            description: 'Dr. Michael Chen profile verified',
            time: '2 days ago',
            status: 'completed',
        },
    ];

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {session?.user?.name}! 👨‍💼
                    </h1>
                    <p className="text-gray-600">
                        Here&apos;s an overview of your mentorship platform and system status.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                +{mockData.recentSignups} this week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.activeMentorships}</div>
                            <p className="text-xs text-muted-foreground">
                                {mockData.pendingRequests} pending
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold capitalize">{mockData.systemHealth}</div>
                            <p className="text-xs text-muted-foreground">
                                All systems operational
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockData.totalRevenue}</div>
                            <p className="text-xs text-muted-foreground">
                                This month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* System Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {systemMetrics.map((metric) => (
                        <Card key={metric.name}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                                <p className="text-xs text-muted-foreground">{metric.change}</p>
                                <div className={`mt-2 text-xs ${metric.trend === 'up' ? 'text-green-600' :
                                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    {metric.trend === 'up' && '↗'}
                                    {metric.trend === 'down' && '↘'}
                                    {metric.trend === 'stable' && '→'}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common administrative tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/admin/users">
                                <Button className="w-full justify-start" variant="outline">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Users
                                </Button>
                            </Link>

                            <Link href="/admin/mentorships">
                                <Button className="w-full justify-start" variant="outline">
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    View Mentorships
                                </Button>
                            </Link>

                            <Link href="/admin/analytics">
                                <Button className="w-full justify-start" variant="outline">
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Analytics
                                </Button>
                            </Link>

                            <Link href="/admin/settings">
                                <Button className="w-full justify-start" variant="outline">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    System Settings
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* System Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Status</CardTitle>
                            <CardDescription>
                                Current platform health and performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Database</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Operational
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Authentication</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Operational
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">File Storage</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Operational
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Email Service</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Operational
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent System Activities</CardTitle>
                        <CardDescription>
                            Latest platform events and updates
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <div className={`mt-1 ${activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                        {activity.status === 'completed' ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <Clock className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {activity.description}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                                        {activity.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Platform Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Insights</CardTitle>
                        <CardDescription>
                            Key performance indicators and trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600 mb-2">98.5%</div>
                                <div className="text-sm text-gray-600">User Satisfaction</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">2.3s</div>
                                <div className="text-sm text-gray-600">Average Response Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                                <div className="text-sm text-gray-600">Total Active Users</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
