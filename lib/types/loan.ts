export interface Loan {
  id: string;
  borrowerName: string;
  amount: number;
  amountPaid: number; // Track how much has been paid
  deadline: string; // ISO date string
  isRepaid: boolean;
  category: LoanCategory;
  notes?: string;
  followupNotes?: string; // For promises and follow-up reminders
  nextFollowupDate?: string; // When to check again
  paymentHistory: PaymentRecord[]; // Track all payments
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string; // ISO date string
  note?: string;
  method?: string; // Cash, Bank Transfer, etc.
}

export interface LoanCalculations {
  totalLoaned: number;
  totalRepaid: number;
  totalOutstanding: number;
  overdueLoans: number;
  upcomingDeadlines: number;
  averageLoanAmount: number;
  upcomingFollowups: number;
}

export interface LoanFormData {
  borrowerName: string;
  amount: string | number;
  deadline: string;
  category: LoanCategory;
  notes?: string;
  followupNotes?: string;
  nextFollowupDate?: string;
}

export interface PaymentFormData {
  amount: string | number;
  note?: string;
  method?: string;
}

export type LoanCategory = 
  | "pressing"
  | "other"
  | "personal";

export const LOAN_CATEGORIES: Record<LoanCategory, { label: string; emoji: string; color: string }> = {
  pressing: { label: "Pressing Loans", emoji: "🚨", color: "text-pressing" },
  other: { label: "Other Loans", emoji: "📋", color: "text-other" },
  personal: { label: "Personal Loans", emoji: "👤", color: "text-personal" },
};

export interface LoanRepaymentPlan {
  month: string;
  income: number;
  budgetedExpenses: number;
  availableForDebt: number;
  paymentPlan: string;
  remainingBalances: string;
  unallocated: number;
  status: string;
} 