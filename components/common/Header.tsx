import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';
import { User, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  backgroundColor?: string;
};

export default function Header({
  title,
  showBackButton = false,
  showProfileButton = false,
  backgroundColor = Colors.white
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color={Colors.primary[600]} size={24} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {showProfileButton && (
          <TouchableOpacity 
            onPress={() => router.push('/settings')} 
            style={styles.profileButton}
          >
            <User color={Colors.primary[600]} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  backButton: {
    padding: 4,
  },
  profileButton: {
    padding: 4,
  },
});