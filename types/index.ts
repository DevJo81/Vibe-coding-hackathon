// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  subscriptionType: 'free' | 'premium';
  profileImage?: string;
}

// Transaction Types
export type TransactionCategory = 
  | 'food' 
  | 'transport' 
  | 'accommodation' 
  | 'education' 
  | 'entertainment' 
  | 'utilities' 
  | 'healthcare' 
  | 'clothing' 
  | 'other';

export type TransactionType = 'income' | 'expense';

export type IncomeSource = 
  | 'helsb' 
  | 'family' 
  | 'scholarship' 
  | 'job' 
  | 'business' 
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: TransactionType;
  category: TransactionCategory;
  source?: IncomeSource;
}

// Budget Types
export interface BudgetCategory {
  id: string;
  name: TransactionCategory;
  amount: number;
  spent: number;
  icon?: string;
  color?: string;
}

export interface Budget {
  id: string;
  month: number;
  year: number;
  totalAmount: number;
  categories: BudgetCategory[];
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  icon?: string;
  color?: string;
}

// Financial Tip Types
export interface FinancialTip {
  id: string;
  title: string;
  content: string;
  category: string;
  dateAdded: Date;
  isRead: boolean;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: 'Free' | 'Premium';
  price: number;
  features: string[];
  isPopular?: boolean;
}