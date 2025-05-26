import { View, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '@/constants/Colors';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';
import { useEffect } from 'react';

type ProgressBarProps = {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  warning?: boolean;
};

export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor = Colors.neutral[200],
  progressColor = Colors.primary[500],
  warning = false
}: ProgressBarProps) {
  // Validate and clamp progress value
  const validProgress = Math.min(Math.max(0, progress), 1);
  
  // Animated value for progress
  const animatedProgress = useSharedValue(0);

  // Update animated value when progress changes
  useEffect(() => {
    animatedProgress.value = withTiming(validProgress, { duration: 500 });
  }, [validProgress]);

  // Define animated style for progress bar
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  // Determine progress color based on value and warning flag
  const getProgressColor = () => {
    if (warning) {
      if (validProgress > 0.9) return Colors.error[500];
      if (validProgress > 0.7) return Colors.warning[500];
    }
    return progressColor;
  };

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View 
        style={[
          styles.progress, 
          { backgroundColor: getProgressColor() },
          progressStyle
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});