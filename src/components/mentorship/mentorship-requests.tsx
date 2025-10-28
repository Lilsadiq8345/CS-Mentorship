'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Clock, User, Target, Calendar } from 'lucide-react';

interface MentorshipRequest {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  goals: string[];
  startDate: string;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  createdAt: string;
}

interface MentorshipRequestsProps {
  requests: MentorshipRequest[];
}

export function MentorshipRequests({ requests }: MentorshipRequestsProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusUpdate = async (mentorshipId: string, status: 'active' | 'rejected') => {
    setUpdating(mentorshipId);

    try {
      const response = await fetch(`/api/mentorships/${mentorshipId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update mentorship status');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating mentorship:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'active':
        return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Mentorship Requests</h3>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any pending mentorship requests at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request._id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={request.studentId.name} />
                  <AvatarFallback>{request.studentId.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{request.studentId.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{request.studentId.email}</span>
                    <span>•</span>
                    <span>Requested {formatDate(request.createdAt)}</span>
                  </CardDescription>
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4" />
                Mentorship Goals
              </div>
              <div className="flex flex-wrap gap-2">
                {request.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Preferred start date: {formatDate(request.startDate)}
            </div>

            {request.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate(request._id, 'active')}
                  disabled={updating === request._id}
                  className="flex-1"
                >
                  {updating === request._id ? 'Accepting...' : 'Accept Request'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate(request._id, 'rejected')}
                  disabled={updating === request._id}
                  className="flex-1"
                >
                  {updating === request._id ? 'Rejecting...' : 'Reject Request'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
