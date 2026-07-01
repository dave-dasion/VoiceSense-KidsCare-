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

export default function FollowUpStrategiesScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'immediate') pts += 50;
    if (q2 === 'value') pts += 50;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Follow-Up Cadence</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>The Art of Follow-up</Text>
          <Text style={styles.cardBody}>
            Follow-ups should never be "just checking in." Every touchpoint must add value—whether summarizing call action items, sharing industry reports, or highlighting customer success stories.
          </Text>
        </View>

        {/* Drill */}
        <Text style={styles.sectionTitle}>Follow-Up Scenario Drill</Text>
        <Text style={styles.sectionSubtitle}>Select the correct follow-up response for each deal scenario:</Text>

        {/* Scenario 1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. Scenario: You finish a demo video call. The client states, "We need to check details with our accounting team." When do you follow up?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'wait' && styles.choiceBtnActive]}
            onPress={() => { setQ1('wait'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Wait 4 business days to avoid looking too eager or desperate." (Loss of momentum)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'immediate' && styles.choiceBtnActive]}
            onPress={() => { setQ1('immediate'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Send a personalized summary email with specific next-step action items within 24 hours." (Maintains deal momentum)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scenario 2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. Scenario: You sent the proposal terms 5 days ago, and the prospect has gone dark. What is your follow-up email script?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'bump' && styles.choiceBtnActive]}
            onPress={() => { setQ2('bump'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Just wanted to bump this to the top of your inbox. Did you have time to check my proposal?" (Low-value nudge)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'value' && styles.choiceBtnActive]}
            onPress={() => { setQ2('value'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Came across this short guide showing how matching invoice tax splits cuts courier disputes. Thought you might find this useful..." (High-value re-engagement)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!q1 || !q2) && styles.submitBtnDisabled]}
            disabled={!q1 || !q2}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Verify Follow-up Strategy</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Drill Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **Send summary within 24 hours**. Fast follow-up locks in key meeting details while memories are fresh.{"\n"}
              - Q2 correct answer is **High-value re-engagement**. Never send empty "just checking in" emails. Add relevance to every touchpoint.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); }}>
              <Text style={styles.resetText}>Try Drill Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SalesProcessAssessment')}
        >
          <Text style={styles.nextButtonText}>Proceed to Fundamentals Assessment</Text>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
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
