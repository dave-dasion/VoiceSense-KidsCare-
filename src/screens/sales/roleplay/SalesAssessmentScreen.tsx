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

export default function SalesAssessmentScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [q4, setQ4] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'filter') pts += 25;
    if (q2 === 'validate') pts += 25;
    if (q3 === 'extend') pts += 25;
    if (q4 === 'value') pts += 25;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Module Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Module Graduation Exam</Text>
          <Text style={styles.cardBody}>
            Complete the final exam to unlock your Sales Outreach & Communication Training certificate:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. What is the primary purpose of Ideal Customer Profile fit scoring?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'filter' && styles.choiceBtnActive]}
            onPress={() => { setQ1('filter'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To filter out low-probability prospects before scheduling outreach touches." (Correct strategy)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'demo' && styles.choiceBtnActive]}
            onPress={() => { setQ1('demo'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To demo all features on your initial call." (False priority)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. In the LAER framework, what does "Acknowledge" mean?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'validate' && styles.choiceBtnActive]}
            onPress={() => { setQ2('validate'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Validating the customer's feeling or concern before responding." (Correct strategy)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'discount' && styles.choiceBtnActive]}
            onPress={() => { setQ2('discount'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Instantly offering a 10% price discount." (False strategy)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q3 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>3. Which is a low-cost, high-value concession during negotiation?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'discount' && styles.choiceBtnActive]}
            onPress={() => { setQ3('discount'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Giving a 20% discount on the licensing fee." (High cost concession)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'extend' && styles.choiceBtnActive]}
            onPress={() => { setQ3('extend'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Extending payment terms to 60 days to support buyer accounting schedules." (Correct strategy)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q4 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>4. How should a cold call begin when a prospect has limited time?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q4 === 'value' && styles.choiceBtnActive]}
            onPress={() => { setQ4('value'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "State value immediately and request 10 minutes next week." (Correct strategy)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q4 === 'slide' && styles.choiceBtnActive]}
            onPress={() => { setQ4('slide'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Present a comprehensive product slide deck." (False strategy)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!q1 || !q2 || !q3 || !q4) && styles.submitBtnDisabled]}
            disabled={!q1 || !q2 || !q3 || !q4}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Submit Graduation Exam</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Graduation Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **Filter low-probability prospects**. ICP filters save sales outreach bandwidth.{"\n"}
              - Q2 correct answer is **Validating customer concern**. Building alignment minimizes buyer anxiety.{"\n"}
              - Q3 correct answer is **Extending payment terms**. Low-cost concessions protect profit margins.{"\n"}
              - Q4 correct answer is **State value, request 10 min sync**. Natural respect for client calendars increases reply rate.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); setQ3(''); setQ4(''); }}>
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
