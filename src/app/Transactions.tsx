import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export const Transactions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const transactionData = [
    { id: 'TXN001', event: 'Annual Tech Conference', amount: 2500.00, date: '2026-02-11', status: 'Completed', type: 'Payment' },
    { id: 'TXN002', event: 'Marketing Workshop', amount: 850.00, date: '2026-02-10', status: 'Pending', type: 'Payment' },
    { id: 'TXN003', event: 'Product Launch Event', amount: 5000.00, date: '2026-02-09', status: 'Completed', type: 'Payment' },
    { id: 'TXN004', event: 'Team Building Activity', amount: 1200.00, date: '2026-02-08', status: 'Completed', type: 'Refund' },
    { id: 'TXN005', event: 'Client Appreciation Dinner', amount: 3500.00, date: '2026-02-07', status: 'Pending', type: 'Payment' },
  ];

  const filteredTransactions = transactionData.filter(txn => 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);

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
          <h1 className="text-2xl">Transactions Module</h1>
          <p className="text-sm text-gray-600 mt-1">
            {user?.fullName} ({user?.role})
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">{filteredTransactions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Amount</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">${totalAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">
                {filteredTransactions.filter(t => t.status === 'Pending').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Manage and track all event transactions</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono">{txn.id}</TableCell>
                    <TableCell>{txn.event}</TableCell>
                    <TableCell className="font-semibold">
                      ${txn.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>
                      <Badge variant={txn.type === 'Refund' ? 'destructive' : 'default'}>
                        {txn.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        txn.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {txn.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
