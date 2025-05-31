
import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, BarChart, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartWidget from '@/components/dashboard/ChartWidget';

const AIInsights = () => {
  const patternInsights = [
    {
      id: 1,
      title: 'Login Issues Spike',
      description: 'Password reset requests increased 45% this week, primarily affecting new hires.',
      confidence: 94,
      impact: 'High',
      category: 'Pattern Detection',
      actionable: true,
      suggestions: ['Create password policy guide', 'Implement onboarding checklist']
    },
    {
      id: 2,
      title: 'Email Configuration Clustering',
      description: 'Similar email setup issues across Marketing department suggest training need.',
      confidence: 87,
      impact: 'Medium',
      category: 'Clustering',
      actionable: true,
      suggestions: ['Schedule team training', 'Update email setup documentation']
    },
    {
      id: 3,
      title: 'Peak Hour Prediction',
      description: 'Ticket volume expected to increase 25% next Tuesday between 9-11 AM.',
      confidence: 79,
      impact: 'Medium',
      category: 'Forecasting',
      actionable: false,
      suggestions: ['Adjust agent schedules', 'Prepare auto-responses']
    }
  ];

  const performanceMetrics = [
    { metric: 'AI Accuracy', value: 92, target: 90, trend: '+3%' },
    { metric: 'Auto-Resolution Rate', value: 34, target: 30, trend: '+8%' },
    { metric: 'Response Time Improvement', value: 67, target: 60, trend: '+12%' },
    { metric: 'User Satisfaction', value: 88, target: 85, trend: '+5%' }
  ];

  const aiRecommendations = [
    {
      title: 'Implement Chatbot for Common Queries',
      description: '78% of tickets could be resolved automatically based on pattern analysis.',
      priority: 'High',
      effort: 'Medium',
      roi: '340%'
    },
    {
      title: 'Optimize Agent Routing',
      description: 'Smart routing could reduce resolution time by 23% based on historical data.',
      priority: 'Medium',
      effort: 'Low',
      roi: '180%'
    },
    {
      title: 'Proactive System Monitoring',
      description: 'Predictive alerts could prevent 67% of infrastructure-related tickets.',
      priority: 'High',
      effort: 'High',
      roi: '420%'
    }
  ];

  const trendData = [
    { name: 'Mon', tickets: 45, resolved: 42 },
    { name: 'Tue', tickets: 52, resolved: 48 },
    { name: 'Wed', tickets: 38, resolved: 41 },
    { name: 'Thu', tickets: 61, resolved: 55 },
    { name: 'Fri', tickets: 49, resolved: 52 },
    { name: 'Sat', tickets: 23, resolved: 25 },
    { name: 'Sun', tickets: 18, resolved: 20 }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark flex items-center">
            <Brain className="h-8 w-8 mr-3 text-frappe-primary" />
            AI Insights
          </h1>
          <p className="text-gray-600 mt-1">Intelligent analytics and recommendations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            Configure AI
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="frappe-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                <Badge className="bg-green-100 text-green-800">{metric.trend}</Badge>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-frappe-dark">{metric.value}%</span>
                <Target className="h-5 w-5 text-gray-400" />
              </div>
              <Progress value={metric.value} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">Target: {metric.target}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-frappe-dark">Detected Patterns</h3>
            <Button variant="outline" size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View All Alerts
            </Button>
          </div>
          {patternInsights.map((insight) => (
            <Card key={insight.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-frappe-dark mb-2">{insight.title}</h4>
                    <p className="text-gray-600 mb-3">{insight.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getConfidenceColor(insight.confidence)}>
                      {insight.confidence}% confidence
                    </Badge>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                </div>
                
                {insight.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">AI Suggestions:</h5>
                    <div className="space-y-1">
                      {insight.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Lightbulb className="h-4 w-4 mr-2 text-frappe-primary" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {insight.actionable && (
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                      Take Action
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-frappe-dark">Optimization Recommendations</h3>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Prioritize Actions
            </Button>
          </div>
          {aiRecommendations.map((rec, index) => (
            <Card key={index} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-frappe-dark mb-2">{rec.title}</h4>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                  </div>
                  <Badge className={rec.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Implementation Effort</p>
                    <p className="font-semibold text-frappe-dark">{rec.effort}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Expected ROI</p>
                    <p className="font-semibold text-green-600">{rec.roi}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className="font-semibold text-frappe-dark">{rec.priority}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                    Implement
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget
              title="Weekly Ticket Trends"
              type="line"
              data={trendData}
              dataKey="tickets"
              xAxisKey="name"
            />
            <ChartWidget
              title="Resolution Performance"
              type="bar"
              data={trendData}
              dataKey="resolved"
              xAxisKey="name"
            />
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="frappe-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-frappe-primary" />
                  Agent Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Workload Balance</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <Progress value={78} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Skill Matching</span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Effectiveness</span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
              </CardContent>
            </Card>

            <Card className="frappe-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-frappe-primary" />
                  Process Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-Resolution Rate</span>
                    <span className="text-sm font-semibold">34%</span>
                  </div>
                  <Progress value={34} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Response Time</span>
                    <span className="text-sm font-semibold">67%</span>
                  </div>
                  <Progress value={67} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Knowledge Base Usage</span>
                    <span className="text-sm font-semibold">56%</span>
                  </div>
                  <Progress value={56} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
