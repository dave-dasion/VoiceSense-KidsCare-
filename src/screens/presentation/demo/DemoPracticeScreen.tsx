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

export default function DemoPracticeScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const getScore = () => {
    let pts = 0;
    if (q1 === 'recap') pts += 33;
    if (q2 === 'zoom') pts += 33;
    if (q3 === 'docker') pts += 34;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>5. Practice Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Demo Delivery Evaluation</Text>
          <Text style={styles.cardBody}>
            Verify your presentation calibration parameters by completing this final practice assessment quiz:
          </Text>
        </View>

        {/* Q1 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>1. How should a salesperson initiate the demonstration screen share?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'screenshare' && styles.choiceBtnActive]}
            onPress={() => { setQ1('screenshare'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Share the screen instantly and start walking through the feature sidebar menu list." (Incorrect)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q1 === 'recap' && styles.choiceBtnActive]}
            onPress={() => { setQ1('recap'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Set context first: recap the discovery gaps, align timebox scopes, and verify agendas." (Correct)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q2 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>2. What is the recommended display presentation configuration?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'zoom' && styles.choiceBtnActive]}
            onPress={() => { setQ2('zoom'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Zoom browser to 125%, move cursor slowly, and hold clicks deliberately." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q2 === 'logs' && styles.choiceBtnActive]}
            onPress={() => { setQ2('logs'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Keep the viewport zoomed out completely and scroll quickly between panels to show speed." (Incorrect)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Q3 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>3. How should you address direct compliance or security concerns during a demo?</Text>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'docker' && styles.choiceBtnActive]}
            onPress={() => { setQ3('docker'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Explain isolated local VPC container packaging and data storage memory purges." (Correct)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, q3 === 'cloud' && styles.choiceBtnActive]}
            onPress={() => { setQ3('cloud'); setSubmitted(false); }}
          >
            <Text style={styles.choiceText}>
              "Guarantee data safety simply by referencing general platform cloud password encryptions." (Incorrect)
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
              - Q1 correct answer is **recap discovery gaps**. Establish a foundation before doing a screen walk-through.{"\n"}
              - Q2 correct answer is **zoom to 125%**. Maintain visibility and a slow pace for viewers.{"\n"}
              - Q3 correct answer is **isolated local VPC container packaging**. This satisfies corporate IT security.
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
