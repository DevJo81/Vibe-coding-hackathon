import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { mockBudget } from '@/constants/MockData';
import { formatCurrency, formatMonthYear, formatPercentage } from '@/utils/formatters';
import ProgressBar from '@/components/common/ProgressBar';
import BudgetCategoryCard from '@/components/budget/BudgetCategoryCard';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function BudgetScreen() {
  // Calculate total budget stats
  const totalBudget = mockBudget.totalAmount;
  const totalSpent = mockBudget.categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = totalSpent / totalBudget;
  
  // Format the current month/year
  const currentDate = new Date(mockBudget.year, mockBudget.month - 1);
  const monthYearText = formatMonthYear(currentDate);
  
  // Sort categories by highest percentage spent
  const sortedCategories = [...mockBudget.categories].sort(
    (a, b) => (b.spent / b.amount) - (a.spent / a.amount)
  );

  return (
    <View style={styles.container}>
      <Header title="Budget" showProfileButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Budget Overview Card */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Card variant="elevated" style={styles.overviewCard}>
            <Text style={styles.monthText}>{monthYearText} Budget</Text>
            
            <View style={styles.budgetRow}>
              <View style={styles.budgetColumn}>
                <Text style={styles.budgetLabel}>Total Budget</Text>
                <Text style={styles.budgetValue}>{formatCurrency(totalBudget)}</Text>
              </View>
              
              <View style={styles.budgetColumn}>
                <Text style={styles.budgetLabel}>Remaining</Text>
                <Text 
                  style={[
                    styles.budgetValue, 
                    remainingBudget < 0 ? styles.negativeAmount : null
                  ]}
                >
                  {formatCurrency(remainingBudget)}
                </Text>
              </View>
            </View>
            
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  {formatPercentage(totalSpent, totalBudget)} Used
                </Text>
                <Text style={styles.amountText}>
                  {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                </Text>
              </View>
              
              <ProgressBar 
                progress={budgetProgress} 
                height={10}
                warning={true}
              />
            </View>
          </Card>
        </Animated.View>
        
        {/* Actions Row */}
        <View style={styles.actionsRow}>
          <Button 
            title="Add New Category" 
            onPress={() => {}} 
            variant="outline"
            size="medium"
            style={styles.actionButton}
          />
          <Button 
            title="Edit Budget" 
            onPress={() => {}} 
            variant="primary"
            size="medium"
            style={styles.actionButton}
          />
        </View>
        
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
          
          {sortedCategories.map((category, index) => (
            <Animated.View 
              key={category.id}
              entering={FadeInUp.delay(150 + (index * 50)).duration(400)}
            >
              <BudgetCategoryCard category={category} />
            </Animated.View>
          ))}
          
          <TouchableOpacity style={styles.addCategoryButton}>
            <PlusCircle size={18} color={Colors.primary[600]} />
            <Text style={styles.addCategoryText}>Add New Category</Text>
          </TouchableOpacity>
        </View>
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
  overviewCard: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  monthText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  budgetColumn: {
    flex: 1,
  },
  budgetLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  budgetValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.neutral[800],
  },
  negativeAmount: {
    color: Colors.error[600],
  },
  progressSection: {
    marginTop: Spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  amountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  categoriesSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: Colors.primary[50],
  },
  addCategoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[600],
    marginLeft: 8,
  },
});