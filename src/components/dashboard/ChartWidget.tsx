
import React from 'react';
import DashboardWidget from './DashboardWidget';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ 
  title, 
  type, 
  data, 
  dataKey = 'value', 
  xAxisKey = 'name',
  colors = ['#4C5BD4', '#28A745', '#FFC107', '#DC3545']
}) => {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors[0],
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[200px]">
            <LineChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        );
      
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[200px]">
            <BarChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        );
      
      case 'pie':
        return (
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey={dataKey}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <DashboardWidget title={title} expandable exportable>
      {renderChart()}
    </DashboardWidget>
  );
};

export default ChartWidget;
