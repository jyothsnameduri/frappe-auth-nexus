
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, Mail, Phone, MessageSquare, UserPlus, Filter } from 'lucide-react';

const UserDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      department: 'IT',
      role: 'Admin',
      phone: '+1 (555) 123-4567',
      isActive: true,
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john.doe@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'HR',
      role: 'Agent',
      phone: '+1 (555) 234-5678',
      isActive: true,
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily.johnson@company.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Admin',
      role: 'Employee',
      phone: '+1 (555) 345-6789',
      isActive: false,
      lastActive: '2 days ago'
    },
    {
      id: '4',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'IT',
      role: 'Agent',
      phone: '+1 (555) 456-7890',
      isActive: true,
      lastActive: '30 minutes ago'
    },
    {
      id: '5',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@company.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      department: 'General',
      role: 'Employee',
      phone: '+1 (555) 567-8901',
      isActive: true,
      lastActive: '4 hours ago'
    },
    {
      id: '6',
      name: 'David Kim',
      email: 'david.kim@company.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      department: 'HR',
      role: 'Employee',
      phone: '+1 (555) 678-9012',
      isActive: true,
      lastActive: '1 day ago'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'IT': return 'bg-blue-100 text-blue-800';
      case 'HR': return 'bg-green-100 text-green-800';
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'General': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Agent': return 'bg-blue-100 text-blue-800';
      case 'Employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white frappe-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-frappe-dark flex items-center">
                <Users className="h-6 w-6 mr-3" />
                User Directory
              </CardTitle>
              <CardDescription>
                Find and connect with team members across departments
              </CardDescription>
            </div>
            <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card className="bg-white frappe-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-200 focus:border-frappe-primary focus:ring-frappe-primary"
                />
              </div>
            </div>

            {/* Department Filter */}
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full lg:w-48 h-10">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg frappe-shadow-md">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full lg:w-48 h-10">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg frappe-shadow-md">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="lg:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white frappe-shadow hover:frappe-shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-frappe-dark truncate">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getDepartmentColor(user.department)}>
                      {user.department}
                    </Badge>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Last active: {user.lastActive}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <Card className="bg-white frappe-shadow">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or filters to find the users you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('all');
              setRoleFilter('all');
            }}>
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDirectory;
