'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, User, Building, Target, Mail, Calendar } from 'lucide-react';
import { MentorshipRequestForm } from '@/components/forms/mentorship-request-form';

interface Lecturer {
    id: string;
    name: string;
    email: string;
    profile?: {
        department: string;
        expertise: string[];
        researchAreas: string[];
        yearsOfExperience: number;
        bio: string;
        maxStudents: number;
    };
}

interface BrowseLecturersProps {
    studentId: string;
}

export function BrowseLecturers({ studentId }: BrowseLecturersProps) {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
    const [showRequestForm, setShowRequestForm] = useState(false);

    useEffect(() => {
        fetchLecturers();
    }, []);

    const filterLecturers = useCallback(() => {
        let filtered = lecturers;

        if (searchTerm) {
            filtered = filtered.filter(lecturer =>
                lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lecturer.profile?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lecturer.profile?.expertise?.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedDepartment) {
            filtered = filtered.filter(lecturer =>
                lecturer.profile?.department === selectedDepartment
            );
        }

        setFilteredLecturers(filtered);
    }, [lecturers, searchTerm, selectedDepartment]);

    useEffect(() => {
        filterLecturers();
    }, [filterLecturers]);

    const fetchLecturers = async () => {
        try {
            const response = await fetch('/api/users?role=lecturer');
            if (response.ok) {
                const data = await response.json();
                setLecturers(data);
            }
        } catch (error) {
            console.error('Error fetching lecturers:', error);
        } finally {
            setLoading(false);
        }
    };



    const departments = Array.from(
        new Set(lecturers.map(l => l.profile?.department).filter(Boolean))
    );

    const handleRequestMentorship = (lecturer: Lecturer) => {
        setSelectedLecturer(lecturer);
        setShowRequestForm(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading lecturers...</p>
                </div>
            </div>
        );
    }

    if (showRequestForm && selectedLecturer) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => setShowRequestForm(false)}
                        className="mb-4"
                    >
                        ← Back to Lecturers
                    </Button>
                </div>
                <MentorshipRequestForm
                    lecturers={[selectedLecturer]}
                    studentId={studentId}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, department, or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                        <option value="">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Found {filteredLecturers.length} lecturer{filteredLecturers.length !== 1 ? 's' : ''}
                {selectedDepartment && ` in ${selectedDepartment}`}
            </div>

            {/* Lecturers Grid */}
            {filteredLecturers.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-8">
                            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Lecturers Found</h3>
                            <p className="text-sm text-muted-foreground">
                                Try adjusting your search criteria or department filter.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLecturers.map((lecturer) => (
                        <Card key={lecturer.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="" alt={lecturer.name} />
                                            <AvatarFallback>{lecturer.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{lecturer.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {lecturer.email}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {lecturer.profile && (
                                    <>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <Building className="h-4 w-4" />
                                                Department
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {lecturer.profile.department}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <Target className="h-4 w-4" />
                                                Expertise
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {lecturer.profile.expertise?.slice(0, 3).map((exp, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {exp}
                                                    </Badge>
                                                ))}
                                                {lecturer.profile.expertise && lecturer.profile.expertise.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{lecturer.profile.expertise.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <Calendar className="h-4 w-4" />
                                                Experience
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {lecturer.profile.yearsOfExperience} years
                                            </p>
                                        </div>

                                        {lecturer.profile.bio && (
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium">Bio</div>
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {lecturer.profile.bio}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}

                                <Button
                                    onClick={() => handleRequestMentorship(lecturer)}
                                    className="w-full"
                                    size="sm"
                                >
                                    Request Mentorship
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
