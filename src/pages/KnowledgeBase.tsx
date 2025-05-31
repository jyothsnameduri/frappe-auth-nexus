
import React, { useState } from 'react';
import { Search, BookOpen, Plus, TrendingUp, Lightbulb, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, name: 'IT Support', count: 45, icon: '💻' },
    { id: 2, name: 'HR Policies', count: 23, icon: '👥' },
    { id: 3, name: 'Admin Procedures', count: 31, icon: '⚙️' },
    { id: 4, name: 'General FAQ', count: 67, icon: '❓' },
  ];

  const popularArticles = [
    { id: 1, title: 'How to Reset Your Password', views: 1240, category: 'IT Support', rating: 4.8 },
    { id: 2, title: 'Remote Work Policy Guidelines', views: 890, category: 'HR Policies', rating: 4.6 },
    { id: 3, title: 'Expense Reporting Process', views: 756, category: 'Admin Procedures', rating: 4.7 },
    { id: 4, title: 'VPN Connection Setup', views: 645, category: 'IT Support', rating: 4.5 },
  ];

  const recentArticles = [
    { id: 5, title: 'New Email Security Guidelines', updated: '2 hours ago', author: 'IT Team' },
    { id: 6, title: 'Updated Travel Policy', updated: '1 day ago', author: 'HR Team' },
    { id: 7, title: 'Software License Management', updated: '3 days ago', author: 'IT Team' },
  ];

  const suggestedContent = [
    { title: 'Printer Setup Guide', reason: 'Based on recent tickets' },
    { title: 'Meeting Room Booking', reason: 'Trending searches' },
    { title: 'Project Management Tools', reason: 'Department interest' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Find answers, guides, and documentation</p>
        </div>
        <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Article
        </Button>
      </div>

      {/* Search Section */}
      <Card className="frappe-shadow">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for articles, guides, or ask a question..."
              className="pl-10 pr-4 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-sm text-gray-500">Popular searches:</span>
            <Badge variant="outline">password reset</Badge>
            <Badge variant="outline">VPN setup</Badge>
            <Badge variant="outline">expense report</Badge>
            <Badge variant="outline">remote work</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-frappe-dark mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {popularArticles.map((article) => (
            <Card key={article.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-frappe-dark mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{article.views} views</span>
                      <Badge variant="outline">{article.category}</Badge>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{article.rating}</span>
                      </div>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentArticles.map((article) => (
            <Card key={article.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-frappe-dark mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Updated {article.updated}</span>
                      <span>by {article.author}</span>
                    </div>
                  </div>
                  <BookOpen className="h-5 w-5 text-frappe-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ai-suggestions" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="h-5 w-5 text-frappe-primary" />
            <h3 className="font-semibold text-frappe-dark">AI-Powered Content Suggestions</h3>
          </div>
          {suggestedContent.map((content, index) => (
            <Card key={index} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-frappe-dark mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-500">{content.reason}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Create Article
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;
