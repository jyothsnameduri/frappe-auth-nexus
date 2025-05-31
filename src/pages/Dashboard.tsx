
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, Users, Clock, TrendingUp, Plus, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Open Tickets',
      value: '24',
      change: '+12%',
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Resolved Today',
      value: '18',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15%',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+5%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentTickets = [
    {
      id: '#1234',
      title: 'Login issues with new system',
      priority: 'High',
      status: 'Open',
      assignee: 'John Doe',
      created: '2 hours ago'
    },
    {
      id: '#1235',
      title: 'Email not syncing properly',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Sarah Wilson',
      created: '4 hours ago'
    },
    {
      id: '#1236',
      title: 'Network connectivity problems',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Mike Johnson',
      created: '1 day ago'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg frappe-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-frappe-dark">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your helpdesk today.
            </p>
          </div>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white frappe-shadow hover:frappe-shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-frappe-dark">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2 bg-white frappe-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-frappe-dark">
                  Recent Tickets
                </CardTitle>
                <CardDescription>
                  Latest support requests and their status
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-frappe-primary">{ticket.id}</span>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-frappe-dark mb-1">{ticket.title}</h4>
                    <p className="text-sm text-gray-500">
                      Assigned to {ticket.assignee} • {ticket.created}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white frappe-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-frappe-dark">
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-frappe-primary hover:bg-frappe-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              View User Directory
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="bg-gradient-to-r from-frappe-primary to-blue-600 text-white frappe-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              🤖
            </span>
            AI Insights
          </CardTitle>
          <CardDescription className="text-white/80">
            Intelligent recommendations based on your helpdesk data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Peak Hours Detection</h4>
              <p className="text-sm text-white/80">
                Most tickets are created between 9-11 AM. Consider increasing staff during these hours.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Common Issues</h4>
              <p className="text-sm text-white/80">
                Login problems account for 35% of tickets. A self-service guide could reduce workload.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
