'use client';

import { useState, useEffect } from 'react';
import { Loan } from '@/lib/types/loan';
import { LoansTable } from './LoansTable';
import { LoansTableSkeleton } from './LoansTableSkeleton';
import { AddLoanModal } from './AddLoanModal';
import { GoalsManager } from '../goals/GoalsManager';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Skeleton } from '../ui/skeleton';
import { Plus, DollarSign, Target } from 'lucide-react';
import { toast } from 'sonner';

export function LoansManager() {
  const [activeTab, setActiveTab] = useState<'loans' | 'goals'>('loans');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load loans from localStorage
  useEffect(() => {
    const loadLoans = async () => {
      try {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const savedLoans = localStorage.getItem('eltiw-loans');
        if (savedLoans) {
          setLoans(JSON.parse(savedLoans));
        }
      } catch (error) {
        console.error('Error loading loans:', error);
        toast.error('Failed to load loans from storage');
      } finally {
        setIsLoading(false);
      }
    };

    loadLoans();
  }, []);

  // Save loans to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('eltiw-loans', JSON.stringify(loans));
    }
  }, [loans, isLoading]);

  const addLoan = (loan: Omit<Loan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLoan: Loan = {
      ...loan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLoans([...loans, newLoan]);
    setShowAddLoan(false);
  };

  const updateLoan = (id: string, updates: Partial<Loan>) => {
    setLoans(loans.map(loan => 
      loan.id === id 
        ? { ...loan, ...updates, updatedAt: new Date().toISOString() }
        : loan
    ));
    toast.success('Loan updated successfully');
  };

  const deleteLoan = (id: string) => {
    const loan = loans.find(l => l.id === id);
    setLoans(loans.filter(loan => loan.id !== id));
    toast.success(`Loan for ${loan?.borrowerName} deleted`);
  };

  const toggleLoanRepaid = (id: string) => {
    const loan = loans.find(l => l.id === id);
    setLoans(loans.map(loan => 
      loan.id === id 
        ? { ...loan, isRepaid: !loan.isRepaid, updatedAt: new Date().toISOString() }
        : loan
    ));
    
    if (loan) {
      toast.success(
        loan.isRepaid 
          ? `Loan for ${loan.borrowerName} marked as outstanding`
          : `Loan for ${loan.borrowerName} marked as repaid! 🎉`
      );
    }
  };

  const totalLoaned = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRepaid = loans.filter(loan => loan.isRepaid).reduce((sum, loan) => sum + loan.amount, 0);
  const totalOutstanding = totalLoaned - totalRepaid;
  const overdueLoans = loans.filter(loan => !loan.isRepaid && new Date(loan.deadline) < new Date()).length;

  const StatCard = ({ title, value, isLoading }: { title: string; value: string | number; isLoading?: boolean }) => (
    <div className="bg-card p-4 rounded-lg border transition-all duration-200 hover:shadow-md animate-fade-in">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      {isLoading ? (
        <Skeleton className="h-8 w-24 mt-1" />
      ) : (
        <div className="text-2xl font-bold animate-bounce-subtle">{value}</div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Tab Navigation using shadcn Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'loans' | 'goals')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loans" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Loans</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="loans" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              title="Total Loaned" 
              value={`Ksh ${totalLoaned.toLocaleString()}`} 
              isLoading={isLoading}
            />
            <StatCard 
              title="Total Repaid" 
              value={`Ksh ${totalRepaid.toLocaleString()}`} 
              isLoading={isLoading}
            />
            <StatCard 
              title="Outstanding" 
              value={`Ksh ${totalOutstanding.toLocaleString()}`} 
              isLoading={isLoading}
            />
            <StatCard 
              title="Overdue" 
              value={overdueLoans} 
              isLoading={isLoading}
            />
          </div>

          {/* Loans Table */}
          <div className="bg-card rounded-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Loan Tracking</h2>
              <Button 
                onClick={() => setShowAddLoan(true)} 
                className="flex items-center space-x-2"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
                <span>Add Loan</span>
              </Button>
            </div>
            {isLoading ? (
              <LoansTableSkeleton />
            ) : (
              <LoansTable
                loans={loans}
                onUpdate={updateLoan}
                onDelete={deleteLoan}
                onToggleRepaid={toggleLoanRepaid}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <GoalsManager />
        </TabsContent>
      </Tabs>

      {/* Add Loan Modal */}
      <AddLoanModal
        isOpen={showAddLoan}
        onAdd={addLoan}
        onClose={() => setShowAddLoan(false)}
      />
    </div>
  );
} 