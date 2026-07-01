import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  StatusBar,
  FlatList,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Quiz, submitQuizAttempt } from './mockData';

export default function QuizAttemptScreen({ route, navigation }: any) {
  const { quiz }: { quiz: Quiz } = route.params;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeLimitSeconds = quiz.timeLimit * 60;
  const timeSpent = timeLimitSeconds - timeLeft;

  // Timer interval hook
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto submit when time runs out
          Alert.alert('Time Is Up!', 'Your assessment has been automatically submitted.', [
            { text: 'View Results', onPress: () => handleFinalSubmit(true) }
          ]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlagged((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleFinalSubmit = (forced = false) => {
    setConfirmVisible(false);
    
    // If not forced and not all questions are answered, double check
    const answeredCount = Object.keys(answers).length;
    if (!forced && answeredCount < quiz.questionsCount) {
      Alert.alert(
        'Unanswered Questions',
        `You have answered ${answeredCount} of ${quiz.questionsCount} questions. Submit anyway?`,
        [
          { text: 'Keep Working', style: 'cancel' },
          { text: 'Submit', onPress: () => executeSubmit() }
        ]
      );
    } else {
      executeSubmit();
    }
  };

  const executeSubmit = () => {
    const attempt = submitQuizAttempt(quiz.id, answers, timeSpent, flagged);
    
    // Clear timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Navigate to results
    navigation.replace('QuizResult', { quiz, attempt });
  };

  const handleExitQuiz = () => {
    Alert.alert(
      'Abandon Assessment?',
      'Leaving this screen will abandon your attempt. None of your answers will be saved.',
      [
        { text: 'Continue Quiz', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  const currentQuestion = quiz.questions[currentIdx];
  const selectedOption = answers[currentQuestion.id];
  const isFlagged = flagged.includes(currentQuestion.id);
  const isLastQuestion = currentIdx === quiz.questionsCount - 1;

  // Color selection for timer warning
  const isLowTime = timeLeft <= 60; // Less than 1 minute

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitQuiz} style={styles.exitButton}>
          <Ionicons name="close" size={24} color={COLORS.danger} />
        </TouchableOpacity>
        
        <View style={styles.timerContainer}>
          <Ionicons 
            name="time-outline" 
            size={18} 
            color={isLowTime ? COLORS.danger : COLORS.textLight} 
          />
          <Text style={[
            styles.timerText, 
            isLowTime && styles.timerLowText
          ]}>
            {formatTime(timeLeft)}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => handleToggleFlag(currentQuestion.id)} 
          style={styles.flagButton}
        >
          <Ionicons 
            name={isFlagged ? 'flag' : 'flag-outline'} 
            size={22} 
            color={isFlagged ? COLORS.warning : COLORS.textLight} 
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${((currentIdx + 1) / quiz.questionsCount) * 100}%` }
          ]} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Text */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Question <Text style={{ fontWeight: '800', color: COLORS.primary }}>{currentIdx + 1}</Text> of {quiz.questionsCount}
          </Text>
          {isFlagged && (
            <View style={styles.flaggedBadge}>
              <Ionicons name="flag" size={10} color={COLORS.warning} style={{ marginRight: 4 }} />
              <Text style={styles.flaggedBadgeText}>Flagged</Text>
            </View>
          )}
        </View>

        {/* Question Text */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {currentQuestion.question}
          </Text>
        </View>

        {/* Options List */}
        <Text style={styles.optionSectionTitle}>Select Answer</Text>
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.optionRow,
                isSelected && styles.optionRowSelected
              ]}
              onPress={() => handleSelectOption(currentQuestion.id, idx)}
            >
              <Ionicons
                name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={isSelected ? COLORS.secondary : COLORS.border}
                style={{ marginRight: 12 }}
              />
              <Text style={[
                styles.optionText,
                isSelected && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Navigation Quick Selector Strip */}
      <View style={styles.selectorStrip}>
        <FlatList
          data={quiz.questions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.selectorScroll}
          renderItem={({ item, index }) => {
            const isQSelected = index === currentIdx;
            const isQAnswered = answers[item.id] !== undefined;
            const isQFlagged = flagged.includes(item.id);

            let btnStyle: any = styles.selectorBtn;
            let textStyle: any = styles.selectorBtnText;

            if (isQSelected) {
              btnStyle = { ...btnStyle, ...styles.selectorBtnActive };
              textStyle = { ...textStyle, ...styles.selectorBtnTextActive };
            } else if (isQAnswered) {
              btnStyle = { ...btnStyle, ...styles.selectorBtnAnswered };
              textStyle = { ...textStyle, ...styles.selectorBtnTextAnswered };
            }

            return (
              <TouchableOpacity
                style={[btnStyle, isQFlagged && styles.selectorBtnFlagged]}
                onPress={() => setCurrentIdx(index)}
              >
                <Text style={textStyle}>{index + 1}</Text>
                {isQFlagged && (
                  <View style={styles.selectorFlagDot}>
                    <Ionicons name="flag" size={7} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Footer Controls */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navBtn,
            currentIdx === 0 && styles.navBtnDisabled
          ]}
          disabled={currentIdx === 0}
          onPress={() => setCurrentIdx((prev) => prev - 1)}
        >
          <Ionicons 
            name="arrow-back" 
            size={18} 
            color={currentIdx === 0 ? COLORS.border : COLORS.secondary} 
          />
          <Text style={[
            styles.navBtnText,
            currentIdx === 0 && styles.navBtnTextDisabled
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        {isLastQuestion ? (
          <TouchableOpacity
            style={[styles.navBtn, styles.submitBtn]}
            onPress={() => setConfirmVisible(true)}
          >
            <Text style={styles.submitBtnText}>Submit</Text>
            <Ionicons name="checkmark-done" size={18} color={COLORS.white} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navBtn, styles.nextBtn]}
            onPress={() => setCurrentIdx((prev) => prev + 1)}
          >
            <Text style={styles.nextBtnText}>Next</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Submit Confirmation Modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="help-circle" size={40} color={COLORS.secondary} />
            </View>
            <Text style={styles.modalTitle}>Submit Assessment?</Text>
            <Text style={styles.modalDesc}>
              You have answered {Object.keys(answers).length} out of {quiz.questionsCount} questions. Are you sure you want to finish and submit?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={() => handleFinalSubmit(true)}
              >
                <Text style={styles.modalSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  exitButton: {
    padding: 6,
  },
  flagButton: {
    padding: 6,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginLeft: 6,
    fontFamily: FONTS.bold,
  },
  timerLowText: {
    color: COLORS.danger,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: COLORS.border,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  flaggedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D69E2E',
  },
  flaggedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.warning,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 22,
    fontFamily: FONTS.bold,
  },
  optionSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  optionRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  optionRowSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.infoLight,
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  selectorStrip: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
  },
  selectorScroll: {
    paddingHorizontal: 12,
  },
  selectorBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  selectorBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.infoLight,
  },
  selectorBtnAnswered: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.border,
  },
  selectorBtnFlagged: {
    borderColor: '#D69E2E',
    backgroundColor: '#FEFCBF',
  },
  selectorBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectorBtnTextActive: {
    color: COLORS.secondary,
    fontWeight: '800',
  },
  selectorBtnTextAnswered: {
    color: COLORS.textDark,
  },
  selectorFlagDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    width: '45%',
  },
  navBtnDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    marginLeft: 6,
  },
  navBtnTextDisabled: {
    color: COLORS.border,
  },
  nextBtn: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  nextBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: 6,
  },
  submitBtn: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  submitBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...SHADOWS.dark,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.infoLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
    fontFamily: FONTS.bold,
  },
  modalDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelBtn: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  modalSubmitBtn: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubmitText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
});
