import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ChartDay {
  day: string;
  hours: number;
}

const WEEK_DATA: ChartDay[] = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 0.8 },
  { day: 'Thu', hours: 3.2 },
  { day: 'Fri', hours: 1.2 },
  { day: 'Sat', hours: 4.0 },
  { day: 'Sun', hours: 2.0 },
];

export default function LearningStatisticsScreen({ navigation }: any) {
  const maxHours = Math.max(...WEEK_DATA.map((d) => d.hours));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Statistics</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: '#EBF8FF' }]}>
              <Ionicons name="time" size={18} color={COLORS.secondary} />
            </View>
            <Text style={styles.statValue}>15.2 hrs</Text>
            <Text style={styles.statLabel}>Study Time</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: '#E6FFFA' }]}>
              <Ionicons name="checkbox" size={18} color={COLORS.success} />
            </View>
            <Text style={styles.statValue}>4 / 8</Text>
            <Text style={styles.statLabel}>Courses Done</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: '#FAF5FF' }]}>
              <Ionicons name="ribbon" size={18} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>88%</Text>
            <Text style={styles.statLabel}>Quiz Average</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: '#FEFCBF' }]}>
              <Ionicons name="flame" size={18} color={COLORS.succeed} />
            </View>
            <Text style={styles.statValue}>5 Days</Text>
            <Text style={styles.statLabel}>Study Streak</Text>
          </View>
        </View>

        {/* Weekly Bar Chart Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Study Hours</Text>
          <Text style={styles.cardSubtitle}>Hours spent learning each day this week</Text>

          <View style={styles.chartContainer}>
            {WEEK_DATA.map((item) => {
              // Calculate height percentage relative to maximum day hours (e.g. 4.0h)
              const heightPercent = (item.hours / maxHours) * 100;

              return (
                <View key={item.day} style={styles.chartBarColumn}>
                  {/* Bar Value Tooltip */}
                  <Text style={styles.barValueText}>{item.hours}h</Text>
                  
                  {/* Outer Bar */}
                  <View style={styles.barOuter}>
                    <LinearGradient
                      colors={[COLORS.secondary, COLORS.primary]}
                      style={[styles.barFill, { height: `${heightPercent}%` }]}
                    />
                  </View>

                  {/* Day Label */}
                  <Text style={styles.dayLabelText}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Performance Quiz List */}
        <Text style={styles.sectionTitle}>Recent Quiz Scores</Text>
        <View style={styles.card}>
          <View style={styles.quizScoreRow}>
            <View style={styles.quizDetails}>
              <Text style={styles.quizName}>React Native Layout Basics</Text>
              <Text style={styles.quizMeta}>Completed on Jun 4, 2026</Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: COLORS.successLight }]}>
              <Text style={[styles.scoreBadgeText, { color: COLORS.success }]}>90%</Text>
            </View>
          </View>

          <View style={[styles.quizScoreRow, styles.borderTop]}>
            <View style={styles.quizDetails}>
              <Text style={styles.quizName}>TypeScript Interface & Contexts</Text>
              <Text style={styles.quizMeta}>Completed on Jun 1, 2026</Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: COLORS.successLight }]}>
              <Text style={[styles.scoreBadgeText, { color: COLORS.success }]}>85%</Text>
            </View>
          </View>

          <View style={[styles.quizScoreRow, styles.borderTop]}>
            <View style={styles.quizDetails}>
              <Text style={styles.quizName}>App Store Metadata Deployment</Text>
              <Text style={styles.quizMeta}>Completed on May 25, 2026</Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: COLORS.warningLight }]}>
              <Text style={[styles.scoreBadgeText, { color: COLORS.warning }]}>70%</Text>
            </View>
          </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: (width - 44) / 2,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '500',
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
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  cardSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingTop: 10,
  },
  chartBarColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barValueText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  barOuter: {
    width: 14,
    height: 110,
    backgroundColor: '#F1F5F9',
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  dayLabelText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textLight,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  quizScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  quizDetails: {
    flex: 1,
  },
  quizName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  quizMeta: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
