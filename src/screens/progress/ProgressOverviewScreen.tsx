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
import { OVERALL_STATS } from './mockProgressData';

const { width } = Dimensions.get('window');

export default function ProgressOverviewScreen({ navigation }: any) {
  const showBackButton = navigation.canGoBack();

  const handleMenuPress = () => {
    if (showBackButton) {
      navigation.goBack();
    } else {
      if (navigation.openDrawer) {
        navigation.openDrawer();
      } else {
        navigation.getParent()?.openDrawer();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuBtn}>
          <Ionicons name={showBackButton ? 'arrow-back' : 'menu'} size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Center</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Progress Circle and Stats Card */}
        <View style={styles.progressHeroCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroRow}>
              {/* Circular progress representation */}
              <View style={styles.circleOuter}>
                <View style={styles.circleInner}>
                  <Text style={styles.circleValText}>{OVERALL_STATS.completionRate}%</Text>
                  <Text style={styles.circleLabelText}>Overall</Text>
                </View>
              </View>

              <View style={styles.heroStatsCol}>
                <Text style={styles.heroHeading}>Trainee Progression</Text>
                <Text style={styles.heroSubHeading}>Emily Watson • Professional Care Path</Text>
                
                <View style={styles.xpRow}>
                  <Ionicons name="sparkles" size={16} color="#D69E2E" style={{ marginRight: 6 }} />
                  <Text style={styles.xpText}>{OVERALL_STATS.totalXP} XP Accumulated</Text>
                </View>

                {/* Progress bar info */}
                <View style={styles.completionBarWrapper}>
                  <View style={styles.completionBarBg}>
                    <View style={[styles.completionBarFill, { width: `${OVERALL_STATS.completionRate}%` }]} />
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.quickStatsRow}>
          <View style={styles.smallStatCard}>
            <LinearGradient
              colors={['#FEFCBF', '#FEEBC8']}
              style={styles.iconCircleBg}
            >
              <Ionicons name="flame" size={20} color="#DD6B20" />
            </LinearGradient>
            <Text style={styles.smallStatVal}>{OVERALL_STATS.activeStreak} Days</Text>
            <Text style={styles.smallStatLabel}>Study Streak</Text>
          </View>

          <View style={styles.smallStatCard}>
            <LinearGradient
              colors={['#EBF8FF', '#BEE3F8']}
              style={styles.iconCircleBg}
            >
              <Ionicons name="time" size={20} color={COLORS.secondary} />
            </LinearGradient>
            <Text style={styles.smallStatVal}>{OVERALL_STATS.totalHours} hrs</Text>
            <Text style={styles.smallStatLabel}>Total Study</Text>
          </View>

          <View style={styles.smallStatCard}>
            <LinearGradient
              colors={['#E6FFFA', '#B2F5EA']}
              style={styles.iconCircleBg}
            >
              <Ionicons name="checkmark-done-circle" size={20} color={COLORS.success} />
            </LinearGradient>
            <Text style={styles.smallStatVal}>{OVERALL_STATS.completedCourses}/{OVERALL_STATS.completedCourses + OVERALL_STATS.activeCourses}</Text>
            <Text style={styles.smallStatLabel}>Completed</Text>
          </View>
        </View>

        {/* Navigation Section Cards */}
        <Text style={styles.sectionTitle}>Progression Sections</Text>

        {/* 1. Course Progress */}
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => navigation.navigate('CourseProgress')}
        >
          <View style={[styles.navIconBg, { backgroundColor: '#EBF8FF' }]}>
            <Ionicons name="school-outline" size={24} color={COLORS.secondary} />
          </View>
          <View style={styles.navDetails}>
            <Text style={styles.navTitle}>Course Completion</Text>
            <Text style={styles.navSub}>Detailed lecture, quiz & milestone progress rates</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* 2. Skill Progress */}
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => navigation.navigate('SkillProgress')}
        >
          <View style={[styles.navIconBg, { backgroundColor: '#FAF5FF' }]}>
            <Ionicons name="ribbon-outline" size={24} color={COLORS.accent} />
          </View>
          <View style={styles.navDetails}>
            <Text style={styles.navTitle}>Practical Skill Matrix</Text>
            <Text style={styles.navSub}>Acquired care competencies & instructor check-offs</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* 3. Learning Analytics */}
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => navigation.navigate('LearningAnalytics')}
        >
          <View style={[styles.navIconBg, { backgroundColor: '#E6FFFA' }]}>
            <Ionicons name="bar-chart-outline" size={24} color={COLORS.success} />
          </View>
          <View style={styles.navDetails}>
            <Text style={styles.navTitle}>Learning Analytics</Text>
            <Text style={styles.navSub}>Weekly hours trends & assessment grade curves</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* 4. Performance Insights */}
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => navigation.navigate('PerformanceInsights')}
        >
          <View style={[styles.navIconBg, { backgroundColor: '#FFF5F5' }]}>
            <Ionicons name="bulb-outline" size={24} color={COLORS.danger} />
          </View>
          <View style={styles.navDetails}>
            <Text style={styles.navTitle}>AI Coach Insights</Text>
            <Text style={styles.navSub}>Personalized feedback, strengths & recommendations</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* Action Shortcut to study */}
        <TouchableOpacity
          style={styles.resumeBtn}
          onPress={() => navigation.navigate('ContinueLearning')}
        >
          <LinearGradient
            colors={[COLORS.secondary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resumeGradient}
          >
            <Text style={styles.resumeText}>Resume Next Active Chapter</Text>
            <Ionicons name="play-circle" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

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
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuBtn: {
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
  progressHeroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  heroGradient: {
    padding: 20,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  circleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  circleValText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  circleLabelText: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  heroStatsCol: {
    flex: 1,
  },
  heroHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  heroSubHeading: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    fontWeight: '600',
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  xpText: {
    fontSize: 11,
    color: '#FEFCBF',
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  completionBarWrapper: {
    marginTop: 10,
    width: '100%',
  },
  completionBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
  },
  completionBarFill: {
    height: '100%',
    backgroundColor: '#FEFCBF',
    borderRadius: 3,
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  smallStatCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  iconCircleBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  smallStatVal: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  smallStatLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  navIconBg: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  navDetails: {
    flex: 1,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  navSub: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    lineHeight: 14,
  },
  resumeBtn: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  resumeGradient: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
