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
import { FEEDBACK_METRICS } from './mockAvitaData';

export default function AIFeedbackScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vocal Audit Feed</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Score Summary Overview Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#4C51BF', '#667EEA']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryTitle}>Overall Skill Rating</Text>
                <Text style={styles.summaryDate}>Based on latest vocal audit</Text>
              </View>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText}>B+</Text>
              </View>
            </View>
            
            <View style={styles.scoreRow}>
              <Text style={styles.scoreVal}>85 / 100</Text>
              <Text style={styles.scoreStatus}>Target: 90 (A-)</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.overviewDesc}>
              "Your safety compliance and body mechanics descriptions are exemplary. Focus on slow and patient speech delivery."
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Performance Audits</Text>

        {FEEDBACK_METRICS.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricName}>{metric.name}</Text>
              <Text style={[styles.metricScore, { color: metric.color }]}>
                {metric.score}%
              </Text>
            </View>

            {/* Score Bar */}
            <View style={styles.barBg}>
              <View style={[
                styles.barFill,
                { width: `${metric.score}%`, backgroundColor: metric.color }
              ]} />
            </View>

            <View style={styles.commentBox}>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.textLight} style={{ marginRight: 6, marginTop: 1 }} />
              <Text style={styles.commentText}>{metric.comments}</Text>
            </View>
          </View>
        ))}

        {/* Dynamic Coach Action Plan */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Ionicons name="compass-outline" size={20} color={COLORS.accent} style={{ marginRight: 8 }} />
            <Text style={styles.planTitle}>AI Remediation Plan</Text>
          </View>
          <Text style={styles.planDesc}>
            Avita has updated your study pathway. Proceed to Dementia scenarios to address Empathy & Validation gaps.
          </Text>
          <TouchableOpacity
            style={styles.planBtn}
            onPress={() => navigation.navigate('ContinueLearning')}
          >
            <Text style={styles.planBtnText}>Open Remediation Lesson</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  summaryGradient: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.white,
  },
  summaryDate: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
    fontWeight: '600',
  },
  gradeBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  scoreVal: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  scoreStatus: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  overviewDesc: {
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
  metricName: {
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
  commentBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  commentText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    fontWeight: '500',
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
    ...SHADOWS.light,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  planDesc: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 16.5,
    marginBottom: 14,
    fontWeight: '500',
  },
  planBtn: {
    height: 38,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planBtnText: {
    color: COLORS.white,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
