import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import Card from '@/components/common/Card';
import { formatCurrency } from '@/utils/formatters';

type BalanceCardProps = {
  balance: number;
  incomesThisMonth: number;
  expensesThisMonth: number;
};

export default function BalanceCard({
  balance,
  incomesThisMonth,
  expensesThisMonth
}: BalanceCardProps) {
  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Income</Text>
          <Text style={[styles.statAmount, styles.incomeAmount]}>
            +{formatCurrency(incomesThisMonth)}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Expenses</Text>
          <Text style={[styles.statAmount, styles.expenseAmount]}>
            -{formatCurrency(expensesThisMonth)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    backgroundColor: Colors.primary[500],
    borderRadius: BorderRadius.md,
  },
  balanceContainer: {
    marginBottom: Spacing.md,
  },
  balanceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 2,
  },
  statAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  incomeAmount: {
    color: Colors.success[300],
  },
  expenseAmount: {
    color: Colors.error[300],
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: Spacing.sm,
  },
});