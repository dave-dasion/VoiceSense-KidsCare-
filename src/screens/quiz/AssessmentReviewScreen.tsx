import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Quiz, QuizAttempt, QuizQuestion } from './mockData';

export default function AssessmentReviewScreen({ route, navigation }: any) {
  const { quiz, attempt }: { quiz: Quiz; attempt: QuizAttempt } = route.params;

  const [activeFilter, setActiveFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');

  const filteredQuestions = quiz.questions.filter((q) => {
    const userAnswer = attempt.answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    const isFlagged = attempt.flaggedQuestions.includes(q.id);

    if (activeFilter === 'all') return true;
    if (activeFilter === 'correct') return isCorrect;
    if (activeFilter === 'incorrect') return !isCorrect && userAnswer !== undefined;
    if (activeFilter === 'flagged') return isFlagged;
    return true;
  });

  const renderQuestionItem = ({ item, index }: { item: QuizQuestion; index: number }) => {
    const userAnswer = attempt.answers[item.id];
    const isCorrect = userAnswer === item.correctIndex;
    const isFlagged = attempt.flaggedQuestions.includes(item.id);
    const originalIndex = quiz.questions.findIndex((q) => q.id === item.id) + 1;

    return (
      <View style={styles.questionCard}>
        {/* Question Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.questionIndexText}>QUESTION {originalIndex}</Text>
          <View style={styles.badgeRow}>
            {isFlagged && (
              <View style={styles.flagBadge}>
                <Ionicons name="flag" size={10} color={COLORS.warning} style={{ marginRight: 4 }} />
                <Text style={styles.flagBadgeText}>Flagged</Text>
              </View>
            )}
            <View style={[
              styles.statusBadge,
              { backgroundColor: isCorrect ? COLORS.successLight : COLORS.dangerLight }
            ]}>
              <Ionicons
                name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                size={12}
                color={isCorrect ? COLORS.success : COLORS.danger}
                style={{ marginRight: 4 }}
              />
              <Text style={[
                styles.statusBadgeText,
                { color: isCorrect ? COLORS.success : COLORS.danger }
              ]}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          </View>
        </View>

        {/* Question Text */}
        <Text style={styles.questionText}>{item.question}</Text>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {item.options.map((option, idx) => {
            const isUserSelected = userAnswer === idx;
            const isCorrectAnswer = item.correctIndex === idx;

            let rowStyle: any = styles.optionRow;
            let textStyle: any = styles.optionText;
            let iconName = 'ellipse-outline';
            let iconColor = COLORS.border;

            if (isCorrectAnswer) {
              rowStyle = [rowStyle, styles.optionRowCorrect];
              textStyle = [textStyle, styles.optionTextCorrect];
              iconName = 'checkmark-circle';
              iconColor = COLORS.success;
            } else if (isUserSelected) {
              rowStyle = [rowStyle, styles.optionRowIncorrect];
              textStyle = [textStyle, styles.optionTextIncorrect];
              iconName = 'close-circle';
              iconColor = COLORS.danger;
            }

            return (
              <View key={idx} style={rowStyle}>
                <Ionicons name={iconName as any} size={18} color={iconColor} style={{ marginRight: 10 }} />
                <Text style={textStyle}>{option}</Text>
                {isUserSelected && !isCorrectAnswer && (
                  <Text style={styles.userSelectionLabel}>Your Choice</Text>
                )}
                {isUserSelected && isCorrectAnswer && (
                  <Text style={[styles.userSelectionLabel, { color: COLORS.success }]}>Correct & Chosen</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Explanation Card */}
        <View style={styles.explanationCard}>
          <View style={styles.explanationHeader}>
            <Ionicons name="information-circle" size={16} color={COLORS.info} style={{ marginRight: 6 }} />
            <Text style={styles.explanationTitle}>Detailed Explanation</Text>
          </View>
          <Text style={styles.explanationText}>{item.explanation}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.learningPointContainer}>
            <Text style={styles.learningPointLabel}>Key Learning Point:</Text>
            <Text style={styles.learningPointText}>{item.learningPoint}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Review Assessment</Text>
          <Text style={styles.headerSubtitle}>
            Score: <Text style={{ fontWeight: '800' }}>{attempt.score}%</Text> ({attempt.correctCount}/{attempt.totalCount} Correct)
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Filter Row */}
      <View style={styles.filterSection}>
        <FlatList
          data={[
            { id: 'all', label: 'All' },
            { id: 'correct', label: 'Correct Only' },
            { id: 'incorrect', label: 'Incorrect Only' },
            { id: 'flagged', label: 'Flagged' },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isActive = activeFilter === item.id;
            return (
              <TouchableOpacity
                style={[styles.chipButton, isActive && styles.chipButtonActive]}
                onPress={() => setActiveFilter(item.id as any)}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Questions Review List */}
      <FlatList
        data={filteredQuestions}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Questions Found</Text>
            <Text style={styles.emptyDesc}>No questions match the selected filter.</Text>
          </View>
        }
      />
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
  filterSection: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chipsContainer: {
    paddingHorizontal: 16,
  },
  chipButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionIndexText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#D69E2E',
  },
  flagBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.warning,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  questionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    marginBottom: 8,
  },
  optionRowCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  optionRowIncorrect: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  optionText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    fontWeight: '500',
  },
  optionTextCorrect: {
    color: COLORS.success,
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  userSelectionLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.danger,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  explanationCard: {
    backgroundColor: COLORS.infoLight,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBF8FF',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  explanationTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.info,
  },
  explanationText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(49, 130, 206, 0.1)',
    marginVertical: 10,
  },
  learningPointContainer: {
    marginTop: 2,
  },
  learningPointLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 2,
  },
  learningPointText: {
    fontSize: 11,
    color: COLORS.textDark,
    fontWeight: '700',
    lineHeight: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 12,
    fontFamily: FONTS.bold,
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
