
import React from 'react';
import TicketStatsWidget from '@/components/dashboard/TicketStatsWidget';
import ActivityFeedWidget from '@/components/dashboard/ActivityFeedWidget';
import AIInsightsWidget from '@/components/dashboard/AIInsightsWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, MessageSquare, HelpCircle } from 'lucide-react';

const EmployeeDashboard = () => {
  const myTicketStats = {
    open: 3,
    inProgress: 2,
    resolved: 15,
    overdue: 1
  };

  const ticketTrendData = [
    { name: 'Mon', value: 2 },
    { name: 'Tue', value: 1 },
    { name: 'Wed', value: 3 },
    { name: 'Thu', value: 2 },
    { name: 'Fri', value: 4 },
    { name: 'Sat', value: 1 },
    { name: 'Sun', value: 0 }
  ];

  const myTickets = [
    { id: 'HD-001', title: 'Login issues with new system', status: 'Open', priority: 'High', updated: '2 hours ago' },
    { id: 'HD-003', title: 'Email not syncing properly', status: 'In Progress', priority: 'Medium', updated: '1 day ago' },
    { id: 'HD-005', title: 'Printer connection problem', status: 'Open', priority: 'Low', updated: '3 hours ago' }
  ];

  const quickHelp = [
    { title: 'How to reset password', category: 'Account', views: 1234 },
    { title: 'VPN setup guide', category: 'Network', views: 856 },
    { title: 'Email configuration', category: 'Email', views: 742 },
    { title: 'Software installation', category: 'Software', views: 623 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your tickets and get personalized assistance</p>
        </div>
        <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Tickets Overview */}
        <div className="lg:col-span-2">
          <TicketStatsWidget title="My Tickets" stats={myTicketStats} />
        </div>

        {/* Quick Actions */}
        <DashboardWidget title="Quick Actions">
          <div className="space-y-3">
            <Button className="w-full justify-start bg-frappe-primary hover:bg-frappe-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Button>
          </div>
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Recent Tickets */}
        <DashboardWidget title="My Recent Tickets" exportable>
          <div className="space-y-3">
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-frappe-primary">{ticket.id}</span>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-frappe-dark text-sm">{ticket.title}</h4>
                  <p className="text-xs text-gray-500">Updated {ticket.updated}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-3">
              View All My Tickets
            </Button>
          </div>
        </DashboardWidget>

        {/* Ticket Trend */}
        <ChartWidget 
          title="My Ticket Activity (This Week)" 
          type="line" 
          data={ticketTrendData} 
          dataKey="value" 
          xAxisKey="name"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Help Articles */}
        <DashboardWidget title="Popular Help Articles" exportable>
          <div className="space-y-3">
            {quickHelp.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium text-frappe-dark text-sm">{article.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="text-xs text-gray-500">{article.views} views</span>
                  </div>
                </div>
                <BookOpen className="h-4 w-4 text-gray-400" />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-3">
              Browse Knowledge Base
            </Button>
          </div>
        </DashboardWidget>

        {/* Activity Feed */}
        <ActivityFeedWidget />
      </div>

      {/* AI Insights for Employee */}
      <AIInsightsWidget />
    </div>
  );
};

export default EmployeeDashboard;
