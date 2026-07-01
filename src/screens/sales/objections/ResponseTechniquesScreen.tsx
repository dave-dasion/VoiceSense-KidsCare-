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

export default function ResponseTechniquesScreen({ navigation }: any) {
  const [step, setStep] = useState<'acknowledge' | 'explore' | 'respond' | 'success'>('acknowledge');
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const handleSelectAcknowledge = (val: string) => {
    if (val === 'correct') {
      setFeedback("Acknowledge Success! You validated their emotional stress, reducing defensive posture.");
      setScore((prev) => prev + 30);
      setStep('explore');
    } else {
      setFeedback("Incorrect Acknowledge. Defensive denials ('we don't do that') increase sales friction.");
    }
  };

  const handleSelectExplore = (val: string) => {
    if (val === 'correct') {
      setFeedback("Explore Success! By asking for their historical context, you uncover their specific SLA requirements.");
      setScore((prev) => prev + 30);
      setStep('respond');
    } else {
      setFeedback("Incorrect Explore. Pitching support documents too early limits discovery insight.");
    }
  };

  const handleSelectRespond = (val: string) => {
    if (val === 'correct') {
      setFeedback("Respond Success! You tailored the SLA response to solve their exact support concern.");
      setScore((prev) => prev + 40);
      setStep('success');
    } else {
      setFeedback("Incorrect Respond. Offering discount concessions does not address support anxiety.");
    }
  };

  const handleReset = () => {
    setStep('acknowledge');
    setFeedback('');
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. LAER Framework</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>The LAER Framework</Text>
          <Text style={styles.cardBody}>
            When objections hit, do not defend. Apply the **LAER** cycle:{"\n"}
            - **Listen**: Focus fully on their speech without interrupting.{"\n"}
            - **Acknowledge**: Validate their concern and respect their emotional state.{"\n"}
            - **Explore**: Ask probing questions to uncover underlying triggers.{"\n"}
            - **Respond**: Deliver a tailored solution addressing their exact concern.
          </Text>
        </View>

        {/* Simulator Grid */}
        <Text style={styles.sectionTitle}>LAER Dialogue Simulator</Text>
        <Text style={styles.sectionSubtitle}>Objection: "Our last software vendor went silent after onboarding. We are terrified of being abandoned again."</Text>

        {feedback !== '' && (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        )}

        {/* Step Acknowledge */}
        {step === 'acknowledge' && (
          <View style={styles.stepPanel}>
            <Text style={styles.stepHeader}>Step 1: Acknowledge Concern</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectAcknowledge('wrong')}>
              <Text style={styles.optionText}>"We are a top-tier provider, our support team never abandons client accounts." (Defensive deny)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectAcknowledge('correct')}>
              <Text style={styles.optionText}>"I understand that completely. Having a system drop operations without support lines is incredibly stressful." (Validates feeling)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step Explore */}
        {step === 'explore' && (
          <View style={styles.stepPanel}>
            <Text style={styles.stepHeader}>Step 2: Explore Details</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectExplore('wrong')}>
              <Text style={styles.optionText}>"Let me email you our standard 40-page Customer Service SLA booklet." (Premature presentation)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectExplore('correct')}>
              <Text style={styles.optionText}>"Can you share what happened with your previous vendor, and what type of support response speed you need to feel secure?" (Explores context)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step Respond */}
        {step === 'respond' && (
          <View style={styles.stepPanel}>
            <Text style={styles.stepHeader}>Step 3: Respond</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectRespond('correct')}>
              <Text style={styles.optionText}>"Since you need rapid support response, we can write a custom 1-hour critical response window into our SLA agreement." (Targeted solution)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleSelectRespond('wrong')}>
              <Text style={styles.optionText}>"I understand. We can offer you a 15% pricing discount on the license fee instead." (Irrelevant price concession)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step Success */}
        {step === 'success' && (
          <View style={styles.successPanel}>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
            <Text style={styles.successTitle}>Dialogue Complete! Score: {score}/100</Text>
            <Text style={styles.successDesc}>
              Excellent. By acknowledging, exploring, and responding, you navigated customer anxiety and secured commercial trust without reducing price metrics.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Restart Dialog</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('NegotiationBasics')}
        >
          <Text style={styles.nextButtonText}>Proceed to Negotiation Basics</Text>
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
  feedbackPanel: {
    backgroundColor: '#EBF8FF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BEE3F8',
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 11,
    color: '#2B6CB0',
    lineHeight: 15,
  },
  stepPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  stepHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  optionBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
  },
  successPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
  },
  resetBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  resetText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
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
