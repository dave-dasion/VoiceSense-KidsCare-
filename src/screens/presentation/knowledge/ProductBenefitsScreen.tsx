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

export default function ProductBenefitsScreen({ navigation }: any) {
  const [invoices, setInvoices] = useState<number>(2000);

  const manualCost = invoices * 5.00;
  const aiCost = invoices * 0.80;
  const netSavings = manualCost - aiCost;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Cost vs ROI Savings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Quantifying Financial Impact</Text>
          <Text style={styles.cardBody}>
            B2B buyers care about cost reduction. Compare legacy manual paper invoice processing costs ($5.00/unit) against automated ingestion ($0.80/unit).
          </Text>
        </View>

        {/* Volume selector */}
        <Text style={styles.sectionTitle}>Invoice Volume Ingestion</Text>
        <Text style={styles.sectionSubtitle}>Select average monthly volume to run projections:</Text>
        
        <View style={styles.volumeRow}>
          {[500, 2000, 5000].map((vol) => (
            <TouchableOpacity
              key={vol}
              style={[styles.volBtn, invoices === vol && styles.volBtnActive]}
              onPress={() => setInvoices(vol)}
            >
              <Text style={[styles.volText, invoices === vol && styles.volTextActive]}>
                {vol.toLocaleString()} / mo
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calculator score block */}
        <View style={styles.calcPanel}>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Legacy Manual cost ($5.00/unit):</Text>
            <Text style={styles.calcVal}>${manualCost.toLocaleString()}</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Automated AI cost ($0.80/unit):</Text>
            <Text style={styles.calcVal}>${aiCost.toLocaleString()}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.savingsRow}>
            <Text style={styles.savingsLabel}>Net Operational Savings:</Text>
            <Text style={styles.savingsValue}>${netSavings.toLocaleString()} / mo</Text>
          </View>
        </View>

        {/* Graph representation */}
        <View style={styles.graphPanel}>
          <Text style={styles.graphTitle}>Monthly Cost Comparison</Text>
          
          <Text style={styles.barLabel}>Manual System (${manualCost.toLocaleString()})</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillManual, { width: '100%' }]} />
          </View>

          <Text style={styles.barLabel}>AI Automated System (${aiCost.toLocaleString()})</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillAI, { width: `${(aiCost / manualCost) * 100}%` }]} />
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProductKnowledgeAssessment')}
        >
          <Text style={styles.nextButtonText}>Proceed to Sub-Module Assessment</Text>
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
  volumeRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  volBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    ...SHADOWS.light,
  },
  volBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  volText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  volTextActive: {
    color: COLORS.secondary,
  },
  calcPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  calcLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  calcVal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  savingsValue: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.success,
  },
  graphPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  graphTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  barBg: {
    height: 12,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    width: '100%',
    marginBottom: 16,
    overflow: 'hidden',
  },
  barFillManual: {
    height: '100%',
    backgroundColor: COLORS.danger,
    borderRadius: 6,
  },
  barFillAI: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 6,
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
