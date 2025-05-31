
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Ticket, 
  List, 
  BookOpen, 
  BarChart, 
  Users, 
  Settings, 
  Brain,
  ChevronDown
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home, roles: ['Employee', 'Agent', 'Admin'] },
  { title: 'My Tickets', url: '/my-tickets', icon: Ticket, roles: ['Employee', 'Agent', 'Admin'] },
  { title: 'All Tickets', url: '/tickets', icon: List, roles: ['Agent', 'Admin'] },
  { title: 'Knowledge Base', url: '/knowledge', icon: BookOpen, roles: ['Employee', 'Agent', 'Admin'] },
  { title: 'Reports', url: '/reports', icon: BarChart, roles: ['Agent', 'Admin'] },
  { title: 'Users', url: '/users', icon: Users, roles: ['Agent', 'Admin'] },
  { title: 'AI Insights', url: '/ai-insights', icon: Brain, roles: ['Agent', 'Admin'] },
];

const adminItems = [
  { title: 'User Management', url: '/admin/users', icon: Users },
  { title: 'System Settings', url: '/admin/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) => 
    isActive(path) ? "bg-frappe-primary text-white font-medium" : "hover:bg-gray-100 text-gray-700";

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'Employee')
  );

  const showAdminSection = user?.role === 'Admin';

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-200">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-frappe-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">HD</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-frappe-dark">Helpdesk</h1>
                <p className="text-xs text-gray-500">AI-Powered Support</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : "px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        {showAdminSection && (
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "hidden" : "px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"}>
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${getNavCls(item.url)}`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Collapse Button */}
        <div className="mt-auto p-2">
          <SidebarTrigger className="w-full justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
