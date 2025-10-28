'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    User,
    Mail,
    GraduationCap,
    Briefcase,
    MapPin,
    Calendar,
    Save,
    Edit
} from 'lucide-react';

export default function LecturerProfile() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock profile data
    const profileData = {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        department: 'Computer Science',
        title: 'Associate Professor',
        bio: 'Experienced lecturer with expertise in machine learning, data science, and software engineering. Passionate about mentoring students and helping them achieve their career goals.',
        expertise: ['Machine Learning', 'Data Science', 'Software Engineering', 'Python', 'R'],
        researchAreas: ['Artificial Intelligence', 'Computer Vision', 'Natural Language Processing'],
        yearsOfExperience: 8,
        maxStudents: 5,
        location: 'San Francisco, CA',
        joinedDate: '2016-09-01',
        avatar: null
    };

    const handleSave = async () => {
        setIsLoading(true);
        // Handle profile save
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
        }, 1000);
    };

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                        <p className="text-muted-foreground">
                            Manage your lecturer profile and preferences
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <Avatar className="h-24 w-24 mx-auto mb-4">
                                    <AvatarImage src={profileData.avatar || undefined} />
                                    <AvatarFallback>
                                        {profileData.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle>{profileData.name}</CardTitle>
                                <CardDescription>{profileData.title}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{profileData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>{profileData.department}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{profileData.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Joined {new Date(profileData.joinedDate).getFullYear()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span>{profileData.yearsOfExperience} years experience</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    Your personal and professional details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            defaultValue={profileData.name}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue={profileData.email}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            defaultValue={profileData.department}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            defaultValue={profileData.title}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        defaultValue={profileData.bio}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Expertise & Research */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Expertise & Research</CardTitle>
                                <CardDescription>
                                    Your areas of expertise and research interests
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Areas of Expertise</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.expertise.map((skill, index) => (
                                            <Badge key={index} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Research Areas</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.researchAreas.map((area, index) => (
                                            <Badge key={index} variant="outline">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mentorship Preferences */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mentorship Preferences</CardTitle>
                                <CardDescription>
                                    Configure your mentorship settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="maxStudents">Maximum Students</Label>
                                    <Select defaultValue={profileData.maxStudents.toString()} disabled={!isEditing}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3">3 students</SelectItem>
                                            <SelectItem value="5">5 students</SelectItem>
                                            <SelectItem value="8">8 students</SelectItem>
                                            <SelectItem value="10">10 students</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
