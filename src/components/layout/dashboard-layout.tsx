'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userRole: 'student' | 'lecturer' | 'admin';
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();

    const navigation = {
        student: [
            { name: 'Dashboard', href: '/student/dashboard', icon: '📊' },
            { name: 'Browse Lecturers', href: '/student/browse-lecturers', icon: '🔍' },
            { name: 'My Mentorships', href: '/student/my-mentorships', icon: '🤝' },
            { name: 'Goals & Progress', href: '/student/goals', icon: '🎯' },
            { name: 'Resources', href: '/student/resources', icon: '📚' },
            { name: 'Profile', href: '/student/profile', icon: '👤' },
        ],
        lecturer: [
            { name: 'Dashboard', href: '/lecturer/dashboard', icon: '📊' },
            { name: 'My Students', href: '/lecturer/students', icon: '👥' },
            { name: 'Mentorship Requests', href: '/lecturer/mentorship-requests', icon: '📨' },
            { name: 'Schedule', href: '/lecturer/schedule', icon: '📅' },
            { name: 'Resources', href: '/lecturer/resources', icon: '📚' },
            { name: 'Profile', href: '/lecturer/profile', icon: '👤' },
        ],
        admin: [
            { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
            { name: 'Users', href: '/admin/users', icon: '👥' },
            { name: 'Mentorships', href: '/admin/mentorships', icon: '🤝' },
            { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
            { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
        ],
    };

    const currentNav = navigation[userRole];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-8 w-8 text-indigo-600" />
                            <span className="text-xl font-bold">CS Mentorship</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {currentNav.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname === item.href
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-8 w-8 text-indigo-600" />
                            <span className="text-xl font-bold">CS Mentorship</span>
                        </div>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {currentNav.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname === item.href
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1" />
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <Button variant="ghost" size="sm">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="text-sm">
                                    <p className="font-medium text-gray-700">{session?.user?.name}</p>
                                    <p className="text-gray-500 capitalize">{userRole}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
