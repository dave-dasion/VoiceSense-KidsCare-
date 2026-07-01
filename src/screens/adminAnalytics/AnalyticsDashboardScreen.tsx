import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { ADMIN_KPI_STATS } from './mockAnalyticsData';

export default function AnalyticsDashboardScreen({ navigation }: any) {
  
  const reportCards = [
    {
      title: 'User Performance',
      desc: 'Audit student course checklists, logins, and averages.',
      icon: 'people-outline',
      color: COLORS.primary,
      route: 'UserPerformanceReport',
    },
    {
      title: 'Course Performance',
      desc: 'Check enrollment stats, ratings, and completion speeds.',
      icon: 'journal-outline',
      color: COLORS.secondary,
      route: 'CoursePerformanceReport',
    },
    {
      title: 'Assessment Analytics',
      desc: 'Review pass rates, attempts, and most missed questions.',
      icon: 'checkbox-outline',
      color: COLORS.accent,
      route: 'AssessmentAnalytics',
    },
    {
      title: 'Certification Audit',
      desc: 'Track active, expiring, or lapsed caregiver certifications.',
      icon: 'trophy-outline',
      color: COLORS.warning,
      route: 'CertificationReport',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics Center</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Admin Analytics Hub</Text>
          <Text style={styles.welcomeBody}>
            Review organization statistics regarding user registrations, lesson completions, quiz metrics, and compliance standings.
          </Text>
        </View>

        {/* KPIs Grid */}
        <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
        <View style={styles.kpiContainer}>
          
          <View style={styles.kpiBox}>
            <Ionicons name="people" size={20} color={COLORS.primary} style={{ marginBottom: 6 }} />
            <Text style={styles.kpiValue}>{ADMIN_KPI_STATS.totalUsers}</Text>
            <Text style={styles.kpiLabel}>Total Trainees</Text>
          </View>

          <View style={styles.kpiBox}>
            <Ionicons name="book" size={20} color={COLORS.secondary} style={{ marginBottom: 6 }} />
            <Text style={styles.kpiValue}>{ADMIN_KPI_STATS.activeCourses}</Text>
            <Text style={styles.kpiLabel}>Active Courses</Text>
          </View>

          <View style={styles.kpiBox}>
            <Ionicons name="ribbon" size={20} color={COLORS.accent} style={{ marginBottom: 6 }} />
            <Text style={styles.kpiValue}>{ADMIN_KPI_STATS.averageQuizScore}%</Text>
            <Text style={styles.kpiLabel}>Quiz Average</Text>
          </View>

          <View style={styles.kpiBox}>
            <Ionicons name="trophy" size={20} color={COLORS.warning} style={{ marginBottom: 6 }} />
            <Text style={styles.kpiValue}>{ADMIN_KPI_STATS.activeCertifications}</Text>
            <Text style={styles.kpiLabel}>Active Certs</Text>
          </View>

        </View>

        {/* Report Sections */}
        <Text style={styles.sectionTitle}>Available Reports</Text>
        {reportCards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.reportCard, { borderLeftColor: card.color, borderLeftWidth: 4 }]}
            onPress={() => navigation.navigate(card.route)}
          >
            <View style={styles.reportHeader}>
              <View style={[styles.iconBg, { backgroundColor: `${card.color}15` }]}>
                <Ionicons name={card.icon as any} size={22} color={card.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDesc}>{card.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
            </View>
          </TouchableOpacity>
        ))}

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
  welcomeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  welcomeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  welcomeBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  kpiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kpiBox: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  kpiLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '700',
    marginTop: 4,
  },
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    marginTop: 2,
    fontWeight: '500',
  },
});
