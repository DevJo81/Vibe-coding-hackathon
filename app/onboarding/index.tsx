import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Dimensions,
  Image
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import Button from '@/components/common/Button';
import Animated, { 
  FadeIn,
  FadeInRight,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Smart Financial Tracking',
    description: 'Track your finances, monitor expenses, and manage your financial aid with ease.',
    image: 'https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Budget Like a Pro',
    description: 'Set up budgets for different categories and get alerts when you are approaching limits.',
    image: 'https://images.pexels.com/photos/7821620/pexels-photo-7821620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Achieve Your Savings Goals',
    description: 'Create and track savings goals for textbooks, rent, or future plans.',
    image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Financial Wisdom at Your Fingertips',
    description: 'Get personalized financial tips designed specifically for students in Tanzania.',
    image: 'https://images.pexels.com/photos/7841788/pexels-photo-7841788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const progressValue = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
      setCurrentIndex(currentIndex + 1);
      progressValue.value = withTiming((currentIndex + 1) / (onboardingData.length - 1));
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true
      });
      setCurrentIndex(currentIndex - 1);
      progressValue.value = withTiming((currentIndex - 1) / (onboardingData.length - 1));
    }
  };

  const handleFinish = () => {
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`
    };
  });

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </View>
        <View style={styles.contentContainer}>
          <Animated.Text 
            entering={FadeInRight.duration(500)} 
            style={styles.title}
          >
            {item.title}
          </Animated.Text>
          <Animated.Text 
            entering={FadeInRight.delay(200).duration(500)} 
            style={styles.description}
          >
            {item.description}
          </Animated.Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SmartSpend</Text>
        </View>
        
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
      />
      
      <Animated.View entering={FadeIn.duration(500)} style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progress, progressStyle]} />
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          {currentIndex > 0 ? (
            <Animated.View entering={FadeInLeft.duration(300)}>
              <Button
                title="Back"
                onPress={handleBack}
                variant="outline"
                size="medium"
                style={styles.backButton}
              />
            </Animated.View>
          ) : (
            <View style={styles.emptyButton} />
          )}
          
          <Button
            title={currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            variant="primary"
            size="medium"
            style={styles.nextButton}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.primary[600],
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary[500],
  },
  slide: {
    width,
    flex: 1,
  },
  imageContainer: {
    height: '60%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    padding: Spacing.lg,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.full,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: BorderRadius.full,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 120,
  },
  nextButton: {
    width: 120,
  },
  emptyButton: {
    width: 120,
  },
});