import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { SavingsGoal } from '@/types';
import ProgressBar from '@/components/common/ProgressBar';
import { formatCurrency, formatPercentage, formatDaysLeft } from '@/utils/formatters';
import Card from '@/components/common/Card';
import { PiggyBank } from 'lucide-react-native';

type SavingsGoalCardProps = {
  goal: SavingsGoal;
  onPress?: () => void;
};

export default function SavingsGoalCard({ 
  goal, 
  onPress 
}: SavingsGoalCardProps) {
  const progress = goal.currentAmount / goal.targetAmount;
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="outlined" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <PiggyBank size={20} color={goal.color || Colors.secondary[500]} />
          </View>
          <Text style={styles.goalName}>{goal.name}</Text>
          {goal.deadline && (
            <View style={styles.deadlineContainer}>
              <Text style={styles.deadlineText}>
                {formatDaysLeft(goal.deadline)}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.amountRow}>
            <Text style={styles.amountText}>
              <Text style={styles.currentAmount}>
                {formatCurrency(goal.currentAmount)}
              </Text>
              {' of '}
              {formatCurrency(goal.targetAmount)}
            </Text>
            <Text style={styles.percentageText}>
              {formatPercentage(goal.currentAmount, goal.targetAmount)}
            </Text>
          </View>
          
          <ProgressBar 
            progress={progress}
            progressColor={goal.color || Colors.secondary[500]}
          />
        </View>
        
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.depositButton]}
          >
            <Text style={styles.actionButtonText}>Add Money</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  goalName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    flex: 1,
  },
  deadlineContainer: {
    backgroundColor: Colors.neutral[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deadlineText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.neutral[700],
  },
  progressContainer: {
    marginBottom: Spacing.sm,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  currentAmount: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[800],
  },
  percentageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.secondary[600],
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: Spacing.xs,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  depositButton: {
    backgroundColor: Colors.secondary[50],
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.secondary[600],
  },
});