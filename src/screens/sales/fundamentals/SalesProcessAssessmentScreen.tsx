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

export default function SalesProcessAssessmentScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'deeper') pts += 33;
    if (q2 === 'authority') pts += 33;
    if (q3 === 'fatigue') pts += 34;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Module Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Comprehensive Assessment</Text>
          <Text style={styles.cardBody}>
            Complete the final assessment to verify your qualification and pipeline strategy understanding:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. What is the recommended strategy when a deal is stalled in the Qualify stage?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'advance' && styles.choiceBtnActive]}
            onPress={() => { setQ1('advance'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Push it to Demo anyway to keep deal pipeline velocity high." (False velocity)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'deeper' && styles.choiceBtnActive]}
            onPress={() => { setQ1('deeper'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Schedule a deeper needs analysis to verify labor costs and operational waste metrics." (Verifies gaps)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. In B2B deal qualification, what is the best indicator of decision authority?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'authority' && styles.choiceBtnActive]}
            onPress={() => { setQ2('authority'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Having a direct next-step meeting scheduled with the VP or Budget Holder." (Confirmed contact)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'interest' && styles.choiceBtnActive]}
            onPress={() => { setQ2('interest'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "The junior operations manager says they are extremely interested in the software." (Low authority)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q3 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>3. Why should you avoid "just checking in" follow-up emails?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'fatigue' && styles.choiceBtnActive]}
            onPress={() => { setQ3('fatigue'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "They fail to add business value and trigger buyer sales fatigue." (Correct strategy)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'long' && styles.choiceBtnActive]}
            onPress={() => { setQ3('long'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "They take too long for modern sales representatives to write." (Incorrect concern)
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
            <Text style={styles.submitBtnText}>Submit Assessment</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Assessment Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **Schedule deeper needs analysis**. Dragging unqualified deals forward wastes sales hours.{"\n"}
              - Q2 correct answer is **VP sync scheduled**. Access to decision-makers reduces closed-lost blockages.{"\n"}
              - Q3 correct answer is **Triggers buyer sales fatigue**. Value touchpoints keep deals warm.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); setQ3(''); }}>
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Return to Hub */}
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
