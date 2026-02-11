import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Settings, Database, Users, Shield } from 'lucide-react';

export const Maintenance: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const maintenanceModules = [
    {
      title: 'System Configuration',
      description: 'Configure system-wide settings and preferences',
      icon: Settings
    },
    {
      title: 'Database Management',
      description: 'Manage database backups and optimization',
      icon: Database
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users
    },
    {
      title: 'Security Settings',
      description: 'Configure security policies and access controls',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline"
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl">Maintenance Module</h1>
          <p className="text-sm text-gray-600 mt-1">
            Admin: {user?.fullName}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This module is only accessible to administrators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenanceModules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <module.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
                <Button className="mt-4" variant="outline">
                  Configure
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
