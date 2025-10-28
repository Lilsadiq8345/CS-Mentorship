'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

export default function GoalsPage() {
    const [goals] = useState([
        {
            id: '1',
            title: 'Learn Python Advanced Concepts',
            description: 'Master decorators, generators, and async programming',
            category: 'Skill Development',
            progress: 75,
            status: 'in-progress'
        },
        {
            id: '2',
            title: 'Complete Machine Learning Course',
            description: 'Finish the Coursera ML specialization',
            category: 'Career Development',
            progress: 30,
            status: 'in-progress'
        }
    ]);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Goals & Progress</h1>
                <p className="text-gray-600 mt-2">Track your career and skill development goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{goals.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {goals.filter(g => g.status === 'in-progress').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">0</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                {goals.map((goal) => (
                    <Card key={goal.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {goal.title}
                                <Badge className="bg-blue-100 text-blue-800">
                                    {goal.status}
                                </Badge>
                            </CardTitle>
                            <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Category: {goal.category}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Progress</span>
                                        <span>{goal.progress}%</span>
                                    </div>
                                    <Progress value={goal.progress} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
