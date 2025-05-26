import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import { BudgetCategory } from '@/types';
import ProgressBar from '@/components/common/ProgressBar';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import Card from '@/components/common/Card';

type BudgetCategoryCardProps = {
  category: BudgetCategory;
};

export default function BudgetCategoryCard({ category }: BudgetCategoryCardProps) {
  const progress = category.spent / category.amount;
  const isOverBudget = progress > 1;
  
  // Format category name to be title case
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.categoryName}>
          {formatCategoryName(category.name)}
        </Text>
        <Text 
          style={[
            styles.statusText,
            isOverBudget ? styles.overBudgetText : styles.withinBudgetText
          ]}
        >
          {isOverBudget ? 'Over Budget' : 'Within Budget'}
        </Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.spentText}>
          <Text style={styles.spentAmount}>{formatCurrency(category.spent)}</Text>
          {' of '}
          {formatCurrency(category.amount)}
        </Text>
        <Text style={styles.percentageText}>
          {formatPercentage(category.spent, category.amount)}
        </Text>
      </View>

      <ProgressBar 
        progress={Math.min(progress, 1)}
        progressColor={category.color || Colors.primary[500]}
        warning={true}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  withinBudgetText: {
    backgroundColor: Colors.success[50],
    color: Colors.success[700],
  },
  overBudgetText: {
    backgroundColor: Colors.error[50],
    color: Colors.error[700],
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  spentAmount: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[800],
  },
  percentageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
});