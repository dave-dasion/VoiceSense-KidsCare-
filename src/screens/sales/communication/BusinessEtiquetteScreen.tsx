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

export default function BusinessEtiquetteScreen({ navigation }: any) {
  const [selections, setSelections] = useState<Record<string, string>>({
    comp: '',
    price: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (key: string, option: string) => {
    if (submitted) return;
    setSelections({
      ...selections,
      [key]: option,
    });
  };

  const getScore = () => {
    let score = 0;
    if (selections.comp === 'differentiate') score += 50;
    if (selections.price === 'transparent') score += 50;
    return score;
  };

  const getEtiquetteLevel = (score: number) => {
    if (score === 100) return { label: 'High Etiquette Protocol (Passed)', color: COLORS.success };
    if (score === 50) return { label: 'Moderate Protocol (Needs Work)', color: COLORS.warning };
    return { label: 'Low Protocol (Failed)', color: COLORS.danger };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Business Etiquette</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Corporate Communication Codes</Text>
          <Text style={styles.cardBody}>
            Ethical sales behavior commands trust. Avoid badmouthing competitors or hiding basic pricing frameworks. Treat clients as collaborative partners.
          </Text>
        </View>

        {/* Etiquette Simulator */}
        <Text style={styles.sectionTitle}>Etiquette Decision Simulator</Text>
        <Text style={styles.sectionSubtitle}>Select the professional response for each business scenario:</Text>

        {/* Competitor Scenario */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioHeader}>Scenario 1: Prospect asks, "Why should I buy you over Competitor X?"</Text>
          <TouchableOpacity
            style={[
              styles.choiceBtn,
              selections.comp === 'slander' && styles.choiceBtnActive,
              submitted && selections.comp === 'slander' && styles.choiceBtnWrong,
            ]}
            onPress={() => handleSelect('comp', 'slander')}
          >
            <Text style={styles.choiceText}>
              "Competitor X has buggy code, slow servers, and their support is awful." (Negative slander approach)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.choiceBtn,
              selections.comp === 'differentiate' && styles.choiceBtnActive,
              submitted && selections.comp === 'differentiate' && styles.choiceBtnCorrect,
            ]}
            onPress={() => handleSelect('comp', 'differentiate')}
          >
            <Text style={styles.choiceText}>
              "Competitor X makes a good retail tracker. We specialize specifically in regional medical fleet dispatches." (Professional differentiation)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pricing Scenario */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioHeader}>Scenario 2: Prospect asks, "How much does it cost? Give me a rate now."</Text>
          <TouchableOpacity
            style={[
              styles.choiceBtn,
              selections.price === 'secretive' && styles.choiceBtnActive,
              submitted && selections.price === 'secretive' && styles.choiceBtnWrong,
            ]}
            onPress={() => handleSelect('price', 'secretive')}
          >
            <Text style={styles.choiceText}>
              "Our pricing is strictly confidential. I cannot share anything until we sign an NDA." (Secretive / High-friction approach)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.choiceBtn,
              selections.price === 'transparent' && styles.choiceBtnActive,
              submitted && selections.price === 'transparent' && styles.choiceBtnCorrect,
            ]}
            onPress={() => handleSelect('price', 'transparent')}
          >
            <Text style={styles.choiceText}>
              "For fleets of your size, rates typically range between $500 and $1,200/mo. I'll share exact rates after we check dashboard usage details." (Transparent brackets approach)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!selections.comp || !selections.price) && styles.submitBtnDisabled]}
            disabled={!selections.comp || !selections.price}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Verify Etiquette Alignment</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackHeader}>Etiquette Assessment Report</Text>
            <Text style={[styles.feedbackScore, { color: getEtiquetteLevel(getScore()).color }]}>
              {getEtiquetteLevel(getScore()).label}
            </Text>
            <Text style={styles.feedbackDesc}>
              - Slandering competitors destroys credibility. Highlight your core niche specialization instead.{"\n"}
              - Hiding price ranges frustrates buyers. Providing brackets with qualification criteria builds trust.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setSelections({ comp: '', price: '' }); }}>
              <Text style={styles.resetText}>Try Scenario Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ActiveListening')}
        >
          <Text style={styles.nextButtonText}>Proceed to Active Listening</Text>
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
  scenarioHeader: {
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
  choiceBtnCorrect: {
    borderColor: COLORS.success,
    backgroundColor: '#FAFDFB',
  },
  choiceBtnWrong: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF5F5',
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
  feedbackHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  feedbackScore: {
    fontSize: 13,
    fontWeight: '800',
    marginVertical: 4,
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
