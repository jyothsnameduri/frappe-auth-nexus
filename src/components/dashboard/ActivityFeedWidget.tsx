
import React from 'react';
import DashboardWidget from './DashboardWidget';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, User, CheckCircle, AlertTriangle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'comment' | 'status_change' | 'assignment' | 'creation';
  user: string;
  userAvatar?: string;
  description: string;
  ticketId?: string;
  timestamp: string;
  priority?: 'Low' | 'Medium' | 'High';
}

const ActivityFeedWidget: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'comment',
      user: 'Sarah Wilson',
      description: 'Added comment to ticket HD-001',
      ticketId: 'HD-001',
      timestamp: '5 minutes ago',
      priority: 'High'
    },
    {
      id: '2',
      type: 'status_change',
      user: 'Mike Johnson',
      description: 'Resolved ticket HD-003',
      ticketId: 'HD-003',
      timestamp: '1 hour ago',
      priority: 'Medium'
    },
    {
      id: '3',
      type: 'assignment',
      user: 'System',
      description: 'Auto-assigned ticket HD-005 to John Doe',
      ticketId: 'HD-005',
      timestamp: '2 hours ago',
      priority: 'Low'
    },
    {
      id: '4',
      type: 'creation',
      user: 'Jane Smith',
      description: 'Created new ticket for email sync issue',
      ticketId: 'HD-006',
      timestamp: '3 hours ago',
      priority: 'Medium'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'status_change': return CheckCircle;
      case 'assignment': return User;
      case 'creation': return AlertTriangle;
      default: return MessageSquare;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardWidget title="Recent Activity" exportable>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.userAvatar} />
                <AvatarFallback className="text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-frappe-dark">{activity.user}</span>
                  {activity.ticketId && (
                    <Badge variant="outline" className="text-xs">
                      {activity.ticketId}
                    </Badge>
                  )}
                  {activity.priority && (
                    <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                      {activity.priority}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            View All Activity
          </Button>
        </div>
      </div>
    </DashboardWidget>
  );
};

export default ActivityFeedWidget;
