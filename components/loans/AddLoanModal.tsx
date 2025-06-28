'use client';

import { useState } from 'react';
import { useSlugStore } from '@farajabien/slug-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loan, LoanFormData, LOAN_CATEGORIES } from '@/lib/types/loan';

interface AddLoanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLoanModal({ open, onOpenChange }: AddLoanModalProps) {
  const [, updateState] = useSlugStore<{ loans: Loan[] }>('loans', { loans: [] });
  const [formData, setFormData] = useState<LoanFormData>({
    borrowerName: '',
    amount: '',
    deadline: '',
    category: 'personal',
    notes: '',
    followupNotes: '',
    nextFollowupDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLoan: Loan = {
      id: Date.now().toString(),
      borrowerName: formData.borrowerName,
      amount: typeof formData.amount === 'string' ? parseFloat(formData.amount) : formData.amount,
      amountPaid: 0,
      deadline: formData.deadline,
      isRepaid: false,
      category: formData.category,
      notes: formData.notes,
      followupNotes: formData.followupNotes,
      nextFollowupDate: formData.nextFollowupDate,
      paymentHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    updateState(prev => ({
      loans: [...prev.loans, newLoan]
    }));

    // Reset form
    setFormData({
      borrowerName: '',
      amount: '',
      deadline: '',
      category: 'personal',
      notes: '',
      followupNotes: '',
      nextFollowupDate: '',
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof LoanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Loan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="borrowerName">Borrower Name</Label>
              <Input
                id="borrowerName"
                value={formData.borrowerName}
                onChange={(e) => handleInputChange('borrowerName', e.target.value)}
                placeholder="Enter borrower's name"
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0"
                required
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LOAN_CATEGORIES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.emoji} {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Purpose of loan, terms, etc."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="followupNotes">Follow-up Notes</Label>
            <Textarea
              id="followupNotes"
              value={formData.followupNotes}
              onChange={(e) => handleInputChange('followupNotes', e.target.value)}
              placeholder="Repayment promises, relationship notes, etc."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="nextFollowupDate">Next Follow-up Date</Label>
            <Input
              id="nextFollowupDate"
              type="date"
              value={formData.nextFollowupDate}
              onChange={(e) => handleInputChange('nextFollowupDate', e.target.value)}
              placeholder="When to check in next"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Loan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 