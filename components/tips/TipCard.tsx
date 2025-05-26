import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { FinancialTip } from '@/types';
import Card from '@/components/common/Card';
import { formatDate } from '@/utils/formatters';
import { Lightbulb, Bookmark } from 'lucide-react-native';
import { useState } from 'react';

type TipCardProps = {
  tip: FinancialTip;
  onSave?: (tipId: string) => void;
};

export default function TipCard({ tip, onSave }: TipCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(!saved);
    if (onSave) {
      onSave(tip.id);
    }
  };

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Lightbulb size={18} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>{tip.title}</Text>
        </View>
        
        <TouchableOpacity onPress={handleSave}>
          <Bookmark 
            size={20} 
            color={saved ? Colors.accent[500] : Colors.neutral[400]} 
            fill={saved ? Colors.accent[500] : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <Text 
        style={[
          styles.content,
          expanded ? styles.expandedContent : styles.collapsedContent
        ]}
        numberOfLines={expanded ? undefined : 3}
      >
        {tip.content}
      </Text>
      
      {tip.content.length > 120 && (
        <TouchableOpacity 
          onPress={() => setExpanded(!expanded)}
          style={styles.expandButton}
        >
          <Text style={styles.expandText}>
            {expanded ? 'Read less' : 'Read more'}
          </Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.category}>{tip.category}</Text>
        <Text style={styles.date}>{formatDate(tip.dateAdded)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    flex: 1,
  },
  content: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    lineHeight: 20,
  },
  collapsedContent: {
    marginBottom: 4,
  },
  expandedContent: {
    marginBottom: Spacing.sm,
  },
  expandButton: {
    marginBottom: Spacing.sm,
  },
  expandText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  category: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.neutral[600],
    backgroundColor: Colors.neutral[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
});