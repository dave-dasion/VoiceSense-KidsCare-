import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DetailedLesson, MOCK_LESSONS } from './mockData';

export default function LessonCompletionScreen({ route, navigation }: any) {
  const { lesson, course, xpEarned }: { lesson: DetailedLesson; course: any; xpEarned: number } = route.params;

  // Find if there is a next lesson in this course
  const nextLesson = MOCK_LESSONS.find(
    (les) => les.courseId === course.id && les.index === lesson.index + 1
  );

  const handleGoBackToCurriculum = () => {
    navigation.navigate('LessonList', { course });
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      // Navigate to the next lesson details
      navigation.navigate('LessonDetails', { lesson: nextLesson, course });
    } else {
      // Fallback if course completed
      navigation.navigate('CourseCatalog');
    }
  };

  const handleReviewLesson = () => {
    navigation.navigate('LessonContent', { lesson, course });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.celebrationArea}>
        {/* Trophy / Award Indicator */}
        <View style={styles.awardCircle}>
          <Ionicons name="trophy" size={54} color="#D69E2E" />
        </View>

        {/* Celebration text */}
        <Text style={styles.congratsText}>Congratulations!</Text>
        <Text style={styles.subtitleText}>You completed the lesson:</Text>
        <Text style={styles.lessonTitleText}>"{lesson.title}"</Text>

        {/* Reward cards */}
        <View style={styles.rewardContainer}>
          {/* XP Reward card */}
          <View style={styles.rewardCard}>
            <Ionicons name="sparkles" size={20} color="#D69E2E" style={{ marginBottom: 4 }} />
            <Text style={styles.rewardVal}>+{xpEarned} XP</Text>
            <Text style={styles.rewardLabel}>Points Claimed</Text>
          </View>

          {/* Badge Reward card */}
          <View style={styles.rewardCard}>
            <Ionicons name="ribbon" size={20} color={COLORS.secondary} style={{ marginBottom: 4 }} />
            <Text style={styles.rewardVal}>Badge Earned</Text>
            <Text style={styles.rewardLabel}>Level Unlocked</Text>
          </View>
        </View>

        {/* Course completion status details */}
        <View style={styles.completionDetailsCard}>
          <View style={styles.rowItem}>
            <Text style={styles.detailLabel}>Course Category</Text>
            <Text style={styles.detailVal}>{course.category}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.detailLabel}>Estimated Time Spent</Text>
            <Text style={styles.detailVal}>{lesson.estimatedTime}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.detailLabel}>Difficulty Level</Text>
            <Text style={[styles.detailVal, { color: COLORS.secondary, fontWeight: '800' }]}>
              {lesson.difficulty}
            </Text>
          </View>
        </View>
      </View>

      {/* Action panel at the bottom */}
      <View style={styles.footer}>
        {nextLesson ? (
          <TouchableOpacity style={styles.primaryBtn} onPress={handleNextLesson}>
            <Text style={styles.primaryBtnText}>Advance to Next Lesson</Text>
            <Ionicons name="arrow-forward-circle" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.success }]} onPress={handleNextLesson}>
            <Text style={styles.primaryBtnText}>Course Completed! Back to Catalog</Text>
            <Ionicons name="library" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        )}

        <View style={styles.secondaryBtnRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleGoBackToCurriculum}>
            <Ionicons name="list" size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
            <Text style={styles.secondaryBtnText}>Curriculum</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={handleReviewLesson}>
            <Ionicons name="refresh" size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
            <Text style={styles.secondaryBtnText}>Review Workspace</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  celebrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  awardCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.warningLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#D69E2E',
  },
  congratsText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  subtitleText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    fontWeight: '500',
  },
  lessonTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: FONTS.bold,
    paddingHorizontal: 24,
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 28,
    marginBottom: 20,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  rewardVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
    fontFamily: FONTS.bold,
  },
  rewardLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
  },
  completionDetailsCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  detailVal: {
    fontSize: 11,
    color: COLORS.textDark,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  primaryBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
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
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  secondaryBtnText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
});
