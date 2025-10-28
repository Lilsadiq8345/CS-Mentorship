'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    BookOpen,
    FileText,
    Link,
    Plus,
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';

export default function LecturerResources() {

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Mock resources data
    const resources = [
        {
            id: '1',
            title: 'Introduction to Machine Learning',
            type: 'document',
            category: 'Machine Learning',
            description: 'Comprehensive guide to ML fundamentals',
            url: '/resources/ml-intro.pdf',
            uploadDate: '2024-01-15',
            downloads: 45
        },
        {
            id: '2',
            title: 'Python Programming Best Practices',
            type: 'link',
            category: 'Programming',
            description: 'External resource for Python development',
            url: 'https://python.org/best-practices',
            uploadDate: '2024-01-10',
            downloads: 32
        },
        {
            id: '3',
            title: 'Data Structures and Algorithms',
            type: 'document',
            category: 'Computer Science',
            description: 'Essential algorithms and data structures',
            url: '/resources/dsa-guide.pdf',
            uploadDate: '2024-01-05',
            downloads: 67
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'document': return <FileText className="h-4 w-4" />;
            case 'link': return <Link className="h-4 w-4" />;
            default: return <BookOpen className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'document': return 'bg-blue-100 text-blue-800';
            case 'link': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <DashboardLayout userRole="lecturer">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
                        <p className="text-muted-foreground">
                            Manage and share educational resources with your students
                        </p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Resource
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                            <SelectItem value="Programming">Programming</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(resource.type)}
                                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                                    </div>
                                    <Badge className={getTypeColor(resource.type)}>
                                        {resource.type}
                                    </Badge>
                                </div>
                                <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{resource.category}</span>
                                    <span>{resource.downloads} downloads</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="flex-1">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredResources.length === 0 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                                    No Resources Found
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {searchTerm || categoryFilter !== 'all'
                                        ? 'Try adjusting your search or filter criteria.'
                                        : 'Start by adding your first educational resource.'
                                    }
                                </p>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Resource
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{resources.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Educational materials
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {resources.reduce((sum, resource) => sum + resource.downloads, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Student downloads
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <Filter className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(resources.map(r => r.category)).size}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Different categories
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
