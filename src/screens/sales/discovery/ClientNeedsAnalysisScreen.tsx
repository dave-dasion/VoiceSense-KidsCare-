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

export default function ClientNeedsAnalysisScreen({ navigation }: any) {
  const [laborHours, setLaborHours] = useState<number>(8);
  const [errorRate, setErrorRate] = useState<number>(15);
  const [calculated, setCalculated] = useState(false);

  const hourlyRate = 25; // standard dispatcher cost
  const errorCost = 150; // cost per dispatch error

  const calculateGapMetrics = () => {
    setCalculated(true);
  };

  const monthlyLaborCost = laborHours * 22 * hourlyRate; // 22 work days
  const monthlyErrorCost = Math.round((errorRate / 100) * 500 * errorCost); // assuming 500 dispatches/mo
  const totalCurrentCost = monthlyLaborCost + monthlyErrorCost;

  // Proposed state: 1 hour labor, 2% error rate
  const proposedLabor = 1 * 22 * hourlyRate;
  const proposedError = Math.round((2 / 100) * 500 * errorCost);
  const totalProposedCost = proposedLabor + proposedError;

  const potentialSavings = totalCurrentCost - totalProposedCost;
  const paybackPeriod = Math.round((8000 / potentialSavings) * 10) / 10; // assuming $8k license cost

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Needs Gap Analysis</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Gap Analysis Mapping</Text>
          <Text style={styles.cardBody}>
            Value selling relies on mapping the <Text style={{ fontWeight: '800' }}>Gap</Text> between a client's Current State (high labor cost, high errors) and their Desired State (automated, optimized). This gap justifies your software's price tag.
          </Text>
        </View>

        {/* Simulator Panel */}
        <Text style={styles.sectionTitle}>Operations Gap Simulator</Text>
        <Text style={styles.sectionSubtitle}>Adjust client metrics to simulate financial waste and software ROI:</Text>

        <View style={styles.simulatorCard}>
          {/* Labor Hours selector */}
          <Text style={styles.label}>Daily Dispatch Labor Spent: <Text style={{ color: COLORS.secondary }}>{laborHours} Hours</Text></Text>
          <View style={styles.btnRow}>
            {[2, 4, 8, 12].map((h) => (
              <TouchableOpacity
                key={h}
                style={[styles.selectBtn, laborHours === h && styles.selectBtnActive]}
                onPress={() => { setLaborHours(h); setCalculated(false); }}
              >
                <Text style={[styles.selectText, laborHours === h && styles.selectTextActive]}>{h} hrs</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Error Rate selector */}
          <Text style={styles.label}>Current Dispatch Error Rate: <Text style={{ color: COLORS.secondary }}>{errorRate}%</Text></Text>
          <View style={styles.btnRow}>
            {[5, 10, 15, 20].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.selectBtn, errorRate === r && styles.selectBtnActive]}
                onPress={() => { setErrorRate(r); setCalculated(false); }}
              >
                <Text style={[styles.selectText, errorRate === r && styles.selectTextActive]}>{r}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.calcBtn} onPress={calculateGapMetrics}>
            <Text style={styles.calcBtnText}>Analyze Operations Gap</Text>
          </TouchableOpacity>
        </View>

        {/* ROI Metrics output */}
        {calculated && (
          <View style={styles.metricsCard}>
            <Text style={styles.metricsHeader}>Gap Analysis & ROI Report</Text>
            
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Current Monthly Cost Waste:</Text>
              <Text style={styles.metricVal}>${totalCurrentCost.toLocaleString()}</Text>
            </View>

            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Estimated Monthly Savings:</Text>
              <Text style={[styles.metricVal, { color: COLORS.success }]}>${potentialSavings.toLocaleString()}</Text>
            </View>

            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Payback Period ($8K License):</Text>
              <Text style={styles.metricVal}>{paybackPeriod} Months</Text>
            </View>

            <Text style={styles.roiSummary}>
              "By automating dispatch operations, Metro Logistics stands to save **${potentialSavings.toLocaleString()}/mo** in combined labor and shipping claims. The software license pays for itself in just **{paybackPeriod} months**."
            </Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DiscoveryQuestions')}
        >
          <Text style={styles.nextButtonText}>Proceed to Discovery Questions</Text>
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
  simulatorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  selectBtn: {
    flex: 1,
    height: 34,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  selectText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectTextActive: {
    color: COLORS.secondary,
  },
  calcBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...SHADOWS.light,
  },
  calcBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  metricsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  metricsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  roiSummary: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
    marginTop: 14,
    fontStyle: 'italic',
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
