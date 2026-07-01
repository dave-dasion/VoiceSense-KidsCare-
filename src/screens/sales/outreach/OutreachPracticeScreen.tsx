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

export default function OutreachPracticeScreen({ navigation }: any) {
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const checkPractice = () => {
    if (q1 === null || q2 === null) return;
    setShowResults(true);
  };

  const handleReset = () => {
    setQ1(null);
    setQ2(null);
    setShowResults(false);
  };

  const score = (q1 === 1 ? 1 : 0) + (q2 === 0 ? 1 : 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>5. Practice Exercise</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Sequence Rule Checklist</Text>
          <Text style={styles.cardBody}>
            Review the final outreach guidelines. Test your knowledge on response scheduling and gatekeeper handling below:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.quizCard}>
          <Text style={styles.quizQuestion}>
            1. How long should you ideally wait after your first cold email before making a follow-up phone call?
          </Text>
          {[
            '0 days (Call immediately after sending)',
            '2 business days (Allows time for read-receipts without cold-off)',
            '7 business days (Too long, reduces contextual relevance)',
          ].map((ans, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.answerBtn, q1 === idx && styles.answerBtnActive]}
              onPress={() => { setQ1(idx); setShowResults(false); }}
            >
              <Text style={styles.answerText}>{ans}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Q2 */}
        <View style={styles.quizCard}>
          <Text style={styles.quizQuestion}>
            2. When calling a target enterprise company, what is the best way to interact with a gatekeeper?
          </Text>
          {[
            'Ask for the VP by name and state your business value concisely.',
            'Refuse to state your business and demand to be put through.',
            'Pitch the gatekeeper your entire product demo script.',
          ].map((ans, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.answerBtn, q2 === idx && styles.answerBtnActive]}
              onPress={() => { setQ2(idx); setShowResults(false); }}
            >
              <Text style={styles.answerText}>{ans}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action buttons */}
        {!showResults ? (
          <TouchableOpacity
            style={[styles.checkBtn, (q1 === null || q2 === null) && styles.checkBtnDisabled]}
            disabled={q1 === null || q2 === null}
            onPress={checkPractice}
          >
            <Text style={styles.checkBtnText}>Verify Answers</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackScore}>Your Score: {score}/2</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **2 business days**. This keeps your follow-up contextual while avoiding instant spam-like behavior.{"\n"}
              - Q2 correct answer is **Ask for the VP by name and state value**. Gatekeepers protect calendars but will route legitimate business inquiries.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Restart Exercise</Text>
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
  quizCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  quizQuestion: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 17,
    marginBottom: 12,
  },
  answerBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  answerBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
  },
  answerText: {
    fontSize: 11,
    color: COLORS.textDark,
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
  checkBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  checkBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  feedbackScore: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
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
