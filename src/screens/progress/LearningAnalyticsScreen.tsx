import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WEEKLY_STUDY_HOURS, MONTHLY_SCORES, OVERALL_STATS } from './mockProgressData';

const { width } = Dimensions.get('window');

export default function LearningAnalyticsScreen({ navigation }: any) {
  // Find max weekly hours to scale bar height
  const maxHours = Math.max(...WEEKLY_STUDY_HOURS.map((d) => d.hours));
  const maxScore = 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Analytics</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Core Stats Overview */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>88%</Text>
            <Text style={styles.statLabel}>Avg Quiz Score</Text>
          </View>
          <View style={[styles.statItem, styles.statDivider]}>
            <Text style={styles.statVal}>4.2h</Text>
            <Text style={styles.statLabel}>Daily Average</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>24</Text>
            <Text style={styles.statLabel}>Milestones Met</Text>
          </View>
        </View>

        {/* 1. Bar Chart: Weekly Study Hours */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Ionicons name="time" size={18} color={COLORS.secondary} style={{ marginRight: 6 }} />
            <Text style={styles.chartTitle}>Weekly Study Hours</Text>
          </View>

          <View style={styles.barChartContainer}>
            {WEEKLY_STUDY_HOURS.map((d, index) => {
              // Scale height relative to max hours (max height 140)
              const scaledHeight = maxHours > 0 ? (d.hours / maxHours) * 120 : 0;
              return (
                <View key={index} style={styles.chartCol}>
                  <Text style={styles.barValText}>{d.hours}h</Text>
                  <View style={styles.barTrack}>
                    <LinearGradient
                      colors={[COLORS.secondary, COLORS.accent]}
                      style={[styles.barFill, { height: Math.max(scaledHeight, 6) }]}
                    />
                  </View>
                  <Text style={styles.dayText}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 2. Line Chart/Horizontal Progress representation: Assessment Score Trend */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Ionicons name="trending-up" size={18} color={COLORS.success} style={{ marginRight: 6 }} />
            <Text style={styles.chartTitle}>Assessment score progression</Text>
          </View>

          <View style={styles.lineChartContainer}>
            {MONTHLY_SCORES.map((item, index) => (
              <View key={index} style={styles.progressRow}>
                <Text style={styles.monthText}>{item.month}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <LinearGradient
                      colors={['#48BB78', '#38A169']}
                      style={[styles.progressBarFill, { width: `${item.score}%` }]}
                    />
                  </View>
                </View>
                <Text style={styles.scoreText}>{item.score}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. Study Time Distributions */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Ionicons name="pie-chart" size={18} color={COLORS.accent} style={{ marginRight: 6 }} />
            <Text style={styles.chartTitle}>Study Time Distribution</Text>
          </View>

          <View style={styles.distributionContainer}>
            {/* Morning block */}
            <View style={styles.distRow}>
              <View style={[styles.distBullet, { backgroundColor: '#F6AD55' }]} />
              <Text style={styles.distLabel}>Morning Focus (6AM - 12PM)</Text>
              <Text style={styles.distVal}>35%</Text>
            </View>

            {/* Afternoon block */}
            <View style={styles.distRow}>
              <View style={[styles.distBullet, { backgroundColor: COLORS.secondary }]} />
              <Text style={styles.distLabel}>Afternoon Session (12PM - 6PM)</Text>
              <Text style={styles.distVal}>45%</Text>
            </View>

            {/* Night block */}
            <View style={styles.distRow}>
              <View style={[styles.distBullet, { backgroundColor: COLORS.accent }]} />
              <Text style={styles.distLabel}>Night Owl Blocks (6PM - 12AM)</Text>
              <Text style={styles.distVal}>20%</Text>
            </View>
          </View>

          {/* Simple horizontal ratio preview */}
          <View style={styles.ratioBar}>
            <View style={[styles.ratioSegment, { width: '35%', backgroundColor: '#F6AD55', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
            <View style={[styles.ratioSegment, { width: '45%', backgroundColor: COLORS.secondary }]} />
            <View style={[styles.ratioSegment, { width: '20%', backgroundColor: COLORS.accent, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 170,
    paddingHorizontal: 8,
  },
  chartCol: {
    alignItems: 'center',
    width: '12%',
  },
  barValText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 6,
  },
  barTrack: {
    height: 120,
    width: 12,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  dayText: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '700',
    marginTop: 8,
  },
  lineChartContainer: {
    paddingVertical: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  monthText: {
    width: 36,
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreText: {
    width: 36,
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'right',
  },
  distributionContainer: {
    marginBottom: 16,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  distBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  distLabel: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  distVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  ratioBar: {
    flexDirection: 'row',
    height: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 5,
    marginTop: 8,
  },
  ratioSegment: {
    height: '100%',
  },
});
