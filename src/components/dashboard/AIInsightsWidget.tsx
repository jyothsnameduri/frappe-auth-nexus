
import React from 'react';
import DashboardWidget from './DashboardWidget';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'pattern' | 'prediction' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

const AIInsightsWidget: React.FC = () => {
  const insights: AIInsight[] = [
    {
      id: '1',
      type: 'pattern',
      title: 'Peak Hour Detection',
      description: 'Most tickets are created between 9-11 AM. Consider increasing staff during these hours.',
      confidence: 92,
      actionable: true,
      priority: 'High'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Knowledge Base Gap',
      description: 'Login issues account for 35% of tickets. A self-service guide could reduce workload.',
      confidence: 88,
      actionable: true,
      priority: 'Medium'
    },
    {
      id: '3',
      type: 'prediction',
      title: 'Ticket Volume Forecast',
      description: 'Expected 15% increase in tickets next week due to system update.',
      confidence: 76,
      actionable: false,
      priority: 'Medium'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Response Time Alert',
      description: 'Average response time increased by 20% this week.',
      confidence: 95,
      actionable: true,
      priority: 'High'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return TrendingUp;
      case 'prediction': return Target;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      default: return Brain;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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
    <DashboardWidget title="AI Insights" exportable configurable>
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div key={insight.id} className="p-4 rounded-lg border border-gray-200 hover:border-frappe-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-frappe-primary" />
                  <h4 className="font-semibold text-frappe-dark">{insight.title}</h4>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getConfidenceColor(insight.confidence)}>
                    {insight.confidence}% confidence
                  </Badge>
                  <Badge className={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              {insight.actionable && (
                <Button size="sm" variant="outline" className="text-frappe-primary border-frappe-primary">
                  Take Action
                </Button>
              )}
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            View All AI Insights
          </Button>
        </div>
      </div>
    </DashboardWidget>
  );
};

export default AIInsightsWidget;
