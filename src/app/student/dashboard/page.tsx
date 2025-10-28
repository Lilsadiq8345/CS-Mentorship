'use client';

import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Target,
  BookOpen,
  TrendingUp,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { data: session } = useSession();

  // Mock data - in real app, this would come from API
  const mockData = {
    activeMentorships: 2,
    totalGoals: 8,
    completedGoals: 5,
    upcomingMeetings: 3,
    recentMessages: 2,
    progressPercentage: 62,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'goal',
      title: 'Completed Python Basics Course',
      description: 'Finished the foundational Python programming course',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Scheduled Meeting with Dr. Smith',
      description: 'Career guidance session scheduled for tomorrow',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Mentor',
      description: 'Dr. Johnson sent you a resource link',
      time: '2 days ago',
      icon: MessageSquare,
      color: 'text-purple-600',
    },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your mentorship journey today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.activeMentorships}</div>
              <p className="text-xs text-muted-foreground">
                Currently learning from {mockData.activeMentorships} mentors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.completedGoals}/{mockData.totalGoals}</div>
              <p className="text-xs text-muted-foreground">
                {mockData.progressPercentage}% of goals completed
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
                Next meeting in 2 days
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
                Unread messages from mentors
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                Your journey towards career goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Career Development</span>
                  <span>{mockData.progressPercentage}%</span>
                </div>
                <Progress value={mockData.progressPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Skill Development</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network Building</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and next steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/student/browse-lecturers">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Find New Mentors
                </Button>
              </Link>

              <Link href="/student/goals">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Set New Goals
                </Button>
              </Link>

              <Link href="/student/schedule">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </Link>

              <Link href="/student/resources">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Browse Resources
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest achievements and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`mt-1 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Career Guidance Session</p>
                    <p className="text-sm text-gray-600">with Dr. Sarah Johnson</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Tomorrow</p>
                  <p className="text-xs text-gray-500">2:00 PM - 3:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Technical Review</p>
                    <p className="text-sm text-gray-600">with Prof. Michael Chen</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Friday</p>
                  <p className="text-xs text-gray-500">10:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
