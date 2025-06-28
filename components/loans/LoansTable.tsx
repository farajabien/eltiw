'use client';

import { useState } from 'react';
import { Loan, LOAN_CATEGORIES, LoanCategory } from '@/lib/types/loan';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Edit, Trash2, AlertTriangle, DollarSign } from 'lucide-react';

interface LoansTableProps {
  loans: Loan[];
  onUpdate: (id: string, updates: Partial<Loan>) => void;
  onDelete: (id: string) => void;
  onToggleRepaid: (id: string) => void;
}

export function LoansTable({ loans, onUpdate, onDelete, onToggleRepaid }: LoansTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Loan>>({});

  const startEdit = (loan: Loan) => {
    setEditingId(loan.id);
    setEditForm(loan);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      onUpdate(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (loan: Loan) => {
    if (loan.isRepaid) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Repaid</Badge>;
    }
    
    const overdue = isOverdue(loan.deadline);
    if (overdue) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    
    return <Badge variant="secondary">Outstanding</Badge>;
  };

  const getCategoryBadge = (category: LoanCategory) => {
    const { label, emoji, color } = LOAN_CATEGORIES[category];
    return (
      <Badge variant="outline" className={color}>
        {emoji} {label}
      </Badge>
    );
  };

  if (loans.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-muted-foreground mb-4">
          <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">No loans yet</h3>
          <p className="text-sm">Start tracking your loans by adding the first one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Borrower</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Days Left</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => {
            const daysRemaining = getDaysRemaining(loan.deadline);
            const overdue = isOverdue(loan.deadline);
            
            return (
              <TableRow key={loan.id}>
                <TableCell>
                  <button
                    onClick={() => onToggleRepaid(loan.id)}
                    className="flex items-center space-x-2 hover:opacity-80"
                  >
                    {getStatusBadge(loan)}
                  </button>
                </TableCell>
                
                <TableCell>
                  {editingId === loan.id ? (
                    <Input
                      value={editForm.borrowerName || ''}
                      onChange={(e) => setEditForm({ ...editForm, borrowerName: e.target.value })}
                      className="h-8"
                    />
                  ) : (
                    <span className="font-medium">{loan.borrowerName}</span>
                  )}
                </TableCell>
                
                <TableCell>
                  {editingId === loan.id ? (
                    <Input
                      type="number"
                      value={editForm.amount || ''}
                      onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                      className="h-8"
                    />
                  ) : (
                    <span className="font-mono">{formatAmount(loan.amount)}</span>
                  )}
                </TableCell>
                
                <TableCell>
                  {editingId === loan.id ? (
                    <Select 
                      value={editForm.category || ''} 
                      onValueChange={(value) => setEditForm({ ...editForm, category: value as LoanCategory })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(LOAN_CATEGORIES).map(([key, { label, emoji }]) => (
                          <SelectItem key={key} value={key}>
                            {emoji} {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    getCategoryBadge(loan.category)
                  )}
                </TableCell>
                
                <TableCell>
                  {editingId === loan.id ? (
                    <Input
                      type="date"
                      value={editForm.deadline || ''}
                      onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                      className="h-8"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{formatDate(loan.deadline)}</span>
                      {overdue && !loan.isRepaid && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </TableCell>
                
                <TableCell>
                  <span className={`text-sm ${overdue && !loan.isRepaid ? 'text-red-600 font-medium' : ''}`}>
                    {loan.isRepaid ? 'N/A' : daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days`}
                  </span>
                </TableCell>
                
                <TableCell>
                  {editingId === loan.id ? (
                    <Textarea
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      placeholder="Add notes..."
                      className="min-h-8 h-8 resize-none"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground max-w-xs truncate block">
                      {loan.notes || '-'}
                    </span>
                  )}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {editingId === loan.id ? (
                      <>
                        <Button size="sm" onClick={saveEdit} className="h-8 px-2">
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="h-8 px-2">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(loan)}
                          className="h-8 px-2"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the loan for ${loan.borrowerName}?`)) {
                              onDelete(loan.id);
                            }
                          }}
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
} 