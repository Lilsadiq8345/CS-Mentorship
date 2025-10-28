'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Bell,
    Shield,
    Database,
    Save
} from 'lucide-react';

export default function AdminSettings() {
    const { data: _session } = useSession();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        weeklyReports: true,
        mentorshipReminders: true,
        systemMaintenance: false
    });

    const handleSave = () => {
        // Handle settings save
        console.log('Settings saved:', settings);
    };

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        System Settings
                    </h1>
                    <p className="text-gray-600">
                        Manage platform-wide settings and preferences
                    </p>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Settings
                            </CardTitle>
                            <CardDescription>
                                Configure notification preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive email notifications for important events
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        setSettings({ ...settings, emailNotifications: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Weekly Reports</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Send weekly summary reports
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.weeklyReports}
                                    onCheckedChange={(checked) =>
                                        setSettings({ ...settings, weeklyReports: checked })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Platform Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Platform Settings
                            </CardTitle>
                            <CardDescription>
                                Configure platform behavior
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Platform Name</Label>
                                <Input defaultValue="CS Mentorship Platform" />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Students per Lecturer</Label>
                                <Input type="number" defaultValue="5" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>
                                Manage security and access controls
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Session Timeout (minutes)</Label>
                                <Input type="number" defaultValue="60" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Require Strong Passwords</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enforce strong password policies
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}

