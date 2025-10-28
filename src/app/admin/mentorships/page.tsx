'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Search,
    Eye,
    Edit
} from 'lucide-react';

interface Mentorship {
    id: string;
    studentName: string;
    lecturerName: string;
    status: string;
    startDate: string;
    goals: string;
}

export default function AdminMentorships() {

    const [mentorships, setMentorships] = useState<Mentorship[]>([]);
    const [filteredMentorships, setFilteredMentorships] = useState<Mentorship[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        // Mock data - in real app, this would fetch from API
        const mockMentorships: Mentorship[] = [
            {
                id: '1',
                studentName: 'John Doe',
                lecturerName: 'Dr. Smith',
                status: 'active',
                startDate: '2024-01-15',
                goals: 'Career development and technical skills'
            },
            {
                id: '2',
                studentName: 'Jane Smith',
                lecturerName: 'Prof. Johnson',
                status: 'pending',
                startDate: '2024-02-01',
                goals: 'Research guidance'
            }
        ];
        setMentorships(mockMentorships);
        setFilteredMentorships(mockMentorships);
    }, []);

    useEffect(() => {
        let filtered = mentorships;

        if (searchTerm) {
            filtered = filtered.filter(m =>
                m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.lecturerName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(m => m.status === statusFilter);
        }

        setFilteredMentorships(filtered);
    }, [mentorships, searchTerm, statusFilter]);

    const getStatusBadge = (status: string) => {
        const badges = {
            active: <Badge className="bg-green-100 text-green-800">Active</Badge>,
            pending: <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>,
            completed: <Badge className="bg-blue-100 text-blue-800">Completed</Badge>,
            rejected: <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        };
        return badges[status as keyof typeof badges] || <Badge>{status}</Badge>;
    };

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mentorship Management</h1>
                        <p className="text-muted-foreground">
                            Manage all mentorship relationships
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search mentorships..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mentorships Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Mentorships</CardTitle>
                        <CardDescription>
                            {filteredMentorships.length} mentorship(s) found
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-4 font-medium">Student</th>
                                        <th className="text-left p-4 font-medium">Lecturer</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Start Date</th>
                                        <th className="text-left p-4 font-medium">Goals</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMentorships.map((mentorship) => (
                                        <tr key={mentorship.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">{mentorship.studentName}</td>
                                            <td className="p-4">{mentorship.lecturerName}</td>
                                            <td className="p-4">{getStatusBadge(mentorship.status)}</td>
                                            <td className="p-4">{mentorship.startDate}</td>
                                            <td className="p-4 text-sm text-muted-foreground">{mentorship.goals}</td>
                                            <td className="p-4">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

