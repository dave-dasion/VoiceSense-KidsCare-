import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ClosingAssessmentScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'milestone') pts += 33;
    if (q2 === 'negotiate') pts += 33;
    if (q3 === 'momentum') pts += 34;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Closing Evaluation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Closing Strategy Evaluation</Text>
          <Text style={styles.cardBody}>
            Complete this final evaluation quiz to verify your B2B closing and onboarding execution skills:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. What is the main outcome of a B2B assumptive close?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'payment' && styles.choiceBtnActive]}
            onPress={() => { setQ1('payment'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Demanding credit card authorization on the live video conference call." (Incorrect)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'milestone' && styles.choiceBtnActive]}
            onPress={() => { setQ1('milestone'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Locking down a concrete calendar date for the next onboarding milestone step." (Correct)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. How should you negotiate proposal scopes with budget-restricted buyers?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'negotiate' && styles.choiceBtnActive]}
            onPress={() => { setQ2('negotiate'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Transparently add/remove technical modules (e.g. SLA level, On-Prem) to match budget." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'free' && styles.choiceBtnActive]}
            onPress={() => { setQ2('free'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Offer to deploy the full enterprise local Docker core completely for free." (Incorrect)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q3 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>3. Why should post-demo onboarding milestones be agreed upon immediately?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'momentum' && styles.choiceBtnActive]}
            onPress={() => { setQ3('momentum'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To maintain momentum and clearly outline the path to a pilot trial launch." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'block' && styles.choiceBtnActive]}
            onPress={() => { setQ3('block'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To prevent the prospect from checking competitor pricing guidelines." (Incorrect)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!q1 || !q2 || !q3) && styles.submitBtnDisabled]}
            disabled={!q1 || !q2 || !q3}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Verify Answers</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **Locking down a concrete calendar date**. Never end a call without a locked action.{"\n"}
              - Q2 correct answer is **transparently add/remove modules**. Maintain price-value integrity.{"\n"}
              - Q3 correct answer is **maintain momentum**. Clear roadmap plans reduce procurement friction.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); setQ3(''); }}>
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Return to Hub */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('AIProductHub')}
        >
          <Text style={styles.nextButtonText}>Return to AI Hub</Text>
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
  scenarioCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  scenarioTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 17,
    marginBottom: 10,
  },
  choiceBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  choiceBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
  },
  choiceText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 13,
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
    color: COLORS.textDark,
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
