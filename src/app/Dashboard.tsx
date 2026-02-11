import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { User, Settings, FileText, Receipt, LogOut } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    ...(user?.role === 'admin' ? [{
      title: 'Maintenance',
      description: 'Manage system settings and configuration',
      icon: Settings,
      path: '/maintenance',
      adminOnly: true
    }] : []),
    {
      title: 'Reports',
      description: 'View and generate reports',
      icon: FileText,
      path: '/reports',
      adminOnly: false
    },
    {
      title: 'Transactions',
      description: 'Manage transactions and records',
      icon: Receipt,
      path: '/transactions',
      adminOnly: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl">Event Management System</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {user?.fullName} ({user?.role})
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl mb-2">Dashboard</h2>
          <p className="text-gray-600">Select a module to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.path}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.adminOnly && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Admin Only
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Full Name:</strong> {user?.fullName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  <strong>Email:</strong> {user?.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  <strong>Username:</strong> {user?.username}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  <strong>Role:</strong> {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
