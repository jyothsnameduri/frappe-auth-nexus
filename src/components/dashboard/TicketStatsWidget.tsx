
import React from 'react';
import DashboardWidget from './DashboardWidget';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TicketStatsProps {
  title: string;
  stats: {
    open: number;
    inProgress: number;
    resolved: number;
    overdue: number;
  };
  showActions?: boolean;
}

const TicketStatsWidget: React.FC<TicketStatsProps> = ({ title, stats, showActions = true }) => {
  const statusItems = [
    { label: 'Open', count: stats.open, color: 'bg-blue-100 text-blue-800', icon: Ticket },
    { label: 'In Progress', count: stats.inProgress, color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { label: 'Resolved', count: stats.resolved, color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { label: 'Overdue', count: stats.overdue, color: 'bg-red-100 text-red-800', icon: AlertCircle },
  ];

  return (
    <DashboardWidget title={title} exportable configurable>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.color.replace('text-', 'bg-').replace('800', '200')}`}>
                  <item.icon className={`h-4 w-4 ${item.color.split(' ')[1]}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="text-xl font-bold text-frappe-dark">{item.count}</span>
            </div>
          ))}
        </div>
        
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
              View All Tickets
            </Button>
            <Button size="sm" variant="outline">
              Create New
            </Button>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
};

export default TicketStatsWidget;
