'use client';

import { useState } from 'react';
import { Loan, LOAN_CATEGORIES, LoanCategory } from '@/lib/types/loan';
import { AddPaymentModal } from './AddPaymentModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { 
  Edit, 
  Trash2, 
  AlertTriangle, 
  DollarSign, 
  Plus, 
  MoreHorizontal,
  History,
  CheckCircle2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface LoansTableProps {
  loans: Loan[];
  onUpdate: (id: string, updates: Partial<Loan>) => void;
  onDelete: (id: string) => void;
  onToggleRepaid: (id: string) => void;
}

export function LoansTable({ loans, onUpdate, onDelete, onToggleRepaid }: LoansTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Loan>>({});
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

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

  const openPaymentModal = (loan: Loan) => {
    setSelectedLoan(loan);
    setPaymentModalOpen(true);
  };

  const openHistoryModal = (loan: Loan) => {
    setSelectedLoan(loan);
    setHistoryModalOpen(true);
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
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
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
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Repaid
      </Badge>;
    }
    
    const overdue = isOverdue(loan.deadline);
    if (overdue) {
      return <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Overdue
      </Badge>;
    }
    
    const paymentProgress = (loan.amountPaid / loan.amount) * 100;
    if (paymentProgress > 0) {
      return <Badge className="bg-blue-100 text-blue-800">
        Partial ({paymentProgress.toFixed(0)}%)
      </Badge>;
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
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Borrower</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Days Left</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => {
              const daysRemaining = getDaysRemaining(loan.deadline);
              const overdue = isOverdue(loan.deadline);
              const paymentProgress = (loan.amountPaid / loan.amount) * 100;
              const remainingAmount = loan.amount - loan.amountPaid;
              
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
                      <div>
                        <span className="font-medium">{loan.borrowerName}</span>
                        {loan.followupNotes && (
                          <div className="text-xs text-gray-500 truncate max-w-32">
                            {loan.followupNotes}
                          </div>
                        )}
                      </div>
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
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-green-600">
                        {formatAmount(loan.amountPaid)}
                      </div>
                      {!loan.isRepaid && remainingAmount > 0 && (
                        <div className="text-xs text-gray-500">
                          {formatAmount(remainingAmount)} left
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1 min-w-16">
                      <div className="text-xs text-right">
                        {paymentProgress.toFixed(0)}%
                      </div>
                      <Progress 
                        value={Math.min(paymentProgress, 100)} 
                        className="h-2"
                      />
                    </div>
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
                    {loan.nextFollowupDate && (
                      <div className="text-xs">
                        <div className="text-gray-500">Next:</div>
                        <div className={`font-medium ${
                          new Date(loan.nextFollowupDate) <= new Date() 
                            ? 'text-orange-600' 
                            : 'text-gray-700'
                        }`}>
                          {formatDate(loan.nextFollowupDate)}
                        </div>
                      </div>
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
                          {!loan.isRepaid && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openPaymentModal(loan)}
                              className="h-8 px-2"
                              title="Add Payment"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openPaymentModal(loan)}>
                                <Plus className="h-3 w-3 mr-2" />
                                Add Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openHistoryModal(loan)}>
                                <History className="h-3 w-3 mr-2" />
                                Payment History
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => startEdit(loan)}>
                                <Edit className="h-3 w-3 mr-2" />
                                Edit Loan
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete the loan for ${loan.borrowerName}?`)) {
                                    onDelete(loan.id);
                                  }
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Payment Modal */}
      {selectedLoan && (
        <AddPaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          loan={selectedLoan}
        />
      )}

      {/* Payment History Modal */}
      {selectedLoan && (
        <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment History</DialogTitle>
              <div className="text-sm text-muted-foreground">
                {selectedLoan.borrowerName}
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatAmount(selectedLoan.amount)}</div>
                  <div className="text-sm text-gray-600">Total Loan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatAmount(selectedLoan.amountPaid)}</div>
                  <div className="text-sm text-gray-600">Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{formatAmount(selectedLoan.amount - selectedLoan.amountPaid)}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>

              {/* Payment History */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedLoan.paymentHistory.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No payments recorded yet</p>
                ) : (
                  selectedLoan.paymentHistory
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-green-600">
                            +{formatAmount(payment.amount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(payment.date)} • {payment.method}
                          </div>
                          {payment.note && (
                            <div className="text-sm text-gray-600 mt-1">
                              {payment.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
} 