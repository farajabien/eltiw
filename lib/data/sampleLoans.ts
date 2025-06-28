import { Loan, LoanRepaymentPlan } from '@/lib/types/loan';

export const sampleLoans: Loan[] = [
  {
    id: '1',
    borrowerName: 'Alex Johnson',
    amount: 15000,
    amountPaid: 5000,
    deadline: '2025-03-15',
    isRepaid: false,
    category: 'personal',
    notes: 'For emergency car repairs',
    followupNotes: 'Promised to pay 5K by end of month. Very reliable.',
    nextFollowupDate: '2025-02-28',
    paymentHistory: [
      {
        id: 'p1-1',
        amount: 5000,
        date: '2025-01-20T14:30:00.000Z',
        note: 'First payment - on time',
        method: 'M-Pesa'
      }
    ],
    createdAt: '2025-01-05T10:00:00.000Z',
    updatedAt: '2025-01-20T14:30:00.000Z',
  },
  {
    id: '2',
    borrowerName: 'Sarah Mwangi',
    amount: 25000,
    amountPaid: 0,
    deadline: '2025-04-10',
    isRepaid: false,
    category: 'pressing',
    notes: 'Business loan for shop inventory',
    followupNotes: 'Check progress mid-March. Business doing well.',
    nextFollowupDate: '2025-03-15',
    paymentHistory: [],
    createdAt: '2025-01-15T09:15:00.000Z',
    updatedAt: '2025-01-15T09:15:00.000Z',
  },
  {
    id: '3',
    borrowerName: 'Mike Ochieng',
    amount: 8000,
    amountPaid: 8000,
    deadline: '2025-02-01',
    isRepaid: true,
    category: 'personal',
    notes: 'School fees for daughter',
    followupNotes: 'Fully repaid ahead of schedule! 🎉',
    paymentHistory: [
      {
        id: 'p3-1',
        amount: 3000,
        date: '2025-01-25T11:00:00.000Z',
        note: 'Partial payment',
        method: 'Bank Transfer'
      },
      {
        id: 'p3-2',
        amount: 5000,
        date: '2025-01-30T16:45:00.000Z',
        note: 'Full settlement - early!',
        method: 'Cash'
      }
    ],
    createdAt: '2025-01-10T08:20:00.000Z',
    updatedAt: '2025-01-30T16:45:00.000Z',
  },
  {
    id: '4',
    borrowerName: 'Grace Njeri',
    amount: 12000,
    amountPaid: 4000,
    deadline: '2025-05-20',
    isRepaid: false,
    category: 'other',
    notes: 'Medical bills for mother',
    followupNotes: 'Making steady payments. Very grateful.',
    nextFollowupDate: '2025-03-01',
    paymentHistory: [
      {
        id: 'p4-1',
        amount: 2000,
        date: '2025-01-18T13:20:00.000Z',
        note: 'First installment',
        method: 'M-Pesa'
      },
      {
        id: 'p4-2',
        amount: 2000,
        date: '2025-02-05T10:15:00.000Z',
        note: 'Monthly payment',
        method: 'M-Pesa'
      }
    ],
    createdAt: '2025-01-12T15:30:00.000Z',
    updatedAt: '2025-02-05T10:15:00.000Z',
  },
  {
    id: '5',
    borrowerName: 'Kevin Mutua',
    amount: 30000,
    amountPaid: 10000,
    deadline: '2025-06-30',
    isRepaid: false,
    category: 'pressing',
    notes: 'Business expansion loan - high priority',
    followupNotes: 'Business growing well. Agreed on 10K monthly payments.',
    nextFollowupDate: '2025-03-05',
    paymentHistory: [
      {
        id: 'p5-1',
        amount: 10000,
        date: '2025-02-01T09:30:00.000Z',
        note: 'First monthly payment',
        method: 'Bank Transfer'
      }
    ],
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-02-01T09:30:00.000Z',
  },
  {
    id: '6',
    borrowerName: 'Lucy Wanjiku',
    amount: 6000,
    amountPaid: 1500,
    deadline: '2025-03-30',
    isRepaid: false,
    category: 'personal',
    notes: 'Birthday party expenses',
    followupNotes: 'Casual friend - follow up gently.',
    nextFollowupDate: '2025-03-10',
    paymentHistory: [
      {
        id: 'p6-1',
        amount: 1500,
        date: '2025-02-10T19:45:00.000Z',
        note: 'Small payment',
        method: 'Cash'
      }
    ],
    createdAt: '2025-01-20T14:15:00.000Z',
    updatedAt: '2025-02-10T19:45:00.000Z',
  },
  {
    id: '7',
    borrowerName: 'David Kiprotich',
    amount: 50000,
    amountPaid: 0,
    deadline: '2025-08-15',
    isRepaid: false,
    category: 'pressing',
    notes: 'Major equipment purchase for farm',
    followupNotes: 'Harvest season in July. Payment expected then.',
    nextFollowupDate: '2025-04-01',
    paymentHistory: [],
    createdAt: '2025-01-25T11:45:00.000Z',
    updatedAt: '2025-01-25T11:45:00.000Z',
  },
];

export const sampleRepaymentPlan: LoanRepaymentPlan[] = [
  {
    month: 'March',
    income: 80000,
    budgetedExpenses: 50000,
    availableForDebt: 30000,
    paymentPlan: '• Follow up with Alex Johnson (5K expected)\n• Check Grace Njeri progress (2K monthly)\n• Kevin monthly payment (10K)',
    remainingBalances: '• Alex: 10K remaining\n• Sarah: 25K untouched\n• Grace: 8K remaining\n• Kevin: 20K remaining',
    unallocated: 13000,
    status: 'In Progress',
  },
  {
    month: 'April',
    income: 85000,
    budgetedExpenses: 52000,
    availableForDebt: 33000,
    paymentPlan: '• Sarah business check-in\n• Grace monthly (2K)\n• Kevin monthly (10K)\n• Push for Alex completion',
    remainingBalances: '• Target: Clear Alex completely\n• Sarah payment plan discussion\n• Grace: 6K remaining\n• Kevin: 10K remaining',
    unallocated: 21000,
    status: 'Planned',
  },
]; 