import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Quiz } from './mockData';

export default function QuizInstructionsScreen({ route, navigation }: any) {
  const { quiz }: { quiz: Quiz } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Instructions</Text>
          <Text style={styles.headerSubtitle}>{quiz.category}</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quiz Header Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="school" size={44} color={COLORS.secondary} />
          </View>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDesc}>{quiz.description}</Text>
        </View>

        {/* Quiz Parameters Grid */}
        <Text style={styles.sectionTitle}>Quiz Structure</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: COLORS.infoLight }]}>
              <Ionicons name="help-circle" size={20} color={COLORS.info} />
            </View>
            <View style={styles.gridTextContainer}>
              <Text style={styles.gridValue}>{quiz.questionsCount} Questions</Text>
              <Text style={styles.gridLabel}>Multiple Choice</Text>
            </View>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: COLORS.warningLight }]}>
              <Ionicons name="time" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.gridTextContainer}>
              <Text style={styles.gridValue}>{quiz.timeLimit} Minutes</Text>
              <Text style={styles.gridLabel}>Duration Limit</Text>
            </View>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: COLORS.successLight }]}>
              <Ionicons name="checkmark-done-circle" size={20} color={COLORS.success} />
            </View>
            <View style={styles.gridTextContainer}>
              <Text style={styles.gridValue}>{quiz.passingScore}% Score</Text>
              <Text style={styles.gridLabel}>Passing Requirement</Text>
            </View>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: COLORS.accentLight }]}>
              <Ionicons name="ribbon" size={20} color={COLORS.accent} />
            </View>
            <View style={styles.gridTextContainer}>
              <Text style={styles.gridValue}>+{quiz.points} XP</Text>
              <Text style={styles.gridLabel}>Reward Potential</Text>
            </View>
          </View>
        </View>

        {/* Rules & Guidelines */}
        <Text style={styles.sectionTitle}>Rules & Guidelines</Text>
        <View style={styles.rulesCard}>
          <View style={styles.ruleRow}>
            <Ionicons name="shield-checkmark" size={18} color={COLORS.secondary} style={styles.ruleIcon} />
            <Text style={styles.ruleText}>
              Once started, the timer cannot be paused. Closing the app or locking the screen will not halt the clock.
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Ionicons name="hourglass" size={18} color={COLORS.secondary} style={styles.ruleIcon} />
            <Text style={styles.ruleText}>
              When the timer runs out, your current answers will be automatically submitted for scoring.
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Ionicons name="sync-circle" size={18} color={COLORS.secondary} style={styles.ruleIcon} />
            <Text style={styles.ruleText}>
              You are allowed unlimited retakes, but you only claim the XP points once upon passing.
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Ionicons name="eye" size={18} color={COLORS.secondary} style={styles.ruleIcon} />
            <Text style={styles.ruleText}>
              After submitting, you can review each question and check detailed explanations.
            </Text>
          </View>
        </View>

        {/* Warning Alert */}
        <View style={styles.warningAlert}>
          <Ionicons name="warning" size={20} color={COLORS.warning} style={{ marginRight: 8 }} />
          <Text style={styles.warningText}>
            Ensure you have a reliable network connection and are in a quiet workspace. Good luck!
          </Text>
        </View>
      </ScrollView>

      {/* Start Button Container */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('QuizAttempt', { quiz })}
        >
          <Text style={styles.startBtnText}>Start Assessment</Text>
          <Ionicons name="chevron-forward-circle" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
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
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.infoLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: FONTS.bold,
  },
  quizDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  gridIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  gridTextContainer: {
    flex: 1,
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  gridLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '500',
    marginTop: 1,
  },
  rulesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  ruleIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
  },
  warningAlert: {
    flexDirection: 'row',
    backgroundColor: COLORS.warningLight,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEFCBF',
  },
  warningText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.warning,
    fontWeight: '600',
    lineHeight: 15,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  startBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
