import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DetailedLesson } from './mockData';

export default function InteractiveLessonScreen({ route, navigation }: any) {
  const { lesson, onComplete }: { lesson: DetailedLesson; onComplete: () => void } = route.params;

  // Active tab selection
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');

  // Flashcards state
  const mockFlashcards = lesson.components?.flashcards || [
    { front: 'Primacy Rule in Lifting', back: 'Never load lift alone if weight exceeds 20kg. Prepare helpers.' },
    { front: 'Safe Base Alignment', back: 'Place feet shoulder-width apart to create stabilizer balance.' },
    { front: 'Wheelchair Lock Check', back: 'Engage safety brake pins before letting client lower in.' }
  ];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const mockQuiz = lesson.components?.quiz || [
    {
      question: 'Which is the correct posture for shifting a client in bed?',
      options: ['Bend at the waist', 'Keep back straight, bend knees', 'Keep legs straight, arch spine', 'Twist hips while pulling'],
      correctIndex: 1,
      explanation: 'Keeping back straight and bending knees protects the lumbar spine. Drive forces using leg muscles.'
    },
    {
      question: 'What is the first step before launching patient transfer assistance?',
      options: ['Move stabilizers', 'Check pathway obstacles', 'Communicate goals to client', 'All of the above'],
      correctIndex: 3,
      explanation: 'All options are critical: pathways must be clear, communication reassures the patient, and stabilisers secure the load.'
    }
  ];
  const [userSelections, setUserSelections] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Score count
  const calculateScore = () => {
    let correct = 0;
    mockQuiz.forEach((q, idx) => {
      if (userSelections[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % mockFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
  };

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (submittedQuiz) return;
    setUserSelections((prev) => ({
      ...prev,
      [questionIdx]: optionIdx
    }));
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    if (Object.keys(userSelections).length < mockQuiz.length) {
      Alert.alert('Incomplete Quiz', 'Please select answers for all questions before submitting.');
      return;
    }
    setSubmittedQuiz(true);
    const correct = calculateScore();
    Alert.alert(
      'Practice Quiz Checked!',
      `You scored ${correct} out of ${mockQuiz.length} questions correctly.`
    );
  };

  const handleFinishScreen = () => {
    if (activeTab === 'quiz' && !submittedQuiz) {
      Alert.alert('Quiz Not Submitted', 'Please submit your quiz scores before finishing.');
      return;
    }

    if (onComplete) onComplete();
    Alert.alert('Assessment Finished!', 'Your interactive session was recorded in the database.', [
      { text: 'Back to Workspace', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>Active Practice</Text>
          <Text style={styles.headerSubtitle}>Interactive Review</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'flashcards' && styles.tabBtnActive]}
          onPress={() => setActiveTab('flashcards')}
        >
          <Ionicons 
            name="copy-outline" 
            size={16} 
            color={activeTab === 'flashcards' ? COLORS.secondary : COLORS.textLight} 
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.tabBtnText, activeTab === 'flashcards' && styles.tabBtnTextActive]}>
            Study Cards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'quiz' && styles.tabBtnActive]}
          onPress={() => setActiveTab('quiz')}
        >
          <Ionicons 
            name="help-circle-outline" 
            size={16} 
            color={activeTab === 'quiz' ? COLORS.secondary : COLORS.textLight} 
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.tabBtnText, activeTab === 'quiz' && styles.tabBtnTextActive]}>
            Practice Quiz
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Flashcards View */}
        {activeTab === 'flashcards' && (
          <View style={styles.flashcardTab}>
            <Text style={styles.tabExplanation}>
              Flip flashcards to review fundamental terms and techniques before answering the quiz.
            </Text>

            {/* Flashcard Frame */}
            <TouchableOpacity 
              style={[styles.flashcard, isFlipped && styles.flashcardBack]} 
              onPress={() => setIsFlipped(!isFlipped)}
            >
              <View style={styles.cardHeaderIndicator}>
                <Ionicons name="swap-horizontal" size={14} color={isFlipped ? COLORS.secondary : COLORS.textLight} />
                <Text style={[styles.indicatorText, { color: isFlipped ? COLORS.secondary : COLORS.textLight }]}>
                  {isFlipped ? 'REVERSE' : 'OBVERSE'}
                </Text>
              </View>

              <View style={styles.cardCenter}>
                <Text style={[styles.cardContentText, isFlipped && styles.cardContentTextBack]}>
                  {isFlipped 
                    ? mockFlashcards[currentCardIndex].back 
                    : mockFlashcards[currentCardIndex].front}
                </Text>
              </View>

              <Text style={styles.tapPrompt}>Tap Card to Flip</Text>
            </TouchableOpacity>

            {/* Card controls */}
            <View style={styles.cardControlsRow}>
              <TouchableOpacity style={styles.circleArrowBtn} onPress={handlePrevCard}>
                <Ionicons name="arrow-back" size={18} color={COLORS.white} />
              </TouchableOpacity>
              
              <Text style={styles.cardProgressText}>
                {currentCardIndex + 1} of {mockFlashcards.length} Cards
              </Text>

              <TouchableOpacity style={styles.circleArrowBtn} onPress={handleNextCard}>
                <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quiz View */}
        {activeTab === 'quiz' && (
          <View style={styles.quizTab}>
            <View style={styles.quizScorePanel}>
              <Text style={styles.quizScoreLabel}>Quiz Status</Text>
              <Text style={styles.quizScoreValue}>
                {submittedQuiz 
                  ? `Completed (Score: ${calculateScore()} / ${mockQuiz.length})` 
                  : 'Active Attempt'}
              </Text>
            </View>

            {mockQuiz.map((questionObj: any, qIdx: number) => {
              const selectedIdx = userSelections[qIdx];

              return (
                <View key={qIdx} style={styles.quizCard}>
                  <Text style={styles.quizNumber}>Question {qIdx + 1}</Text>
                  <Text style={styles.quizQuestionText}>{questionObj.question}</Text>

                  {/* Options */}
                  <View style={styles.optionsStack}>
                    {questionObj.options.map((option: string, optIdx: number) => {
                      const isSelected = selectedIdx === optIdx;
                      const isCorrectAnswer = optIdx === questionObj.correctIndex;

                      // Highlight styles when submitted
                      let optionStyle: any = styles.optionBtn;
                      let optionTextStyle: any = styles.optionText;
                      let iconName = null;

                      if (isSelected) {
                        optionStyle = [styles.optionBtn, styles.optionBtnSelected];
                        optionTextStyle = [styles.optionText, styles.optionTextSelected];
                      }

                      if (submittedQuiz) {
                        if (isCorrectAnswer) {
                          optionStyle = [styles.optionBtn, styles.optionBtnCorrect];
                          optionTextStyle = [styles.optionText, styles.optionTextCorrect];
                          iconName = "checkmark-circle";
                        } else if (isSelected) {
                          optionStyle = [styles.optionBtn, styles.optionBtnIncorrect];
                          optionTextStyle = [styles.optionText, styles.optionTextIncorrect];
                          iconName = "close-circle";
                        } else {
                          optionStyle = [styles.optionBtn, styles.optionBtnDisabled];
                        }
                      }

                      return (
                        <TouchableOpacity
                          key={optIdx}
                          style={optionStyle}
                          onPress={() => handleSelectOption(qIdx, optIdx)}
                          disabled={submittedQuiz}
                        >
                          <Text style={optionTextStyle}>{option}</Text>
                          {iconName && (
                            <Ionicons 
                              name={iconName as any} 
                              size={16} 
                              color={isCorrectAnswer ? COLORS.success : COLORS.danger} 
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Explanation card */}
                  {submittedQuiz && (
                    <View style={styles.explanationBox}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="bulb-outline" size={14} color={COLORS.succeed} style={{ marginRight: 6 }} />
                        <Text style={styles.explanationHeading}>EXPLANATION</Text>
                      </View>
                      <Text style={styles.explanationText}>{questionObj.explanation}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Quiz Submit Button */}
            {!submittedQuiz && (
              <TouchableOpacity style={styles.submitQuizBtn} onPress={handleSubmitQuiz}>
                <Text style={styles.submitQuizBtnText}>Submit Answers & Check Score</Text>
                <Ionicons name="checkbox-outline" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishBtn} onPress={handleFinishScreen}>
          <Text style={styles.finishBtnText}>Finish Assessment</Text>
          <Ionicons name="checkmark-done" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
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
    marginTop: 2,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.secondary,
  },
  tabBtnText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  tabExplanation: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  flashcardTab: {
    alignItems: 'center',
  },
  flashcard: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  flashcardBack: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.accentLight,
  },
  cardHeaderIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 4,
  },
  cardCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContentText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: FONTS.bold,
  },
  cardContentTextBack: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  tapPrompt: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleArrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    ...SHADOWS.light,
  },
  cardProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  quizTab: {
    width: '100%',
  },
  quizScorePanel: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quizScoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  quizScoreValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  quizCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  quizNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  quizQuestionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 20,
  },
  optionsStack: {
    marginBottom: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: COLORS.background,
  },
  optionBtnSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.infoLight,
  },
  optionBtnCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  optionBtnIncorrect: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  optionBtnDisabled: {
    backgroundColor: COLORS.background,
    opacity: 0.6,
  },
  optionText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  },
  optionTextSelected: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  optionTextCorrect: {
    color: COLORS.success,
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  explanationBox: {
    backgroundColor: COLORS.warningLight,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FEEB8F',
    marginTop: 6,
  },
  explanationHeading: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.warning,
    letterSpacing: 0.5,
  },
  explanationText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
  },
  submitQuizBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    marginTop: 10,
  },
  submitQuizBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  finishBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  finishBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
