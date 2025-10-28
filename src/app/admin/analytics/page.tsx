'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    Users,
    Target,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';

export default function AdminAnalytics() {


    // Mock analytics data
    const analyticsData = {
        totalUsers: 156,
        totalStudents: 98,
        totalLecturers: 58,
        activeMentorships: 45,
        pendingRequests: 12,
        completionRate: 87,
        averageRating: 4.5,
        engagementScore: 82
    };

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Platform insights and metrics overview
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analyticsData.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analyticsData.activeMentorships}</div>
                            <p className="text-xs text-muted-foreground">
                                {analyticsData.completionRate}% completion rate
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analyticsData.averageRating}</div>
                            <p className="text-xs text-muted-foreground">
                                Based on {analyticsData.activeMentorships} mentorships
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analyticsData.engagementScore}%</div>
                            <p className="text-xs text-muted-foreground">
                                Platform engagement score
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth</CardTitle>
                            <CardDescription>Monthly user registration trend</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                <BarChart3 className="h-12 w-12" />
                                <span className="ml-2">Chart visualization</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Mentorship Status</CardTitle>
                            <CardDescription>Distribution of mentorship statuses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                <PieChart className="h-12 w-12" />
                                <span className="ml-2">Chart visualization</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">By Role</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Students</span>
                                    <span className="text-sm font-medium">{analyticsData.totalStudents}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Lecturers</span>
                                    <span className="text-sm font-medium">{analyticsData.totalLecturers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Pending Requests</span>
                                    <span className="text-sm font-medium">{analyticsData.pendingRequests}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                                    <span className="text-sm font-medium">{analyticsData.completionRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Engagement</span>
                                    <span className="text-sm font-medium">{analyticsData.engagementScore}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Avg Rating</span>
                                    <span className="text-sm font-medium">{analyticsData.averageRating}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button className="w-full" variant="outline">Export Data</Button>
                                <Button className="w-full" variant="outline">Generate Report</Button>
                                <Button className="w-full" variant="outline">View Details</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

