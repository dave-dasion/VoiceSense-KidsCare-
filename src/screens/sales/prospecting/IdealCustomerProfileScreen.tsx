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

export default function IdealCustomerProfileScreen({ navigation }: any) {
  const [industry, setIndustry] = useState<string>('');
  const [companySize, setCompanySize] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [fitScore, setFitScore] = useState<number | null>(null);

  const calculateScore = () => {
    if (!industry || !companySize || !budget) return;
    let score = 0;
    
    // SaaS/Healthcare are high-fit industries in this simulator
    if (industry === 'SaaS' || industry === 'Healthcare') score += 40;
    else score += 20;

    // Mid-market and Enterprise are high-fit sizes
    if (companySize === 'Enterprise') score += 30;
    else if (companySize === 'Mid-Market') score += 25;
    else score += 10;

    // High budget = high fit
    if (budget === 'High') score += 30;
    else if (budget === 'Medium') score += 20;
    else score += 5;

    setFitScore(score);
  };

  const getFitLabel = (score: number) => {
    if (score >= 80) return { label: 'High-Fit Target (Tier 1)', color: COLORS.success };
    if (score >= 50) return { label: 'Moderate-Fit Target (Tier 2)', color: COLORS.warning };
    return { label: 'Low-Fit Target (Tier 3)', color: COLORS.danger };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Ideal Customer Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>What is an ICP?</Text>
          <Text style={styles.cardBody}>
            An <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Ideal Customer Profile (ICP)</Text> defines the type of company that experiences the most value from your solution. Targeting companies matching your ICP boosts close rates.
          </Text>
        </View>

        {/* ICP Configurator */}
        <Text style={styles.sectionTitle}>ICP Configuration Simulator</Text>
        <Text style={styles.sectionSubtitle}>
          Select parameters below to evaluate target customer fit score:
        </Text>

        <View style={styles.configurator}>
          {/* Industry Selection */}
          <Text style={styles.groupLabel}>Target Industry</Text>
          <View style={styles.btnRow}>
            {['Healthcare', 'SaaS', 'Manufacturing', 'Retail'].map((ind) => (
              <TouchableOpacity
                key={ind}
                style={[styles.selectBtn, industry === ind && styles.selectBtnActive]}
                onPress={() => { setIndustry(ind); setFitScore(null); }}
              >
                <Text style={[styles.selectBtnText, industry === ind && styles.selectBtnTextActive]}>
                  {ind}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Company Size */}
          <Text style={styles.groupLabel}>Company Size (Employees)</Text>
          <View style={styles.btnRow}>
            {['1-50 (Startup)', '51-500 (Mid-Market)', '500+ (Enterprise)'].map((sizeLabel) => {
              const val = sizeLabel.includes('Enterprise') ? 'Enterprise' : sizeLabel.includes('Mid-Market') ? 'Mid-Market' : 'Startup';
              return (
                <TouchableOpacity
                  key={sizeLabel}
                  style={[styles.selectBtn, companySize === val && styles.selectBtnActive, { flex: 1 }]}
                  onPress={() => { setCompanySize(val); setFitScore(null); }}
                >
                  <Text style={[styles.selectBtnText, companySize === val && styles.selectBtnTextActive, { fontSize: 10 }]}>
                    {sizeLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Budget tier */}
          <Text style={styles.groupLabel}>Estimated IT/Software Budget</Text>
          <View style={styles.btnRow}>
            {['Low', 'Medium', 'High'].map((tier) => (
              <TouchableOpacity
                key={tier}
                style={[styles.selectBtn, budget === tier && styles.selectBtnActive]}
                onPress={() => { setBudget(tier); setFitScore(null); }}
              >
                <Text style={[styles.selectBtnText, budget === tier && styles.selectBtnTextActive]}>
                  {tier}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Calculate Btn */}
          <TouchableOpacity
            style={[styles.calcBtn, (!industry || !companySize || !budget) && styles.calcBtnDisabled]}
            disabled={!industry || !companySize || !budget}
            onPress={calculateScore}
          >
            <Text style={styles.calcBtnText}>Analyze Profile Fit</Text>
          </TouchableOpacity>
        </View>

        {/* Score Panel */}
        {fitScore !== null && (
          <View style={styles.scorePanel}>
            <Text style={styles.scoreTitle}>ICP Fitness Match</Text>
            <Text style={[styles.scoreNumber, { color: getFitLabel(fitScore).color }]}>{fitScore}%</Text>
            <Text style={[styles.scoreLabel, { color: getFitLabel(fitScore).color }]}>
              {getFitLabel(fitScore).label}
            </Text>
            <Text style={styles.scoreDescription}>
              {fitScore >= 80 
                ? "This company matches the primary sweet spot of budget, scale, and sector. Prioritize for high-value sales sequences."
                : fitScore >= 50 
                ? "Moderate match. Worth pitching, but allocate secondary resources behind Tier 1 leads."
                : "Low match. High likelihood of budget constraints or lack of need. De-prioritize this prospect."}
            </Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('LeadResearch')}
        >
          <Text style={styles.nextButtonText}>Proceed to Lead Research</Text>
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
  configurator: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 6,
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  selectBtn: {
    flex: 1,
    height: 38,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderColor: COLORS.secondary,
  },
  selectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectBtnTextActive: {
    color: COLORS.secondary,
  },
  calcBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...SHADOWS.light,
  },
  calcBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  calcBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  scorePanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  scoreTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: '900',
    marginVertical: 4,
    fontFamily: FONTS.bold,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10,
  },
  scoreDescription: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
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
