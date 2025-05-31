
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Monitor, 
  Users, 
  Settings, 
  HelpCircle, 
  Paperclip, 
  Download, 
  Brain, 
  Zap, 
  Clock,
  AlertCircle,
  CheckCircle,
  Save,
  Send
} from 'lucide-react';

interface SuggestedCategory {
  category: string;
  confidence: number;
  icon: React.ElementType;
}

interface SimilarTicket {
  id: string;
  subject: string;
  status: string;
  similarity: number;
}

const CreateTicket = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '',
    priority: '',
    department: '',
    attachments: [] as File[]
  });
  const [isDraft, setIsDraft] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  // Mock AI suggestions - in real app, these would come from API
  const suggestedCategories: SuggestedCategory[] = [
    { category: 'IT', confidence: 85, icon: Monitor },
    { category: 'HR', confidence: 65, icon: Users },
    { category: 'Admin', confidence: 45, icon: Settings }
  ];

  const similarTickets: SimilarTicket[] = [
    { id: 'HD-001', subject: 'Cannot access email account', status: 'Resolved', similarity: 92 },
    { id: 'HD-045', subject: 'Email login issues', status: 'In Progress', similarity: 87 },
    { id: 'HD-123', subject: 'Password reset for email', status: 'Resolved', similarity: 78 }
  ];

  const categoryIcons = {
    IT: Monitor,
    HR: Users,
    Admin: Settings,
    General: HelpCircle
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Critical: 'bg-red-100 text-red-800 border-red-200'
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
    // Simulate AI analysis trigger
    if (value.length > 10) {
      setShowAISuggestions(true);
    }
  };

  const handleSubmit = (isDraftSave = false) => {
    setIsDraft(isDraftSave);
    console.log('Submitting ticket:', { ...formData, isDraft: isDraftSave });
    // In real app, this would submit to API
  };

  const getSLAEstimate = () => {
    const estimates = {
      Low: '3-5 business days',
      Medium: '1-2 business days',
      High: '4-8 hours',
      Critical: '1-2 hours'
    };
    return estimates[formData.priority as keyof typeof estimates] || 'TBD';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-frappe-dark">Create New Ticket</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSubmit(false)}
            className="bg-frappe-primary hover:bg-frappe-primary/90"
            disabled={!formData.subject || !formData.description}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Ticket Details</span>
                {isDraft && <Badge variant="secondary">Draft</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  Be specific and descriptive for better AI categorization
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-4 w-4" />
                          <span>IT Support</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="HR">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Human Resources</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Admin">
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Administration</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="General">
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="h-4 w-4" />
                          <span>General</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Low</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Medium">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="High">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>High</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Critical">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Critical</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-detect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT Department</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Admin">Administration</SelectItem>
                      <SelectItem value="General">General Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue, including steps to reproduce, error messages, and any relevant context..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* File Attachments */}
              <div className="space-y-2">
                <Label>Attachments</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-frappe-primary transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload files or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                />

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SLA Information */}
              {formData.priority && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Estimated Resolution Time</span>
                  </div>
                  <p className="text-blue-700 mt-1">{getSLAEstimate()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="space-y-6">
          {showAISuggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-frappe-primary" />
                  <span>AI Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Suggested Categories</h4>
                  <div className="space-y-2">
                    {suggestedCategories.map((suggestion, index) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => setFormData(prev => ({ ...prev, category: suggestion.category }))}
                          className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-frappe-primary/10 rounded border hover:border-frappe-primary transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="text-sm">{suggestion.category}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.confidence}%
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Similar Tickets</h4>
                  <div className="space-y-2">
                    {similarTickets.map((ticket, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-600">{ticket.id}</span>
                          <Badge variant="secondary" className="text-xs">
                            {ticket.similarity}%
                          </Badge>
                        </div>
                        <p className="text-sm mt-1 truncate">{ticket.subject}</p>
                        <Badge 
                          variant={ticket.status === 'Resolved' ? 'default' : 'secondary'}
                          className="text-xs mt-1"
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-frappe-warning" />
                <span>Quick Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    subject: 'Unable to access email account',
                    description: 'I am unable to access my email account. When I try to log in, I receive an error message...'
                  }))}
                >
                  Email Access Issue
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    subject: 'Software installation request',
                    description: 'I need to install new software for my work. The software name is...'
                  }))}
                >
                  Software Installation
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    subject: 'Hardware malfunction',
                    description: 'My hardware device is not working properly. The issue started when...'
                  }))}
                >
                  Hardware Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
