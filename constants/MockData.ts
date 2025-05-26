import { 
  User, 
  Transaction, 
  Budget, 
  SavingsGoal, 
  FinancialTip,
  SubscriptionPlan
} from '@/types';
import { Colors } from './Colors';

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Sophia Mwakasege',
  email: 'sophia.m@udsm.ac.tz',
  university: 'University of Dar es Salaam',
  subscriptionType: 'free',
  profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 350000,
    date: new Date('2025-03-15'),
    description: 'HELSB Financial Aid',
    type: 'income',
    category: 'education',
    source: 'helsb'
  },
  {
    id: '2',
    amount: 50000,
    date: new Date('2025-03-16'),
    description: 'Family Support',
    type: 'income',
    category: 'other',
    source: 'family'
  },
  {
    id: '3',
    amount: 5000,
    date: new Date('2025-03-17'),
    description: 'Lunch at Campus Cafeteria',
    type: 'expense',
    category: 'food'
  },
  {
    id: '4',
    amount: 3000,
    date: new Date('2025-03-17'),
    description: 'Bus to University',
    type: 'expense',
    category: 'transport'
  },
  {
    id: '5',
    amount: 80000,
    date: new Date('2025-03-18'),
    description: 'Hostel Rent',
    type: 'expense',
    category: 'accommodation'
  },
  {
    id: '6',
    amount: 15000,
    date: new Date('2025-03-20'),
    description: 'Textbooks',
    type: 'expense',
    category: 'education'
  },
  {
    id: '7',
    amount: 7000,
    date: new Date('2025-03-21'),
    description: 'Movie with Friends',
    type: 'expense',
    category: 'entertainment'
  },
  {
    id: '8',
    amount: 10000,
    date: new Date('2025-03-22'),
    description: 'Electricity Bill',
    type: 'expense',
    category: 'utilities'
  },
  {
    id: '9',
    amount: 8000,
    date: new Date('2025-03-24'),
    description: 'Medicine',
    type: 'expense',
    category: 'healthcare'
  },
  {
    id: '10',
    amount: 25000,
    date: new Date('2025-03-25'),
    description: 'New Shirt',
    type: 'expense',
    category: 'clothing'
  }
];

// Mock Budget Categories
export const mockBudgetCategories = [
  {
    id: '1',
    name: 'food',
    amount: 120000,
    spent: 75000,
    color: Colors.primary[500]
  },
  {
    id: '2',
    name: 'transport',
    amount: 40000,
    spent: 25000,
    color: Colors.secondary[500]
  },
  {
    id: '3',
    name: 'accommodation',
    amount: 100000,
    spent: 80000,
    color: Colors.accent[500]
  },
  {
    id: '4',
    name: 'education',
    amount: 50000,
    spent: 15000,
    color: Colors.success[700]
  },
  {
    id: '5',
    name: 'entertainment',
    amount: 30000,
    spent: 7000,
    color: Colors.warning[500]
  },
  {
    id: '6',
    name: 'utilities',
    amount: 20000,
    spent: 10000,
    color: Colors.error[500]
  },
];

// Mock Budget
export const mockBudget: Budget = {
  id: '1',
  month: 3, // March
  year: 2025,
  totalAmount: 360000,
  categories: mockBudgetCategories
};

// Mock Savings Goals
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'New Laptop',
    targetAmount: 800000,
    currentAmount: 250000,
    deadline: new Date('2025-08-01'),
    color: Colors.secondary[500]
  },
  {
    id: '2',
    name: 'Exam Prep Books',
    targetAmount: 50000,
    currentAmount: 15000,
    deadline: new Date('2025-05-15'),
    color: Colors.primary[700]
  },
  {
    id: '3',
    name: 'Semester Break Trip',
    targetAmount: 300000,
    currentAmount: 75000,
    deadline: new Date('2025-06-30'),
    color: Colors.accent[600]
  }
];

// Mock Financial Tips
export const mockFinancialTips: FinancialTip[] = [
  {
    id: '1',
    title: 'Track Every Expense',
    content: 'Make it a habit to track all your expenses, no matter how small. This helps you understand where your money goes and identify areas where you can cut back.',
    category: 'budgeting',
    dateAdded: new Date('2025-03-15'),
    isRead: false
  },
  {
    id: '2',
    title: 'Student Discount Opportunities',
    content: 'Always ask about student discounts when shopping or paying for services. Many businesses offer reduced prices for students with valid IDs.',
    category: 'saving',
    dateAdded: new Date('2025-03-16'),
    isRead: true
  },
  {
    id: '3',
    title: 'Emergency Fund Basics',
    content: 'Try to save at least TZS 50,000 as an emergency fund to cover unexpected expenses like medical bills or urgent travel.',
    category: 'saving',
    dateAdded: new Date('2025-03-17'),
    isRead: false
  },
  {
    id: '4',
    title: 'Avoid Impulse Purchases',
    content: 'Before making non-essential purchases, wait 24 hours. This cooling-off period helps you decide if you really need the item.',
    category: 'spending',
    dateAdded: new Date('2025-03-18'),
    isRead: false
  },
  {
    id: '5',
    title: 'Group Purchases for Textbooks',
    content: 'Form study groups to share textbooks and course materials, reducing individual costs while improving your study habits.',
    category: 'education',
    dateAdded: new Date('2025-03-19'),
    isRead: true
  }
];

// Mock Subscription Plans
export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic expense tracking',
      'Simple budget creation',
      'Up to 3 savings goals',
      'Weekly financial tips'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2500,
    features: [
      'Unlimited expense tracking',
      'Detailed budget analytics',
      'Unlimited savings goals',
      'Daily financial tips',
      'SMS notifications',
      'Export financial reports',
      'Budget recommendations'
    ],
    isPopular: true
  }
];