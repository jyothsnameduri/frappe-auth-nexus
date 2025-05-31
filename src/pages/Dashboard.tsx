
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import AgentDashboard from './dashboards/AgentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  switch (user?.role) {
    case 'Agent':
      return <AgentDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    case 'Employee':
    default:
      return <EmployeeDashboard />;
  }
};

export default Dashboard;
