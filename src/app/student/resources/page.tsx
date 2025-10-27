'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, ExternalLink, Star } from 'lucide-react';

export default function ResourcesPage() {
    const resources = [
        {
            id: '1',
            title: 'Python for Beginners',
            description: 'Complete Python programming course for absolute beginners',
            type: 'Course',
            category: 'Programming',
            rating: 4.8,
            url: 'https://www.coursera.org/learn/python',
            isFree: true
        },
        {
            id: '2',
            title: 'Machine Learning Fundamentals',
            description: 'Learn the basics of ML algorithms and data science',
            type: 'Course',
            category: 'Machine Learning',
            rating: 4.9,
            url: 'https://www.coursera.org/learn/machine-learning',
            isFree: false
        }
    ];

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
                <p className="text-gray-600 mt-2">Discover courses, books, and tutorials to advance your skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="secondary">{resource.category}</Badge>
                                {resource.isFree && (
                                    <Badge className="bg-green-100 text-green-800">Free</Badge>
                                )}
                            </div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    {resource.rating}
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={() => window.open(resource.url, '_blank')}
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    {resource.isFree ? 'Start Learning' : 'Learn More'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
