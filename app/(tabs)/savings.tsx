import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { mockSavingsGoals } from '@/constants/MockData';
import SavingsGoalCard from '@/components/savings/SavingsGoalCard';
import { formatCurrency } from '@/utils/formatters';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';

export default function SavingsScreen() {
  // Calculate total savings
  const totalSaved = mockSavingsGoals.reduce(
    (sum, goal) => sum + goal.currentAmount, 
    0
  );
  
  // Calculate total target
  const totalTarget = mockSavingsGoals.reduce(
    (sum, goal) => sum + goal.targetAmount, 
    0
  );

  return (
    <View style={styles.container}>
      <Header title="Savings Goals" showProfileButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Savings Summary */}
        <Animated.View entering={FadeInLeft.delay(100).duration(400)}>
          <Card variant="elevated" style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryColumn}>
                <Text style={styles.summaryLabel}>Total Saved</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalSaved)}</Text>
              </View>
              
              <View style={styles.summaryColumn}>
                <Text style={styles.summaryLabel}>Total Goals</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalTarget)}</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        {/* Create Goal Button */}
        <View style={styles.createGoalContainer}>
          <Button
            title="Create New Savings Goal"
            onPress={() => {}}
            variant="primary"
            fullWidth
          />
        </View>
        
        {/* Savings Goals List */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Your Savings Goals</Text>
          
          {mockSavingsGoals.length > 0 ? (
            mockSavingsGoals.map((goal, index) => (
              <Animated.View 
                key={goal.id}
                entering={FadeInLeft.delay(150 + (index * 50)).duration(400)}
              >
                <SavingsGoalCard goal={goal} onPress={() => {}} />
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You don't have any savings goals yet. Create your first goal to start saving!
              </Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.addGoalButton}>
            <PlusCircle size={18} color={Colors.secondary[600]} />
            <Text style={styles.addGoalText}>Add New Goal</Text>
          </TouchableOpacity>
        </View>
        
        {/* Savings Tips */}
        <Animated.View entering={FadeInLeft.delay(300).duration(400)}>
          <Card variant="outlined" style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Saving Tips</Text>
            <Text style={styles.tipText}>
              • Set aside small amounts regularly, even if it's just TZS 500 per day.
            </Text>
            <Text style={styles.tipText}>
              • Save unexpected income like gifts or refunds.
            </Text>
            <Text style={styles.tipText}>
              • Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.
            </Text>
          </Card>
        </Animated.View>
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
  summaryCard: {
    backgroundColor: Colors.secondary[500],
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryColumn: {
    flex: 1,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.white,
  },
  createGoalContainer: {
    marginBottom: Spacing.md,
  },
  goalsContainer: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  emptyContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.secondary[300],
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: Colors.secondary[50],
  },
  addGoalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.secondary[600],
    marginLeft: 8,
  },
  tipsCard: {
    backgroundColor: Colors.secondary[50],
  },
  tipsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.secondary[700],
    marginBottom: 8,
  },
  tipText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 6,
  },
});