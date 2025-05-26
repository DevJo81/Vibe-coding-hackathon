import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { mockUser, mockSubscriptionPlans } from '@/constants/MockData';
import { useState } from 'react';
import { User, Bell, CreditCard, CircleHelp as HelpCircle, LogOut, Lock, ChevronRight } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatters';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Get the current subscription plan
  const currentPlan = mockSubscriptionPlans.find(
    plan => plan.name.toLowerCase() === mockUser.subscriptionType
  );
  
  // Get the premium plan
  const premiumPlan = mockSubscriptionPlans.find(plan => plan.name === 'Premium');

  return (
    <View style={styles.container}>
      <Header title="Settings" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View entering={FadeIn.delay(100).duration(400)}>
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.profileHeader}>
              {mockUser.profileImage ? (
                <Image 
                  source={{ uri: mockUser.profileImage }} 
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <User size={30} color={Colors.neutral[400]} />
                </View>
              )}
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{mockUser.name}</Text>
                <Text style={styles.profileEmail}>{mockUser.email}</Text>
                <Text style={styles.profileUniversity}>{mockUser.university}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        {/* Subscription Section */}
        <Animated.View entering={FadeIn.delay(150).duration(400)}>
          <Card variant="outlined" style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionTitle}>Your Subscription</Text>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>{currentPlan?.name}</Text>
              </View>
            </View>
            
            {mockUser.subscriptionType === 'free' && premiumPlan && (
              <View style={styles.upgradePlanContainer}>
                <Text style={styles.upgradeText}>
                  Upgrade to Premium for unlimited features
                </Text>
                
                <View style={styles.premiumFeatures}>
                  {premiumPlan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={styles.featureDot} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <Button 
                  title={`Upgrade for ${formatCurrency(premiumPlan.price)}/month`}
                  onPress={() => {}}
                  variant="primary"
                  fullWidth
                />
              </View>
            )}
          </Card>
        </Animated.View>
        
        {/* Settings Section */}
        <Animated.View entering={FadeIn.delay(200).duration(400)}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <Card variant="outlined" style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeftContent}>
                <View style={styles.settingIconContainer}>
                  <Bell size={20} color={Colors.primary[600]} />
                </View>
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
                thumbColor={Colors.white}
              />
            </View>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeftContent}>
                <View style={styles.settingIconContainer}>
                  <CreditCard size={20} color={Colors.primary[600]} />
                </View>
                <Text style={styles.settingLabel}>Payment Methods</Text>
              </View>
              
              <ChevronRight size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeftContent}>
                <View style={styles.settingIconContainer}>
                  <Lock size={20} color={Colors.primary[600]} />
                </View>
                <Text style={styles.settingLabel}>Security & Privacy</Text>
              </View>
              
              <ChevronRight size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        {/* Support Section */}
        <Animated.View entering={FadeIn.delay(250).duration(400)}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Card variant="outlined" style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeftContent}>
                <View style={styles.settingIconContainer}>
                  <HelpCircle size={20} color={Colors.primary[600]} />
                </View>
                <Text style={styles.settingLabel}>Help & Support</Text>
              </View>
              
              <ChevronRight size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        {/* Logout Button */}
        <Animated.View entering={FadeIn.delay(300).duration(400)}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Colors.error[600]} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={styles.versionText}>SmartSpend v1.0.0</Text>
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
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 2,
  },
  profileUniversity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  editProfileButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary[50],
  },
  editProfileText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
  subscriptionCard: {
    marginBottom: Spacing.md,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  subscriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  planBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.sm,
    backgroundColor: mockUser.subscriptionType === 'premium' 
      ? Colors.accent[100] 
      : Colors.neutral[100],
  },
  planBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: mockUser.subscriptionType === 'premium' 
      ? Colors.accent[800] 
      : Colors.neutral[700],
  },
  upgradePlanContainer: {
    marginTop: Spacing.sm,
  },
  upgradeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  premiumFeatures: {
    marginBottom: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent[500],
    marginRight: 8,
  },
  featureText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  settingsCard: {
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  settingItem_last: {
    borderBottomWidth: 0,
  },
  settingLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.neutral[800],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.error[50],
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.error[600],
    marginLeft: Spacing.sm,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});