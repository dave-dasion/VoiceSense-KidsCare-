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

export default function ProductKnowledgeAssessmentScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'softmax') pts += 33;
    if (q2 === 'parameters') pts += 33;
    if (q3 === 'cost') pts += 34;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Knowledge Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Technical Assessment</Text>
          <Text style={styles.cardBody}>
            Complete the evaluation quiz below to verify your technical knowledge of our AI model parameters:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. In transformer networks, what is the role of softmax?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'clean' && styles.choiceBtnActive]}
            onPress={() => { setQ1('clean'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To clean raw text character inputs before embedding generation." (Incorrect)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'softmax' && styles.choiceBtnActive]}
            onPress={() => { setQ1('softmax'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "To project vector logit numbers into a probability output distribution." (Correct)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. How does model parameters scale (e.g. 70B vs 7B) impact system performance?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'parameters' && styles.choiceBtnActive]}
            onPress={() => { setQ2('parameters'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Larger parameter scales increase extraction accuracy but slow response speeds." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'hosting' && styles.choiceBtnActive]}
            onPress={() => { setQ2('hosting'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Larger parameter scales decrease overall hardware hosting costs." (Incorrect)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q3 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>3. What is the main driver of B2B ROI for automated text ingestion?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'cost' && styles.choiceBtnActive]}
            onPress={() => { setQ3('cost'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Significantly lower processing unit cost ($0.80 vs $5.00) compared to manual operations." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'index' && styles.choiceBtnActive]}
            onPress={() => { setQ3('index'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Accelerated indexing speed inside enterprise relational databases." (Incorrect)
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
            <Text style={styles.feedbackTitle}>Quiz Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Q1 correct answer is **project vector logit numbers**. Softmax is key to deciding token outputs.{"\n"}
              - Q2 correct answer is **larger parameter scales slow response speeds**. Balance latency vs accuracy based on client workflows.{"\n"}
              - Q3 correct answer is **lower processing unit cost**. Use these metrics to build business proposals.
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
