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
import { Quiz, QuizAttempt } from './mockData';

export default function QuizResultScreen({ route, navigation }: any) {
  const { quiz, attempt }: { quiz: Quiz; attempt: QuizAttempt } = route.params;

  const handleGoBackToQuizzes = () => {
    navigation.navigate('QuizList');
  };

  const handleRetakeQuiz = () => {
    navigation.navigate('QuizAttempt', { quiz });
  };

  const handleReviewAnswers = () => {
    navigation.navigate('AssessmentReview', { quiz, attempt });
  };

  const handleViewLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBackToQuizzes} style={styles.headerCloseBtn}>
          <Ionicons name="close" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Assessment Result</Text>
          <Text style={styles.headerSubtitle}>{quiz.category}</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Celebration / Alert Area */}
        <View style={styles.celebrationCard}>
          {attempt.passed ? (
            <>
              <View style={[styles.awardCircle, { backgroundColor: COLORS.warningLight, borderColor: COLORS.succeed }]}>
                <Ionicons name="trophy" size={56} color={COLORS.succeed} />
              </View>
              <Text style={styles.congratsText}>Congratulations!</Text>
              <Text style={styles.resultDesc}>
                You passed the assessment and proved your proficiency. Keep up the excellent work!
              </Text>
            </>
          ) : (
            <>
              <View style={[styles.awardCircle, { backgroundColor: COLORS.dangerLight, borderColor: COLORS.danger }]}>
                <Ionicons name="alert-circle" size={56} color={COLORS.danger} />
              </View>
              <Text style={[styles.congratsText, { color: COLORS.danger }]}>Keep Learning!</Text>
              <Text style={styles.resultDesc}>
                You didn't meet the passing score of {quiz.passingScore}% this time. Review your responses and try again to improve.
              </Text>
            </>
          )}
        </View>

        {/* Score Card */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreInnerCircle}>
            <Text style={[
              styles.scorePercentText,
              { color: attempt.passed ? COLORS.success : COLORS.danger }
            ]}>
              {attempt.score}%
            </Text>
            <Text style={styles.scoreLabel}>Final Score</Text>
          </View>
          <Text style={styles.scoreDetailText}>
            You answered <Text style={{ fontWeight: '800', color: COLORS.textDark }}>{attempt.correctCount}</Text> out of {attempt.totalCount} questions correctly.
          </Text>
        </View>

        {/* Statistics Cards */}
        <Text style={styles.sectionTitle}>Summary Details</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Ionicons name="time-outline" size={20} color={COLORS.textLight} />
            <Text style={styles.statsValue}>{attempt.timeTaken}</Text>
            <Text style={styles.statsLabel}>Time Taken</Text>
          </View>

          <View style={styles.statsCard}>
            <Ionicons name="sparkles" size={20} color={attempt.passed ? COLORS.succeed : COLORS.textLight} />
            <Text style={[
              styles.statsValue,
              attempt.passed && { color: COLORS.succeed }
            ]}>
              {attempt.passed ? `+${quiz.points} XP` : '0 XP'}
            </Text>
            <Text style={styles.statsLabel}>XP Points Earned</Text>
          </View>

          <View style={styles.statsCard}>
            <Ionicons name="checkmark-done" size={20} color={COLORS.success} />
            <Text style={styles.statsValue}>{quiz.passingScore}%</Text>
            <Text style={styles.statsLabel}>Required Score</Text>
          </View>
        </View>

        {/* Action Panel */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleReviewAnswers}>
            <Ionicons name="eye" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
            <Text style={styles.primaryBtnText}>Review Answers</Text>
          </TouchableOpacity>

          {!attempt.passed && (
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.secondary }]} onPress={handleRetakeQuiz}>
              <Ionicons name="refresh" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Retake Assessment</Text>
            </TouchableOpacity>
          )}

          <View style={styles.secondaryBtnRow}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={handleViewLeaderboard}>
              <Ionicons name="trophy-outline" size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
              <Text style={styles.secondaryBtnText}>Leaderboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={handleGoBackToQuizzes}>
              <Ionicons name="list" size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
              <Text style={styles.secondaryBtnText}>All Quizzes</Text>
            </TouchableOpacity>
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
  headerCloseBtn: {
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
  celebrationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  awardCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 16,
  },
  congratsText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.success,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  scoreContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  scoreInnerCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 6,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scorePercentText: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  scoreLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  scoreDetailText: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  statsValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  statsLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  buttonsContainer: {
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryBtn: {
    width: '48%',
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
  },
});
