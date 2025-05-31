
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Monitor, 
  Users, 
  Settings, 
  HelpCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  Copy,
  Eye,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Ticket {
  id: string;
  subject: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'IT' | 'HR' | 'Admin' | 'General';
  assignee: {
    name: string;
    avatar?: string;
  };
  requester: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  aiConfidence: number;
}

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  // Mock data - in real app, this would come from API
  const tickets: Ticket[] = [
    {
      id: 'HD-001',
      subject: 'Cannot access email account after password reset',
      status: 'New',
      priority: 'High',
      category: 'IT',
      assignee: { name: 'John Smith', avatar: '' },
      requester: { name: 'Alice Johnson', email: 'alice@company.com' },
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
      aiConfidence: 95
    },
    {
      id: 'HD-002',
      subject: 'Request for annual leave approval',
      status: 'In Progress',
      priority: 'Medium',
      category: 'HR',
      assignee: { name: 'Sarah Wilson', avatar: '' },
      requester: { name: 'Bob Chen', email: 'bob@company.com' },
      createdAt: new Date('2024-01-14T14:30:00'),
      updatedAt: new Date('2024-01-15T09:15:00'),
      aiConfidence: 88
    },
    {
      id: 'HD-003',
      subject: 'Office key replacement needed',
      status: 'Resolved',
      priority: 'Low',
      category: 'Admin',
      assignee: { name: 'Mike Davis', avatar: '' },
      requester: { name: 'Carol White', email: 'carol@company.com' },
      createdAt: new Date('2024-01-13T16:45:00'),
      updatedAt: new Date('2024-01-14T11:20:00'),
      aiConfidence: 92
    }
  ];

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  };

  const categoryIcons = {
    IT: Monitor,
    HR: Users,
    Admin: Settings,
    General: HelpCircle
  };

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTickets(prev => 
      prev.length === tickets.length ? [] : tickets.map(t => t.id)
    );
  };

  const copyTicketId = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    // In real app, show toast notification
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-frappe-dark">All Tickets</h1>
        <Link to="/tickets/create">
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {selectedTickets.length > 0 && (
            <div className="mt-4 p-3 bg-frappe-primary/10 rounded-lg border border-frappe-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-frappe-primary">
                  {selectedTickets.length} ticket(s) selected
                </span>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">Assign</Button>
                  <Button size="sm" variant="outline">Update Status</Button>
                  <Button size="sm" variant="outline">Add Tags</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ticket Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-8">
                  <input
                    type="checkbox"
                    checked={selectedTickets.length === tickets.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => {
                const CategoryIcon = categoryIcons[ticket.category];
                return (
                  <TableRow key={ticket.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedTickets.includes(ticket.id)}
                        onChange={() => handleSelectTicket(ticket.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-medium">{ticket.id}</span>
                        <button
                          onClick={() => copyTicketId(ticket.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={ticket.subject}>
                        {ticket.subject}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[ticket.status]}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[ticket.priority]}>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            ticket.priority === 'Critical' ? 'bg-red-500' :
                            ticket.priority === 'High' ? 'bg-orange-500' :
                            ticket.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <span>{ticket.priority}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-4 w-4 text-gray-500" />
                        <span>{ticket.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{ticket.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{ticket.requester.name}</div>
                        <div className="text-xs text-gray-500">{ticket.requester.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(ticket.createdAt)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {ticket.aiConfidence}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketList;
