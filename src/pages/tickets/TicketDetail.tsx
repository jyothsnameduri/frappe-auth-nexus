
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Clock, 
  User, 
  MessageCircle, 
  Paperclip, 
  Send,
  Monitor,
  Users,
  Settings,
  HelpCircle,
  Brain,
  ArrowUp,
  Link2,
  Split,
  Eye,
  EyeOff
} from 'lucide-react';

const TicketDetail = () => {
  const { ticketId } = useParams();
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('In Progress');
  const [selectedPriority, setSelectedPriority] = useState('High');

  // Mock ticket data - in real app, this would come from API
  const ticket = {
    id: 'HD-001',
    subject: 'Cannot access email account after password reset',
    description: `I recently reset my password following the company policy, but now I cannot access my email account. When I try to log in, I receive an error message saying "Invalid credentials" even though I'm using the new password.

Steps I've tried:
1. Double-checked the password spelling
2. Tried logging in from different browsers
3. Cleared browser cache and cookies
4. Waited 30 minutes for potential system propagation

The issue started this morning around 9 AM. I need access to my email urgently as I have several important client communications pending.`,
    status: 'In Progress',
    priority: 'High',
    category: 'IT',
    assignee: { name: 'John Smith', avatar: '', email: 'john.smith@company.com' },
    requester: { name: 'Alice Johnson', email: 'alice@company.com', avatar: '' },
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T14:30:00'),
    aiConfidence: 95,
    estimatedResolution: '4-8 hours',
    attachments: [
      { name: 'error-screenshot.png', size: '245 KB', url: '#' },
      { name: 'system-info.txt', size: '12 KB', url: '#' }
    ]
  };

  const activityLog = [
    {
      id: 1,
      type: 'status_change',
      user: 'System',
      avatar: '',
      timestamp: new Date('2024-01-15T14:30:00'),
      content: 'Status changed from "New" to "In Progress"',
      isInternal: false
    },
    {
      id: 2,
      type: 'assignment',
      user: 'System',
      avatar: '',
      timestamp: new Date('2024-01-15T14:25:00'),
      content: 'Ticket assigned to John Smith',
      isInternal: false
    },
    {
      id: 3,
      type: 'comment',
      user: 'John Smith',
      avatar: '',
      timestamp: new Date('2024-01-15T14:20:00'),
      content: 'I\'ve reviewed the issue and it appears to be related to our recent Active Directory update. I\'m checking with the infrastructure team to verify the password sync status.',
      isInternal: true
    },
    {
      id: 4,
      type: 'ai_suggestion',
      user: 'AI Assistant',
      avatar: '',
      timestamp: new Date('2024-01-15T10:05:00'),
      content: 'Similar issue resolved recently: HD-045. Suggested action: Check AD sync status and verify password hash propagation.',
      isInternal: true
    }
  ];

  const aiSuggestions = [
    {
      type: 'response',
      content: 'Based on similar cases, this appears to be an Active Directory synchronization issue. I recommend checking the password sync status and verifying domain controller replication.',
      confidence: 92
    },
    {
      type: 'escalation',
      content: 'Consider escalating to Tier 2 support if AD sync issues persist for more than 2 hours.',
      confidence: 85
    }
  ];

  const relatedTickets = [
    { id: 'HD-045', subject: 'Email login issues after password change', similarity: 94 },
    { id: 'HD-089', subject: 'Active Directory authentication problems', similarity: 87 },
    { id: 'HD-156', subject: 'Password reset not working', similarity: 78 }
  ];

  const categoryIcons = {
    IT: Monitor,
    HR: Users,
    Admin: Settings,
    General: HelpCircle
  };

  const CategoryIcon = categoryIcons[ticket.category];

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    // In real app, this would update via API
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In real app, this would submit via API
    console.log('Adding comment:', { content: newComment, isInternal });
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-mono font-bold text-frappe-primary">{ticket.id}</span>
                <Badge className={
                  ticket.status === 'New' ? 'bg-blue-100 text-blue-800' :
                  ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {ticket.status}
                </Badge>
                <Badge className={
                  ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                  ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {ticket.priority}
                </Badge>
                <div className="flex items-center space-x-1">
                  <CategoryIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{ticket.category}</span>
                </div>
              </div>
              <h1 className="text-xl font-semibold text-frappe-dark">{ticket.subject}</h1>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                Escalate
              </Button>
              <Button variant="outline" size="sm">
                <Link2 className="h-4 w-4 mr-1" />
                Merge
              </Button>
              <Button variant="outline" size="sm">
                <Split className="h-4 w-4 mr-1" />
                Split
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Assignee</label>
              <div className="mt-1 flex items-center space-x-2 p-2 border rounded">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ticket.assignee.avatar} />
                  <AvatarFallback className="text-xs">
                    {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{ticket.assignee.name}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <p>{ticket.createdAt.toLocaleString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <p>{ticket.updatedAt.toLocaleString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">SLA:</span>
              <p>{ticket.estimatedResolution}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">AI Confidence:</span>
              <Badge variant="secondary">{ticket.aiConfidence}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{ticket.description}</p>
              </div>

              {ticket.attachments.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                        <span className="text-sm flex-1">{attachment.name}</span>
                        <span className="text-xs text-gray-500">{attachment.size}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="text-xs">
                        {activity.user === 'System' ? 'SYS' : 
                         activity.user === 'AI Assistant' ? 'AI' :
                         activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{activity.user}</span>
                        {activity.isInternal && (
                          <Badge variant="secondary" className="text-xs">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Internal
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {activity.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{activity.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Comment */}
          <Card>
            <CardHeader>
              <CardTitle>Add Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Internal note (not visible to requester)</span>
                  </label>
                </div>
                <Textarea
                  placeholder="Add your comment or update..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                  <Button 
                    onClick={handleAddComment}
                    className="bg-frappe-primary hover:bg-frappe-primary/90"
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isInternal ? 'Add Internal Note' : 'Add Comment'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Requester</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={ticket.requester.avatar} />
                  <AvatarFallback>
                    {ticket.requester.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ticket.requester.name}</p>
                  <p className="text-sm text-gray-600">{ticket.requester.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-frappe-primary" />
                <span>AI Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-800 uppercase">
                      {suggestion.type}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.confidence}%
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700">{suggestion.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Related Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relatedTickets.map((related, index) => (
                  <div key={index} className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-gray-600">{related.id}</span>
                      <Badge variant="secondary" className="text-xs">
                        {related.similarity}%
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 truncate">{related.subject}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
