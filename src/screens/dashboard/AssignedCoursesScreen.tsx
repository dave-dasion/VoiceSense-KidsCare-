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

interface AssignedCourse {
  id: string;
  title: string;
  assignedBy: string;
  dueDate: string;
  isOverdue: boolean;
  priority: 'High' | 'Medium' | 'Low';
  duration: string;
}

const MOCK_ASSIGNED: AssignedCourse[] = [
  {
    id: 'ac1',
    title: 'Security Compliance & Data Privacy Guidelines',
    assignedBy: 'Security Ops Team',
    dueDate: '2026-06-10',
    isOverdue: false,
    priority: 'High',
    duration: '45 mins',
  },
  {
    id: 'ac2',
    title: 'Customer Outreach & Sales Empathy Training',
    assignedBy: 'Director of Growth',
    dueDate: '2026-05-30',
    isOverdue: true,
    priority: 'High',
    duration: '1.5 hours',
  },
  {
    id: 'ac3',
    title: 'Productivity Suite Integration Best Practices',
    assignedBy: 'Operations Manager',
    dueDate: '2026-06-25',
    isOverdue: false,
    priority: 'Medium',
    duration: '30 mins',
  },
];

export default function AssignedCoursesScreen({ navigation }: any) {
  const overdueCount = MOCK_ASSIGNED.filter((item) => item.isOverdue).length;

  const renderAssignedItem = ({ item }: { item: AssignedCourse }) => {
    return (
      <View style={[styles.card, item.isOverdue && styles.overdueCardBorder]}>
        <View style={styles.cardHeader}>
          <View style={[styles.priorityBadge, styles[`priority${item.priority}`]]}>
            <Ionicons
              name={item.priority === 'High' ? 'alert-circle' : 'information-circle'}
              size={12}
              color={item.priority === 'High' ? COLORS.danger : item.priority === 'Medium' ? COLORS.warning : COLORS.info}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.priorityText, styles[`priorityText${item.priority}`]]}>
              {item.priority} Priority
            </Text>
          </View>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>

        <Text style={styles.courseTitle}>{item.title}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Assigned By:</Text>
          <Text style={styles.metaValue}>{item.assignedBy}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Due Date:</Text>
          <Text style={[styles.metaValue, item.isOverdue && styles.overdueText]}>
            {item.dueDate} {item.isOverdue && '(Overdue)'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.startButton, item.isOverdue ? { backgroundColor: COLORS.danger } : { backgroundColor: COLORS.primary }]}
          onPress={() => navigation.navigate('ContinueLearning')}
        >
          <Text style={styles.startButtonText}>Start Learning Now</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Assigned Courses</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Warning Banner */}
      {overdueCount > 0 && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={20} color={COLORS.danger} style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Overdue Courses Pending</Text>
            <Text style={styles.warningDesc}>
              You have {overdueCount} critical course{overdueCount > 1 ? 's' : ''} past the completion deadline. Please finish them immediately.
            </Text>
          </View>
        </View>
      )}

      {/* List */}
      <FlatList
        data={MOCK_ASSIGNED}
        renderItem={renderAssignedItem}
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
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1,
    borderColor: 'rgba(229, 62, 98, 0.2)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.danger,
    fontFamily: FONTS.bold,
  },
  warningDesc: {
    fontSize: 11,
    color: COLORS.textDark,
    marginTop: 2,
    lineHeight: 14,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  overdueCardBorder: {
    borderColor: COLORS.danger,
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityHigh: {
    backgroundColor: COLORS.dangerLight,
  },
  priorityMedium: {
    backgroundColor: COLORS.warningLight,
  },
  priorityLow: {
    backgroundColor: COLORS.infoLight,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  priorityTextHigh: {
    color: COLORS.danger,
  },
  priorityTextMedium: {
    color: COLORS.warning,
  },
  priorityTextLow: {
    color: COLORS.info,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: FONTS.bold,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  overdueText: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  startButton: {
    marginTop: 16,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...SHADOWS.light,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
