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

export default function ObjectionPracticeScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'delay') pts += 50;
    if (q2 === 'alternative') pts += 50;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Practice Exercise</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Objection Challenges</Text>
          <Text style={styles.cardBody}>
            Test your knowledge of the LAER framework, concession prioritization, and timing pivots in mock objection scenarios:
          </Text>
        </View>

        {/* Scenario 1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. Objection: "We love the routing wizard but cannot sign until our next fiscal year budget opens in 6 months."</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'wait' && styles.choiceBtnActive]}
            onPress={() => { setQ1('wait'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Understood. I will mark this deal closed-lost and call you back in 6 months." (Weak timing drop)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'delay' && styles.choiceBtnActive]}
            onPress={() => { setQ1('delay'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "We can sign the license agreement now but set billing activation to trigger in 6 months when your budget opens." (Creative timing pivot)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scenario 2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. Negotiation: Buyer demands a large price discount during the final contract call.</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'give' && styles.choiceBtnActive]}
            onPress={() => { setQ2('give'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Grant the discount immediately to prevent them from walking away." (Concession surrender)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'alternative' && styles.choiceBtnActive]}
            onPress={() => { setQ2('alternative'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Offer alternative concessions first (like extended payment terms or free onboarding hours) to protect revenue." (Alternative concession strategy)
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
            <Text style={styles.submitBtnText}>Verify Answers</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Practice Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **Sign now, delay billing**. This locks in the client commitment while respecting their corporate fiscal cycles.{"\n"}
              - Q2 correct answer is **Offer alternative concessions first**. Protect price metrics whenever possible to maintain long-term account value.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); }}>
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
