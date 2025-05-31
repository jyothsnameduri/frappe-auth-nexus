
import React from 'react';
import TicketStatsWidget from '@/components/dashboard/TicketStatsWidget';
import ActivityFeedWidget from '@/components/dashboard/ActivityFeedWidget';
import AIInsightsWidget from '@/components/dashboard/AIInsightsWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, TrendingUp, Users, MessageSquare, Brain } from 'lucide-react';

const AgentDashboard = () => {
  const myWorkloadStats = {
    open: 12,
    inProgress: 8,
    resolved: 45,
    overdue: 3
  };

  const performanceData = [
    { name: 'Mon', resolved: 8, assigned: 10 },
    { name: 'Tue', resolved: 12, assigned: 14 },
    { name: 'Wed', resolved: 10, assigned: 12 },
    { name: 'Thu', resolved: 15, assigned: 16 },
    { name: 'Fri', resolved: 9, assigned: 11 },
  ];

  const responseTimeData = [
    { name: 'Last Week', value: 2.8 },
    { name: 'This Week', value: 2.4 },
    { name: 'Target', value: 2.0 },
  ];

  const urgentTickets = [
    { id: 'HD-012', title: 'Server downtime affecting production', assignee: 'Me', created: '30 mins ago', priority: 'Critical' },
    { id: 'HD-013', title: 'Database connection timeout', assignee: 'Me', created: '1 hour ago', priority: 'High' },
    { id: 'HD-014', title: 'Email server configuration error', assignee: 'Unassigned', created: '2 hours ago', priority: 'High' },
  ];

  const aiSuggestions = [
    { ticket: 'HD-015', suggestion: 'Similar to HD-008. Try restarting the email service.', confidence: 92 },
    { ticket: 'HD-016', suggestion: 'User needs password reset. Direct to self-service portal.', confidence: 87 },
    { ticket: 'HD-017', suggestion: 'Hardware issue. Escalate to IT hardware team.', confidence: 78 },
  ];

  const todayTargets = {
    ticketsToResolve: 12,
    ticketsResolved: 8,
    avgResponseTime: '2.4h',
    targetResponseTime: '2.0h',
    customerSatisfaction: 4.6
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your workload and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Assist
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Quick Reply
          </Button>
        </div>
      </div>

      {/* Today's Targets */}
      <DashboardWidget title="Today's Performance" configurable>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-blue-50">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{todayTargets.ticketsResolved}/{todayTargets.ticketsToResolve}</div>
            <div className="text-sm text-gray-600">Tickets Resolved</div>
            <Progress value={(todayTargets.ticketsResolved / todayTargets.ticketsToResolve) * 100} className="mt-2" />
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{todayTargets.avgResponseTime}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-gray-500 mt-1">Target: {todayTargets.targetResponseTime}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{todayTargets.customerSatisfaction}/5.0</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
            <div className="text-xs text-green-600 mt-1">↗ +0.2 from last week</div>
          </div>
        </div>
      </DashboardWidget>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Workload */}
        <div className="lg:col-span-2">
          <TicketStatsWidget title="My Assigned Tickets" stats={myWorkloadStats} />
        </div>

        {/* Urgent Queue */}
        <DashboardWidget title="Urgent Queue" exportable>
          <div className="space-y-3">
            {urgentTickets.map((ticket) => (
              <div key={ticket.id} className="p-3 rounded-lg border border-red-200 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-frappe-primary">{ticket.id}</span>
                  <Badge className="bg-red-100 text-red-800">{ticket.priority}</Badge>
                </div>
                <h4 className="font-medium text-frappe-dark text-sm mb-1">{ticket.title}</h4>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{ticket.assignee}</span>
                  <span>{ticket.created}</span>
                </div>
              </div>
            ))}
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
              View All Urgent Tickets
            </Button>
          </div>
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <ChartWidget 
          title="Resolution Performance (This Week)" 
          type="bar" 
          data={performanceData} 
          dataKey="resolved" 
          xAxisKey="name"
        />

        {/* AI Suggestions */}
        <DashboardWidget title="AI Response Suggestions" exportable configurable>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-frappe-primary">{suggestion.ticket}</span>
                  <Badge className="bg-blue-100 text-blue-800">{suggestion.confidence}% confident</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{suggestion.suggestion}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Use Suggestion
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All AI Suggestions
            </Button>
          </div>
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <ActivityFeedWidget />

        {/* Response Time Trend */}
        <ChartWidget 
          title="Response Time Trend (Hours)" 
          type="line" 
          data={responseTimeData} 
          dataKey="value" 
          xAxisKey="name"
        />
      </div>

      {/* AI Insights */}
      <AIInsightsWidget />
    </div>
  );
};

export default AgentDashboard;
