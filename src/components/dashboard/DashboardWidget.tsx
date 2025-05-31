
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Maximize2, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: boolean;
  expandable?: boolean;
  exportable?: boolean;
  configurable?: boolean;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  children,
  className,
  actions = true,
  expandable = false,
  exportable = false,
  configurable = false
}) => {
  return (
    <Card className={cn("bg-white frappe-shadow hover:frappe-shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold text-frappe-dark">
          {title}
        </CardTitle>
        {actions && (
          <div className="flex items-center space-x-1">
            {expandable && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Maximize2 className="h-4 w-4" />
              </Button>
            )}
            {exportable && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            )}
            {configurable && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardWidget;
