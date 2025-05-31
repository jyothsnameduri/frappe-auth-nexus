
import React, { useState } from 'react';
import { BarChart, Download, Filter, Calendar, Users, Target, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChartWidget from '@/components/dashboard/ChartWidget';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const reportCategories = [
    { id: 'performance', name: 'Performance Reports', count: 12, icon: TrendingUp },
    { id: 'tickets', name: 'Ticket Analytics', count: 8, icon: BarChart },
    { id: 'agents', name: 'Agent Reports', count: 6, icon: Users },
    { id: 'satisfaction', name: 'Satisfaction', count: 4, icon: Target },
  ];

  const prebuiltReports = [
    {
      id: 1,
      name: 'Monthly Ticket Volume Report',
      description: 'Comprehensive analysis of ticket creation and resolution trends',
      category: 'tickets',
      lastRun: '2 hours ago',
      schedule: 'Weekly',
      format: ['PDF', 'Excel']
    },
    {
      id: 2,
      name: 'Agent Performance Dashboard',
      description: 'Individual and team performance metrics with benchmarks',
      category: 'performance',
      lastRun: '1 day ago',
      schedule: 'Daily',
      format: ['PDF', 'Dashboard']
    },
    {
      id: 3,
      name: 'Customer Satisfaction Analysis',
      description: 'CSAT scores and feedback analysis with trends',
      category: 'satisfaction',
      lastRun: '3 hours ago',
      schedule: 'Weekly',
      format: ['PDF', 'Excel', 'CSV']
    },
    {
      id: 4,
      name: 'SLA Compliance Report',
      description: 'Service level agreement metrics and breach analysis',
      category: 'performance',
      lastRun: '6 hours ago',
      schedule: 'Daily',
      format: ['PDF', 'Excel']
    }
  ];

  const kpiMetrics = [
    { name: 'Total Tickets', value: '2,847', change: '+12%', trend: 'up' },
    { name: 'Resolution Rate', value: '94.2%', change: '+3.1%', trend: 'up' },
    { name: 'Avg Response Time', value: '2.4h', change: '-18%', trend: 'down' },
    { name: 'CSAT Score', value: '4.6/5', change: '+0.2', trend: 'up' },
  ];

  const ticketVolumeData = [
    { name: 'Jan', created: 245, resolved: 239 },
    { name: 'Feb', created: 267, resolved: 264 },
    { name: 'Mar', created: 289, resolved: 285 },
    { name: 'Apr', created: 312, resolved: 308 },
    { name: 'May', created: 298, resolved: 302 },
    { name: 'Jun', created: 334, resolved: 329 },
  ];

  const categoryData = [
    { name: 'IT Support', value: 45 },
    { name: 'HR Queries', value: 25 },
    { name: 'Admin', value: 20 },
    { name: 'General', value: 10 },
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      performance: TrendingUp,
      tickets: BarChart,
      agents: Users,
      satisfaction: Target,
    };
    return icons[category as keyof typeof icons] || BarChart;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark flex items-center">
            <BarChart className="h-8 w-8 mr-3 text-frappe-primary" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive reporting and business intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="frappe-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="frappe-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-frappe-dark">{metric.value}</p>
                </div>
                <Badge className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prebuilt">Pre-built Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget
              title="Ticket Volume Trends"
              type="line"
              data={ticketVolumeData}
              dataKey="created"
              xAxisKey="name"
            />
            <ChartWidget
              title="Tickets by Category"
              type="pie"
              data={categoryData}
              dataKey="value"
              xAxisKey="name"
            />
          </div>

          {/* Report Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportCategories.map((category) => {
              const Icon = getCategoryIcon(category.id);
              return (
                <Card key={category.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-frappe-primary" />
                    <h3 className="font-semibold text-frappe-dark mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} reports</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="prebuilt" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-frappe-dark">Pre-built Reports</h3>
            <Button variant="outline" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Create Custom Report
            </Button>
          </div>
          
          {prebuiltReports.map((report) => (
            <Card key={report.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-frappe-dark mb-2">{report.name}</h4>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Last run: {report.lastRun}</span>
                      <span>Schedule: {report.schedule}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{report.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {report.format.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                      Run Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="frappe-shadow">
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <PieChart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Build Custom Reports</h3>
                <p className="text-gray-500 mb-4">Create tailored reports with drag-and-drop interface</p>
                <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
                  Launch Report Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="frappe-shadow">
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Scheduled Reports</h3>
                <p className="text-gray-500 mb-4">Set up automated report delivery to your inbox</p>
                <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
