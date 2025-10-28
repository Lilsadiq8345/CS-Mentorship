'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, User, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: '',
        bio: '',
        // Student fields
        year: '',
        major: '',
        interests: '',
        careerGoals: '',
        skills: '',
        // Lecturer fields
        department: '',
        expertise: '',
        researchAreas: '',
        yearsOfExperience: '',
        maxStudents: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step === 1 && (!formData.email || !formData.password || !formData.confirmPassword || !formData.name || !formData.role)) {
            setError('Please fill in all required fields');
            return;
        }
        if (step === 1 && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setStep(step + 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/auth/signin?message=Account created successfully');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create account');
            }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
            setIsLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="student">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>Student</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="lecturer">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Lecturer/Professional</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    required
                    rows={3}
                />
            </div>

            {formData.role === 'student' && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="year">Year Level</Label>
                            <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1st Year</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                    <SelectItem value="5">5th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="major">Major</Label>
                            <Input
                                id="major"
                                placeholder="e.g., Computer Science"
                                value={formData.major}
                                onChange={(e) => handleInputChange('major', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interests">Areas of Interest</Label>
                        <Input
                            id="interests"
                            placeholder="e.g., AI, Web Development, Data Science"
                            value={formData.interests}
                            onChange={(e) => handleInputChange('interests', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="careerGoals">Career Goals</Label>
                        <Input
                            id="careerGoals"
                            placeholder="e.g., Software Engineer, Data Scientist"
                            value={formData.careerGoals}
                            onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                            id="skills"
                            placeholder="e.g., Python, JavaScript, React"
                            value={formData.skills}
                            onChange={(e) => handleInputChange('skills', e.target.value)}
                            required
                        />
                    </div>
                </>
            )}

            {formData.role === 'lecturer' && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="department">Department/Organization</Label>
                        <Input
                            id="department"
                            placeholder="e.g., Computer Science Department"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expertise">Areas of Expertise</Label>
                        <Input
                            id="expertise"
                            placeholder="e.g., Machine Learning, Software Engineering"
                            value={formData.expertise}
                            onChange={(e) => handleInputChange('expertise', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="researchAreas">Research Areas</Label>
                        <Input
                            id="researchAreas"
                            placeholder="e.g., AI Ethics, Distributed Systems"
                            value={formData.researchAreas}
                            onChange={(e) => handleInputChange('researchAreas', e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                            <Input
                                id="yearsOfExperience"
                                type="number"
                                placeholder="e.g., 5"
                                value={formData.yearsOfExperience}
                                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxStudents">Max Students</Label>
                            <Input
                                id="maxStudents"
                                type="number"
                                placeholder="e.g., 3"
                                value={formData.maxStudents}
                                onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <GraduationCap className="h-6 w-6 text-indigo-600" />
                    </div>
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>
                        Join CS Mentorship and start your journey
                    </CardDescription>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center space-x-4 mt-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            1
                        </div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            2
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {step === 1 ? renderStep1() : renderStep2()}

                        <div className="flex space-x-4">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1"
                                >
                                    Previous
                                </Button>
                            )}

                            {step < 2 ? (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            )}
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
