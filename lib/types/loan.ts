export interface Loan {
  id: string;
  borrowerName: string;
  amount: number;
  deadline: string; // ISO date string
  isRepaid: boolean;
  category: LoanCategory;
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface LoanCalculations {
  totalLoaned: number;
  totalRepaid: number;
  totalOutstanding: number;
  overdueLoans: number;
  upcomingDeadlines: number;
  averageLoanAmount: number;
}

export interface LoanFormData {
  borrowerName: string;
  amount: string | number;
  deadline: string;
  category: LoanCategory;
  notes?: string;
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