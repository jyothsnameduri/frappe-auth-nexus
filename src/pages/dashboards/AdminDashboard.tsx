
import React from 'react';
import TicketStatsWidget from '@/components/dashboard/TicketStatsWidget';
import ActivityFeedWidget from '@/components/dashboard/ActivityFeedWidget';
import AIInsightsWidget from '@/components/dashboard/AIInsightsWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Server,
  Brain
} from 'lucide-react';

const AdminDashboard = () => {
  const systemStats = {
    open: 156,
    inProgress: 89,
    resolved: 1247,
    overdue: 23
  };

  const departmentData = [
    { name: 'IT', tickets: 89, resolved: 67 },
    { name: 'HR', tickets: 45, resolved: 38 },
    { name: 'Admin', tickets: 32, resolved: 28 },
    { name: 'General', tickets: 78, resolved: 65 },
  ];

  const volumeTrendData = [
    { name: 'Jan', tickets: 145, resolved: 132 },
    { name: 'Feb', tickets: 167, resolved: 154 },
    { name: 'Mar', tickets: 189, resolved: 178 },
    { name: 'Apr', tickets: 234, resolved: 221 },
    { name: 'May', tickets: 198, resolved: 189 },
    { name: 'Jun', tickets: 213, resolved: 205 },
  ];

  const agentPerformance = [
    { name: 'Sarah Wilson', resolved: 45, satisfaction: 4.8, responseTime: 1.8 },
    { name: 'Mike Johnson', resolved: 38, satisfaction: 4.6, responseTime: 2.1 },
    { name: 'John Doe', resolved: 32, satisfaction: 4.5, responseTime: 2.3 },
    { name: 'Jane Smith', resolved: 29, satisfaction: 4.7, responseTime: 1.9 },
  ];

  const systemHealth = {
    cpuUsage: 68,
    memoryUsage: 74,
    diskUsage: 45,
    activeUsers: 234,
    avgResponseTime: 1.2,
    uptime: 99.8
  };

  const costAnalysis = {
    totalCost: 45780,
    costPerTicket: 29.50,
    aiSavings: 12340,
    efficiencyGain: 23
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and strategic analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
            <Server className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardWidget title="System Health" className="text-center">
          <div className="space-y-2">
            <Server className="h-8 w-8 text-green-600 mx-auto" />
            <div className="text-2xl font-bold text-green-600">{systemHealth.uptime}%</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <Progress value={systemHealth.uptime} className="h-2" />
          </div>
        </DashboardWidget>

        <DashboardWidget title="Active Users" className="text-center">
          <div className="space-y-2">
            <Users className="h-8 w-8 text-blue-600 mx-auto" />
            <div className="text-2xl font-bold text-blue-600">{systemHealth.activeUsers}</div>
            <div className="text-sm text-gray-600">Currently Online</div>
            <div className="text-xs text-green-600">↗ +15% from yesterday</div>
          </div>
        </DashboardWidget>

        <DashboardWidget title="Avg Response" className="text-center">
          <div className="space-y-2">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto" />
            <div className="text-2xl font-bold text-yellow-600">{systemHealth.avgResponseTime}h</div>
            <div className="text-sm text-gray-600">Response Time</div>
            <div className="text-xs text-green-600">↓ -12% improvement</div>
          </div>
        </DashboardWidget>

        <DashboardWidget title="AI Savings" className="text-center">
          <div className="space-y-2">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
            <div className="text-2xl font-bold text-green-600">${costAnalysis.aiSavings}</div>
            <div className="text-sm text-gray-600">This Month</div>
            <div className="text-xs text-green-600">+{costAnalysis.efficiencyGain}% efficiency</div>
          </div>
        </DashboardWidget>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketStatsWidget title="System-wide Tickets" stats={systemStats} showActions={false} />
        </div>

        {/* System Resources */}
        <DashboardWidget title="System Resources" configurable>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>CPU Usage</span>
                <span>{systemHealth.cpuUsage}%</span>
              </div>
              <Progress value={systemHealth.cpuUsage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Memory Usage</span>
                <span>{systemHealth.memoryUsage}%</span>
              </div>
              <Progress value={systemHealth.memoryUsage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Disk Usage</span>
                <span>{systemHealth.diskUsage}%</span>
              </div>
              <Progress value={systemHealth.diskUsage} className="h-2" />
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget 
          title="Department Ticket Distribution" 
          type="bar" 
          data={departmentData} 
          dataKey="tickets" 
          xAxisKey="name"
        />

        <DashboardWidget title="Agent Performance" exportable>
          <div className="space-y-3">
            {agentPerformance.map((agent, index) => (
              <div key={index} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-frappe-dark">{agent.name}</h4>
                  <Badge className="bg-green-100 text-green-800">
                    {agent.satisfaction}/5.0 ★
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Resolved:</span>
                    <span className="font-medium ml-1">{agent.resolved}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Time:</span>
                    <span className="font-medium ml-1">{agent.responseTime}h</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View Detailed Performance
            </Button>
          </div>
        </DashboardWidget>
      </div>

      {/* Trends and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget 
          title="Ticket Volume Trend (6 Months)" 
          type="line" 
          data={volumeTrendData} 
          dataKey="tickets" 
          xAxisKey="name"
        />

        {/* Cost Analysis */}
        <DashboardWidget title="Cost Analysis" exportable>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-blue-50">
                <div className="text-lg font-bold text-blue-600">${costAnalysis.totalCost}</div>
                <div className="text-sm text-gray-600">Total Monthly Cost</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-50">
                <div className="text-lg font-bold text-green-600">${costAnalysis.costPerTicket}</div>
                <div className="text-sm text-gray-600">Cost Per Ticket</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-yellow-800">AI Efficiency Gain</div>
                  <div className="text-sm text-yellow-600">+{costAnalysis.efficiencyGain}% this month</div>
                </div>
                <Brain className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Activity and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeedWidget />
        <AIInsightsWidget />
      </div>

      {/* Operational Alerts */}
      <DashboardWidget title="System Alerts & Recommendations" expandable>
        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-800">High Priority Alert</span>
            </div>
            <p className="text-sm text-red-700">23 overdue tickets require immediate attention</p>
          </div>
          <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Performance Notice</span>
            </div>
            <p className="text-sm text-yellow-700">IT department showing 15% increase in ticket volume</p>
          </div>
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-center space-x-2 mb-1">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">AI Recommendation</span>
            </div>
            <p className="text-sm text-blue-700">Consider implementing self-service portal for password resets</p>
          </div>
        </div>
      </DashboardWidget>
    </div>
  );
};

export default AdminDashboard;
