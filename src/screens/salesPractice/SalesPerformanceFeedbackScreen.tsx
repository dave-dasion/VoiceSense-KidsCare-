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
import { LinearGradient } from 'expo-linear-gradient';
import { PERFORMANCE_FEEDBACK } from './mockSalesPracticeData';

export default function SalesPerformanceFeedbackScreen({ navigation }: any) {
  
  const handleProceedToCoaching = () => {
    navigation.navigate('AICoachingSummary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simulation Audit</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Overall Rank Header */}
        <View style={styles.auditCard}>
          <LinearGradient
            colors={[COLORS.primary, '#805AD5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.auditGradient}
          >
            <View style={styles.auditRow}>
              <View>
                <Text style={styles.auditTitle}>Closing Scorecard</Text>
                <Text style={styles.auditTime}>Robert Vance facility vetting</Text>
              </View>
              <View style={styles.badgeCircle}>
                <Text style={styles.badgeText}>83%</Text>
              </View>
            </View>

            <View style={styles.dividerLight} />

            <Text style={styles.auditDescription}>
              "You successfully qualified Robert's facility size and structured caregiver meets. Watch price discounting tendencies."
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Weighted Categories</Text>

        {PERFORMANCE_FEEDBACK.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>{metric.category}</Text>
              <Text style={[styles.metricScore, { color: metric.color }]}>
                {metric.score}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.barBg}>
              <View style={[
                styles.barFill,
                { width: `${metric.score}%`, backgroundColor: metric.color }
              ]} />
            </View>

            {/* Critique Comment Box */}
            <View style={styles.critiqueBox}>
              <Ionicons name="bulb" size={14} color={COLORS.textLight} style={{ marginRight: 6, marginTop: 1 }} />
              <Text style={styles.critiqueText}>{metric.comment}</Text>
            </View>
          </View>
        ))}

        {/* Proceed Action Button */}
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceedToCoaching}>
          <Text style={styles.proceedBtnText}>Open AI Coaching Summary</Text>
          <Ionicons name="sparkles" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  auditCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  auditGradient: {
    padding: 20,
  },
  auditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  auditTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.white,
  },
  auditTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
    marginTop: 2,
  },
  badgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  dividerLight: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  auditDescription: {
    fontSize: 12,
    color: COLORS.white,
    lineHeight: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  metricCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  metricScore: {
    fontSize: 14,
    fontWeight: '800',
  },
  barBg: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  critiqueBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  critiqueText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    fontWeight: '500',
  },
  proceedBtn: {
    height: 44,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.medium,
  },
  proceedBtnText: {
    color: COLORS.white,
    fontSize: 13.5,
    fontWeight: '700',
  },
});
