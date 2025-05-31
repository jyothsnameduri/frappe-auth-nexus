import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  Camera,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: user?.department || 'IT' as 'IT' | 'HR' | 'Admin' | 'General',
    role: user?.role || 'Employee',
    joinDate: '2023-01-15',
    location: 'New York, NY',
    bio: 'Experienced software developer with expertise in React and TypeScript.',
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    weeklyDigest: true,
    ticketAssignments: true,
    statusChanges: false,
  });

  const recentActivity = [
    { action: 'Updated ticket HD-001', time: '2 hours ago', type: 'ticket' },
    { action: 'Created new ticket HD-005', time: '1 day ago', type: 'ticket' },
    { action: 'Updated profile information', time: '3 days ago', type: 'profile' },
    { action: 'Resolved ticket HD-003', time: '1 week ago', type: 'ticket' },
  ];

  const handleSave = () => {
    // In real app, this would make an API call
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setIsEditing(false);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getDepartmentColor = (dept: string) => {
    const colors = {
      IT: 'bg-blue-100 text-blue-800',
      HR: 'bg-green-100 text-green-800',
      Admin: 'bg-purple-100 text-purple-800',
      General: 'bg-gray-100 text-gray-800'
    };
    return colors[dept as keyof typeof colors] || colors.General;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      Employee: 'bg-green-100 text-green-800',
      Agent: 'bg-blue-100 text-blue-800',
      Admin: 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || colors.Employee;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-frappe-dark">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={handleSave} className="bg-frappe-primary hover:bg-frappe-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-frappe-dark">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className={getDepartmentColor(profileData.department)}>
                      {profileData.department}
                    </Badge>
                    <Badge className={getRoleColor(profileData.role)}>
                      {profileData.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Work Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={profileData.department}
                    onValueChange={(value: 'IT' | 'HR' | 'Admin' | 'General') => 
                      setProfileData(prev => ({ ...prev, department: value }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profileData.role}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    id="joinDate"
                    value={profileData.joinDate}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant="outline">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleNotificationChange(key as keyof typeof notifications)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Change Password</Button>
              <Separator />
              <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
              <Separator />
              <Button variant="outline" className="w-full">Download Account Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
