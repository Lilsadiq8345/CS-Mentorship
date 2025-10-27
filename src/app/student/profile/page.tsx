'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, GraduationCap, MapPin } from 'lucide-react';

export default function ProfilePage() {
    const profile = {
        name: 'Demo Student',
        email: 'student@example.com',
        major: 'Computer Science',
        year: 2,
        university: 'University of Technology',
        location: 'San Francisco, CA',
        bio: 'Passionate CS student interested in AI and web development.',
        skills: ['Python', 'JavaScript', 'React', 'Data Structures'],
        interests: ['Machine Learning', 'Web Development', 'Artificial Intelligence']
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-2">Your personal information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Header */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/placeholder-avatar.jpg" />
                                    <AvatarFallback className="text-2xl">DS</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                                    <p className="text-gray-600 mt-1">{profile.major} Student - Year {profile.year}</p>
                                    <p className="text-gray-500 mt-2">{profile.bio}</p>
                                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                                        {profile.skills.map((skill) => (
                                            <Badge key={skill} variant="secondary">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Personal Information */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Your basic details and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mt-1">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span>{profile.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mt-1">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span>{profile.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Major</label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mt-1">
                                        <GraduationCap className="h-4 w-4 text-gray-500" />
                                        <span>{profile.major}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Year</label>
                                    <div className="p-2 bg-gray-50 rounded-md mt-1">
                                        <span>Year {profile.year}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">University</label>
                                    <div className="p-2 bg-gray-50 rounded-md mt-1">
                                        <span>{profile.university}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Location</label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mt-1">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{profile.location}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Skills & Interests */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills & Interests</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Technical Skills</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Areas of Interest</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile.interests.map((interest) => (
                                        <Badge key={interest} variant="outline">{interest}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
