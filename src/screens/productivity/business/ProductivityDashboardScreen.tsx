import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProductivityDashboardScreen({ navigation }: any) {
  const topics = [
    {
      id: 'time',
      title: '1. Time Management',
      desc: 'Master the Eisenhower Matrix (Urgent vs Important) and apply Pomodoro focus intervals.',
      status: 'Completed',
      screen: 'TimeManagement',
      icon: 'alarm-outline',
    },
    {
      id: 'organization',
      title: '2. Workplace Organization',
      desc: 'Apply 5S methodologies (Sort, Set, Shine, Standardize, Sustain) to physical/digital spaces.',
      status: 'In Progress',
      screen: 'WorkplaceOrganization',
      icon: 'albums-outline',
    },
    {
      id: 'email',
      title: '3. Email Productivity',
      desc: 'Achieve Inbox Zero, configure email sorting filters, and draft response templates.',
      status: 'Locked',
      screen: 'EmailProductivity',
      icon: 'mail-outline',
    },
    {
      id: 'communication',
      title: '4. Business Communication',
      desc: 'Practice active listening, build meeting agendas, and compose professional communications.',
      status: 'Locked',
      screen: 'BusinessCommunication',
      icon: 'people-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Productivity Skills</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressSubtitle}>COURSE PROGRESS</Text>
            <Text style={styles.progressPercent}>25%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '25%' }]} />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1/4</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statItemBorder} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>XP Earned</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Syllabus & Modules</Text>

        {/* Topics List */}
        {topics.map((topic) => {
          const isCompleted = topic.status === 'Completed';
          const isInProgress = topic.status === 'In Progress';
          
          return (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                isInProgress && { borderColor: COLORS.secondary, borderWidth: 1.5 },
              ]}
              onPress={() => navigation.navigate(topic.screen)}
              activeOpacity={0.85}
            >
              <View style={[styles.iconBg, isCompleted ? styles.iconBgSuccess : styles.iconBgNormal]}>
                <Ionicons
                  name={topic.icon as any}
                  size={22}
                  color={isCompleted ? COLORS.success : COLORS.textDark}
                />
              </View>
              <View style={styles.topicTextContainer}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc} numberOfLines={2}>{topic.desc}</Text>
              </View>
              <View style={styles.statusIndicator}>
                {isCompleted ? (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                ) : isInProgress ? (
                  <Ionicons name="play-circle" size={20} color={COLORS.secondary} />
                ) : (
                  <Ionicons name="lock-closed" size={16} color={COLORS.textLight} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Practice and test */}
        <Text style={styles.sectionTitle}>Practice & Test</Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.ctaCard, { backgroundColor: COLORS.infoLight }]}
            onPress={() => navigation.navigate('ProductivityAssessment')}
          >
            <Ionicons name="ribbon-outline" size={24} color={COLORS.success} />
            <Text style={styles.ctaTitle}>Final Assessment</Text>
            <Text style={styles.ctaSub}>Test productivity knowledge</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statItemBorder: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    marginTop: 8,
  },
  topicCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBgSuccess: {
    backgroundColor: '#E6FFFA',
  },
  iconBgNormal: {
    backgroundColor: '#F1F5F9',
  },
  topicTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  topicDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 15,
  },
  statusIndicator: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctaCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  ctaTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
  },
  ctaSub: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
});
