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

export default function ProspectingExerciseScreen({ navigation }: any) {
  const [answers, setAnswers] = useState<Record<string, string>>({
    lead1: '',
    lead2: '',
    lead3: '',
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswers = {
    lead1: 'MQL',
    lead2: 'SQL',
    lead3: 'Disqualified',
  };

  const handleSelect = (leadKey: string, value: string) => {
    if (showFeedback) return;
    setAnswers({
      ...answers,
      [leadKey]: value,
    });
  };

  const checkExercise = () => {
    if (!answers.lead1 || !answers.lead2 || !answers.lead3) {
      Alert.alert('Incomplete', 'Please classify all three lead profiles.');
      return;
    }
    setShowFeedback(true);
  };

  const resetExercise = () => {
    setAnswers({ lead1: '', lead2: '', lead3: '' });
    setShowFeedback(false);
  };

  const isAllCorrect = 
    answers.lead1 === correctAnswers.lead1 &&
    answers.lead2 === correctAnswers.lead2 &&
    answers.lead3 === correctAnswers.lead3;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Sourcing Exercise</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Case Info */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Lead Matching Challenge</Text>
          <Text style={styles.cardBody}>
            Review the three lead descriptions below. Match each lead with the correct status: <Text style={{ fontWeight: '800' }}>SQL</Text> (Sales Qualified), <Text style={{ fontWeight: '800' }}>MQL</Text> (Marketing Qualified), or <Text style={{ fontWeight: '800' }}>Disqualified</Text>.
          </Text>
        </View>

        {/* Lead 1 */}
        <View style={styles.exerciseCard}>
          <Text style={styles.leadLabel}>Lead Profile A</Text>
          <Text style={styles.leadDesc}>
            "We are a startup logistics company with 12 employees. We are losing package tracking details daily but have only $100/mo budget. We need a tracking portal next week."
          </Text>
          <View style={styles.btnRow}>
            {['SQL', 'MQL', 'Disqualified'].map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.optionBtn,
                  answers.lead1 === val && styles.optionBtnActive,
                  showFeedback && correctAnswers.lead1 === val && styles.optionBtnCorrect,
                ]}
                onPress={() => handleSelect('lead1', val)}
              >
                <Text style={[styles.optionText, answers.lead1 === val && styles.optionTextActive]}>
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lead 2 */}
        <View style={styles.exerciseCard}>
          <Text style={styles.leadLabel}>Lead Profile B</Text>
          <Text style={styles.leadDesc}>
            "I am the VP of Sales at a 400-person firm. We need a CRM integration tool to align our data pipelines. We have a budget of $20,000 approved and want to start integrations within 30 days."
          </Text>
          <View style={styles.btnRow}>
            {['SQL', 'MQL', 'Disqualified'].map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.optionBtn,
                  answers.lead2 === val && styles.optionBtnActive,
                  showFeedback && correctAnswers.lead2 === val && styles.optionBtnCorrect,
                ]}
                onPress={() => handleSelect('lead2', val)}
              >
                <Text style={[styles.optionText, answers.lead2 === val && styles.optionTextActive]}>
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lead 3 */}
        <View style={styles.exerciseCard}>
          <Text style={styles.leadLabel}>Lead Profile C</Text>
          <Text style={styles.leadDesc}>
            "I am a freelance copywriter looking for a tool to structure my portfolio list. I don't have a business entity or any budget, just browsing free templates."
          </Text>
          <View style={styles.btnRow}>
            {['SQL', 'MQL', 'Disqualified'].map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.optionBtn,
                  answers.lead3 === val && styles.optionBtnActive,
                  showFeedback && correctAnswers.lead3 === val && styles.optionBtnCorrect,
                ]}
                onPress={() => handleSelect('lead3', val)}
              >
                <Text style={[styles.optionText, answers.lead3 === val && styles.optionTextActive]}>
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action button */}
        {!showFeedback ? (
          <TouchableOpacity style={styles.checkBtn} onPress={checkExercise}>
            <Text style={styles.checkBtnText}>Validate Classifications</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>
              {isAllCorrect ? 'All Correct! Excellent Job!' : 'Some answers are incorrect.'}
            </Text>
            <Text style={styles.feedbackDesc}>
              - Profile A is an **MQL** because they have a clear, urgent need but their budget is too low for a direct sales cycle; they should enter marketing nurture.{"\n"}
              - Profile B is an **SQL** because they meet all BANT criteria (VP buyer, $20k budget, near-term timeline).{"\n"}
              - Profile C is **Disqualified** because they lack budget, organizational scale, and direct fit.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={resetExercise}>
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SalesHub')}
        >
          <Text style={styles.nextButtonText}>Return to Sales Hub</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
  exerciseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  leadLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 6,
  },
  leadDesc: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
    marginBottom: 12,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionBtn: {
    flex: 1,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
  },
  optionBtnCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '10',
  },
  optionText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  optionTextActive: {
    color: COLORS.secondary,
  },
  checkBtn: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  checkBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  feedbackDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  resetBtn: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
