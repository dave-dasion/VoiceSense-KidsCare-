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
import { MOCK_ASSESSMENT_PERFORMANCE } from './mockAnalyticsData';

export default function AssessmentAnalyticsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assessment Analytics</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Quiz Diagnostics</Text>

        {MOCK_ASSESSMENT_PERFORMANCE.map((quiz) => (
          <View key={quiz.id} style={styles.quizCard}>
            
            {/* Title */}
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.quizTitle}>{quiz.quizTitle}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{quiz.attempts} attempts</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Pass Rate</Text>
                <Text style={[
                  styles.metricVal,
                  { color: quiz.passRate >= 80 ? COLORS.success : COLORS.danger }
                ]}>
                  {quiz.passRate}% Pass
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Attempts Volume</Text>
                <Text style={styles.metricVal}>{quiz.attempts} Sessions</Text>
              </View>
            </View>

            {/* Most Missed Question Callout */}
            <View style={styles.missedBox}>
              <View style={styles.missedHeader}>
                <Ionicons name="alert-circle" size={14} color={COLORS.danger} style={{ marginRight: 6 }} />
                <Text style={styles.missedTitle}>Most Missed Topic</Text>
              </View>
              <Text style={styles.missedText}>"{quiz.mostMissedQuestion}"</Text>
            </View>

          </View>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  quizCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  badge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  metricVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 4,
  },
  missedBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  missedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  missedTitle: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.danger,
    textTransform: 'uppercase',
  },
  missedText: {
    fontSize: 11,
    color: '#742A2A',
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
