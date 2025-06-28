'use client';

import { useState } from 'react';
import { Loan, LOAN_CATEGORIES, LoanFormData } from '@/lib/types/loan';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';

interface AddLoanModalProps {
  isOpen: boolean;
  onAdd: (loan: Omit<Loan, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export function AddLoanModal({ isOpen, onAdd, onClose }: AddLoanModalProps) {
  const [formData, setFormData] = useState<LoanFormData>({
    borrowerName: '',
    amount: '',
    deadline: '',
    category: 'pressing',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.borrowerName || !formData.amount || !formData.deadline) {
        toast.error('Please fill in all required fields');
        return;
      }

      const amount = typeof formData.amount === 'string' ? parseFloat(formData.amount) : formData.amount;
      
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      onAdd({
        borrowerName: formData.borrowerName,
        amount,
        deadline: formData.deadline,
        category: formData.category,
        notes: formData.notes,
        isRepaid: false,
      });

      // Reset form
      setFormData({
        borrowerName: '',
        amount: '',
        deadline: '',
        category: 'pressing',
        notes: '',
      });

      toast.success(`Loan for ${formData.borrowerName} added successfully!`);
      onClose();
    } catch {
      toast.error('Failed to add loan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LoanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Loan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrowerName">Borrower Name *</Label>
            <Input
              id="borrowerName"
              value={formData.borrowerName}
              onChange={(e) => handleInputChange('borrowerName', e.target.value)}
              placeholder="Enter borrower's name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Ksh) *</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LOAN_CATEGORIES).map(([key, { label, emoji }]) => (
                  <SelectItem key={key} value={key}>
                    {emoji} {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Loan'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 