import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string; // Ionicons name
  iconBg: string; // Background color for icon
  category: 'course' | 'quiz' | 'security' | 'certification';
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act1',
    title: 'Completed Lesson 3',
    description: 'FlexWrap and FlexGrow properties in React Native Layouts',
    time: '2 hours ago',
    icon: 'book',
    iconBg: '#EBF8FF',
    category: 'course',
  },
  {
    id: 'act2',
    title: 'Passed Quiz: Layout Basics',
    description: 'Scored 90% (9/10 correct answers)',
    time: 'Yesterday, 4:15 PM',
    icon: 'ribbon',
    iconBg: '#FAF5FF',
    category: 'quiz',
  },
  {
    id: 'act3',
    title: 'Earned Certification',
    description: 'Unlocked "Mobile App UI Layout Architect"',
    time: 'June 3, 2026',
    icon: 'trophy',
    iconBg: '#FEFCBF',
    category: 'certification',
  },
  {
    id: 'act4',
    title: 'Security Login Attempt',
    description: 'Sign in authorized from iPhone 15 simulator',
    time: 'June 1, 2026, 9:30 AM',
    icon: 'shield-checkmark',
    iconBg: '#E6FFFA',
    category: 'security',
  },
  {
    id: 'act5',
    title: 'Enrolled in Course',
    description: 'Started: Custom Native Modules in iOS & Android',
    time: 'May 28, 2026',
    icon: 'add-circle',
    iconBg: '#EBF8FF',
    category: 'course',
  },
];

export default function RecentActivityScreen({ navigation }: any) {
  const renderActivityItem = ({ item, index }: { item: ActivityItem; index: number }) => {
    const isLast = index === MOCK_ACTIVITIES.length - 1;

    return (
      <View style={styles.activityRow}>
        {/* Timeline Column */}
        <View style={styles.timelineColumn}>
          <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
            <Ionicons
              name={item.icon as any}
              size={18}
              color={
                item.category === 'course'
                  ? COLORS.secondary
                  : item.category === 'quiz'
                  ? COLORS.accent
                  : item.category === 'certification'
                  ? COLORS.succeed
                  : COLORS.success
              }
            />
          </View>
          {/* Vertical line connection */}
          {!isLast && <View style={styles.verticalLine} />}
        </View>

        {/* Content Column */}
        <View style={styles.contentCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.activityDesc}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Activity Log</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* List */}
      <FlatList
        data={MOCK_ACTIVITIES}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineColumn: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    zIndex: 2,
  },
  verticalLine: {
    position: 'absolute',
    top: 36,
    bottom: -16,
    width: 2,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  contentCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1,
    marginRight: 8,
    fontFamily: FONTS.bold,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  activityDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
  },
});
