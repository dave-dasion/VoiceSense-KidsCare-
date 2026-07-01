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
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function PowerPointAssessmentScreen({ navigation }: any) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the recommended minimum font size for body bullet points on slides?",
      options: [
        "12pt",
        "18pt",
        "32pt",
        "8pt",
      ],
      correctIndex: 1,
      explanation: "Maintain at least an 18pt font size for body points to ensure reading eligibility from the back of meeting rooms.",
    },
    {
      id: 2,
      question: "Which narrative storytelling model should be used to structure a standard business presentation?",
      options: [
        "Hook-Body-CTA",
        "Introduction-Definition-Summary",
        "Q&A-Pricing-Problem",
        "Features-Benefits-Drawbacks",
      ],
      correctIndex: 0,
      explanation: "Organizing decks into Hook, followed by data validation Body, and closing with a CTA ensures high audience engagement.",
    },
    {
      id: 3,
      question: "Where should you define global logos, header styles, and footer page number locations?",
      options: [
        "On every single slide manually.",
        "In the Slide Master layout template.",
        "Under the Transitions configuration pane.",
        "Within Excel formulas.",
      ],
      correctIndex: 1,
      explanation: "Slide Master defines and automates global styling, margins, page numbers, and logo assets across the entire deck.",
    },
  ];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting the exam.');
      return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const finalScore = calculateScore();
  const passed = finalScore >= 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PowerPoint Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <>
            <Text style={styles.subtitle}>Answer the questions below to evaluate your knowledge:</Text>
            {questions.map((q, qIndex) => (
              <View key={q.id} style={styles.questionCard}>
                <Text style={styles.questionNumber}>Question {qIndex + 1} of {questions.length}</Text>
                <Text style={styles.questionText}>{q.question}</Text>

                {q.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[q.id] === oIndex;
                  return (
                    <TouchableOpacity
                      key={oIndex}
                      style={[
                        styles.optionButton,
                        isSelected && styles.optionSelected,
                      ]}
                      onPress={() => handleSelectOption(q.id, oIndex)}
                    >
                      <View style={[styles.radioOutline, isSelected && styles.radioSelected]}>
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Assessment</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.resultsContainer}>
            <LinearGradient
              colors={passed ? ['#48BB78', '#2F855A'] : ['#E53E3E', '#9B2C2C']}
              style={styles.scoreCard}
            >
              <Ionicons
                name={passed ? "checkmark-circle-outline" : "close-circle-outline"}
                size={64}
                color={COLORS.white}
              />
              <Text style={styles.scoreTitle}>{passed ? 'Assessment Passed!' : 'Assessment Failed'}</Text>
              <Text style={styles.scoreFraction}>{finalScore} / {questions.length}</Text>
              <Text style={styles.scoreXP}>{passed ? '+100 XP Earned' : 'Try again to earn XP'}</Text>
            </LinearGradient>

            <Text style={styles.reviewTitle}>Question Review</Text>

            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <View key={q.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewNum}>Question {qIndex + 1}</Text>
                    <Ionicons
                      name={isCorrect ? "checkmark-circle" : "close-circle"}
                      size={20}
                      color={isCorrect ? COLORS.success : COLORS.danger}
                    />
                  </View>
                  <Text style={styles.reviewQuestion}>{q.question}</Text>
                  
                  <View style={styles.answerCompare}>
                    <Text style={styles.compareText}>
                      Your Answer: <Text style={{ fontWeight: '700', color: isCorrect ? COLORS.success : COLORS.danger }}>
                        {q.options[userAnswer]}
                      </Text>
                    </Text>
                    {!isCorrect && (
                      <Text style={[styles.compareText, { marginTop: 4 }]}>
                        Correct Answer: <Text style={{ fontWeight: '700', color: COLORS.success }}>
                          {q.options[q.correctIndex]}
                        </Text>
                      </Text>
                    )}
                  </View>

                  <View style={styles.explanationBox}>
                    <Text style={styles.explanationTitle}>Explanation:</Text>
                    <Text style={styles.explanationText}>{q.explanation}</Text>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => navigation.navigate('PowerPointDashboard')}
            >
              <Text style={styles.doneText}>Return to PowerPoint Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  questionNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    lineHeight: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  optionSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
  },
  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.secondary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
  },
  optionText: {
    fontSize: 13,
    color: COLORS.textDark,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...SHADOWS.light,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  scoreCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  scoreTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
    fontFamily: FONTS.bold,
  },
  scoreFraction: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 8,
  },
  scoreXP: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '600',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewNum: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  reviewQuestion: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  answerCompare: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },
  compareText: {
    fontSize: 12,
    color: COLORS.textDark,
  },
  explanationBox: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 10,
  },
  explanationTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  explanationText: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...SHADOWS.light,
  },
  doneText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
