'use client';

import { useState } from 'react';
import { useSlugStore } from '@farajabien/slug-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loan, PaymentFormData, PaymentRecord } from '@/lib/types/loan';
import { toast } from 'sonner';

interface AddPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: Loan;
}

const PAYMENT_METHODS = [
  'Cash',
  'M-Pesa',
  'Bank Transfer',
  'Cheque',
  'Other'
];

export function AddPaymentModal({ open, onOpenChange, loan }: AddPaymentModalProps) {
  const [, updateState] = useSlugStore<{ loans: Loan[] }>('loans', { loans: [] });
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: '',
    note: '',
    method: 'M-Pesa',
  });

  const remainingAmount = loan.amount - loan.amountPaid;
  const maxPayment = remainingAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentAmount = typeof formData.amount === 'string' ? parseFloat(formData.amount) : formData.amount;
    
    if (paymentAmount <= 0) {
      toast.error('Payment amount must be greater than 0');
      return;
    }
    
    if (paymentAmount > maxPayment) {
      toast.error(`Payment cannot exceed remaining amount of KES ${maxPayment.toLocaleString()}`);
      return;
    }

    const newPayment: PaymentRecord = {
      id: Date.now().toString(),
      amount: paymentAmount,
      date: new Date().toISOString(),
      note: formData.note,
      method: formData.method,
    };

    const newAmountPaid = loan.amountPaid + paymentAmount;
    const isFullyRepaid = newAmountPaid >= loan.amount;

    updateState(prev => ({
      loans: prev.loans.map(l => 
        l.id === loan.id 
          ? {
              ...l,
              amountPaid: newAmountPaid,
              isRepaid: isFullyRepaid,
              paymentHistory: [...l.paymentHistory, newPayment],
              updatedAt: new Date().toISOString(),
            }
          : l
      )
    }));

    // Show success message
    if (isFullyRepaid) {
      toast.success(`🎉 Loan from ${loan.borrowerName} fully repaid!`);
    } else {
      toast.success(`Payment of KES ${paymentAmount.toLocaleString()} recorded for ${loan.borrowerName}`);
    }

    // Reset form
    setFormData({
      amount: '',
      note: '',
      method: 'M-Pesa',
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>{loan.borrowerName}</strong></p>
            <div className="flex justify-between">
              <span>Total Loan:</span>
              <span>{formatCurrency(loan.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Paid So Far:</span>
              <span className="text-green-600">{formatCurrency(loan.amountPaid)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Remaining:</span>
              <span className="text-orange-600">{formatCurrency(remainingAmount)}</span>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Payment Amount (KES)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0"
              required
              min="1"
              max={maxPayment}
              step="1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Max: {formatCurrency(maxPayment)}
            </p>
          </div>

          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select value={formData.method} onValueChange={(value) => handleInputChange('method', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              placeholder="Additional notes about this payment..."
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 