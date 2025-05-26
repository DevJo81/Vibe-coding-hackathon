import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import BalanceCard from '@/components/dashboard/BalanceCard';
import { mockTransactions, mockBudget, mockSavingsGoals, mockFinancialTips, mockUser } from '@/constants/MockData';
import { FinancialTip, SavingsGoal, Transaction } from '@/types';
import { formatCurrency, formatDate, formatPercentage } from '@/utils/formatters';
import ProgressBar from '@/components/common/ProgressBar';
import { CirclePlus as PlusCircle, TrendingUp, Bell } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [incomesThisMonth, setIncomesThisMonth] = useState(0);
  const [expensesThisMonth, setExpensesThisMonth] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [topSavingsGoal, setTopSavingsGoal] = useState<SavingsGoal | null>(null);
  const [tip, setTip] = useState<FinancialTip | null>(null);

  useEffect(() => {
    // Calculate financial statistics
    const incomes = mockTransactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
    
    const expenses = mockTransactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
    
    setBalance(incomes - expenses);
    setIncomesThisMonth(incomes);
    setExpensesThisMonth(expenses);
    
    // Get recent transactions (last 3)
    setRecentTransactions(mockTransactions.slice(0, 3));
    
    // Get top savings goal (most progress)
    if (mockSavingsGoals.length > 0) {
      const sortedGoals = [...mockSavingsGoals].sort((a, b) => 
        (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount)
      );
      setTopSavingsGoal(sortedGoals[0]);
    }
    
    // Get random unread tip
    const unreadTips = mockFinancialTips.filter(t => !t.isRead);
    if (unreadTips.length > 0) {
      const randomTip = unreadTips[Math.floor(Math.random() * unreadTips.length)];
      setTip(randomTip);
    } else {
      setTip(mockFinancialTips[0]);
    }
  }, []);

  // Calculate budget usage
  const totalBudget = mockBudget.totalAmount;
  const totalSpent = mockBudget.categories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetProgress = totalSpent / totalBudget;

  return (
    <View style={styles.container}>
      <Header title="SmartSpend" showProfileButton />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>Hello, {mockUser.name.split(' ')[0]}</Text>
            <Text style={styles.subtitle}>Let's manage your finances</Text>
          </View>
        </Animated.View>
        
        {/* Balance Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <BalanceCard 
            balance={balance}
            incomesThisMonth={incomesThisMonth}
            expensesThisMonth={expensesThisMonth}
          />
        </Animated.View>
        
        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <PlusCircle size={24} color={Colors.primary[500]} />
              </View>
              <Text style={styles.actionText}>Add Transaction</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <TrendingUp size={24} color={Colors.primary[500]} />
              </View>
              <Text style={styles.actionText}>View Analysis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Bell size={24} color={Colors.primary[500]} />
              </View>
              <Text style={styles.actionText}>Alerts</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Budget Status */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <Card variant="outlined" style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Monthly Budget</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetText}>
                <Text style={styles.highlightText}>{formatCurrency(totalSpent)}</Text> of {formatCurrency(totalBudget)}
              </Text>
              
              <Text style={styles.percentageText}>
                {formatPercentage(totalSpent, totalBudget)}
              </Text>
            </View>
            
            <ProgressBar 
              progress={budgetProgress} 
              height={10}
              warning={true}
            />
          </Card>
        </Animated.View>
        
        {/* Savings Goal */}
        {topSavingsGoal && (
          <Animated.View entering={FadeInDown.delay(500).duration(500)}>
            <Card variant="outlined" style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Savings Goal</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionAction}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.goalName}>{topSavingsGoal.name}</Text>
              
              <View style={styles.goalProgress}>
                <Text style={styles.goalText}>
                  <Text style={styles.highlightText}>
                    {formatCurrency(topSavingsGoal.currentAmount)}
                  </Text> of {formatCurrency(topSavingsGoal.targetAmount)}
                </Text>
                
                <Text style={styles.percentageText}>
                  {formatPercentage(topSavingsGoal.currentAmount, topSavingsGoal.targetAmount)}
                </Text>
              </View>
              
              <ProgressBar 
                progress={topSavingsGoal.currentAmount / topSavingsGoal.targetAmount} 
                height={10}
                progressColor={Colors.secondary[500]}
              />
            </Card>
          </Animated.View>
        )}
        
        {/* Recent Transactions */}
        <Animated.View entering={FadeInDown.delay(600).duration(500)}>
          <Card variant="outlined" style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
                
                <Text 
                  style={[
                    styles.transactionAmount,
                    transaction.type === 'income' 
                      ? styles.incomeText 
                      : styles.expenseText
                  ]}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </Text>
              </View>
            ))}
          </Card>
        </Animated.View>
        
        {/* Financial Tip */}
        {tip && (
          <Animated.View entering={FadeInDown.delay(700).duration(500)}>
            <Card variant="elevated" style={styles.tipCard}>
              <Text style={styles.tipTitle}>💡 Financial Tip</Text>
              <Text style={styles.tipContent}>{tip.content}</Text>
            </Card>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  greetingSection: {
    marginBottom: Spacing.md,
  },
  greeting: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.neutral[800],
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  sectionCard: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  sectionAction: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  budgetText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  highlightText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[800],
  },
  percentageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
  goalName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  goalProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  goalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  transactionItem_last: {
    borderBottomWidth: 0,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  transactionAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  incomeText: {
    color: Colors.success[600],
  },
  expenseText: {
    color: Colors.error[600],
  },
  tipCard: {
    backgroundColor: Colors.primary[50],
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },
  tipTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
    marginBottom: 8,
  },
  tipContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    lineHeight: 20,
  },
});