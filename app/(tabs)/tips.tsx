import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import Header from '@/components/common/Header';
import { mockFinancialTips } from '@/constants/MockData';
import TipCard from '@/components/tips/TipCard';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function TipsScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(mockFinancialTips.map(tip => tip.category))];
  
  // Filter tips by category
  const filteredTips = activeCategory === 'all' 
    ? mockFinancialTips 
    : mockFinancialTips.filter(tip => tip.category === activeCategory);

  return (
    <View style={styles.container}>
      <Header title="Financial Tips" showProfileButton />
      
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tipsCount}>
          {filteredTips.length} {filteredTips.length === 1 ? 'tip' : 'tips'} available
        </Text>
        
        {filteredTips.map((tip, index) => (
          <Animated.View
            key={tip.id}
            entering={FadeInRight.delay(100 + (index * 50)).duration(400)}
          >
            <TipCard tip={tip} onSave={(id) => console.log('Saved tip:', id)} />
          </Animated.View>
        ))}
        
        {filteredTips.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tips available for this category. Check back later!
            </Text>
          </View>
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
  categoryContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  categoryScrollContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  activeCategoryText: {
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  tipsCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});