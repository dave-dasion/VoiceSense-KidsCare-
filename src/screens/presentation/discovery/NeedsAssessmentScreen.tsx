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

export default function NeedsAssessmentScreen({ navigation }: any) {
  const [hours, setHours] = useState<number>(100);

  const wage = 25;
  const currentCost = hours * wage;
  const aiCost = currentCost * 0.15; // 85% saving efficiency
  const savings = currentCost - aiCost;
  const hoursSaved = hours * 0.85;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Needs Assessment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Quantifying Manual Overhead</Text>
          <Text style={styles.cardBody}>
            Find the operational gap. Measure staff hours spent manually indexing files against the target efficiency of our AI pipeline:
          </Text>
        </View>

        {/* Input Selector */}
        <Text style={styles.sectionTitle}>Weekly Staff Hours spent on Manual Entries</Text>
        <View style={styles.selectorRow}>
          {[40, 100, 250].map((h) => (
            <TouchableOpacity
              key={h}
              style={[styles.selectBtn, hours === h && styles.selectBtnActive]}
              onPress={() => setHours(h)}
            >
              <Text style={[styles.selectBtnText, hours === h && styles.selectBtnTextActive]}>
                {h} Hours / wk
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Auditor Card */}
        <View style={styles.auditorCard}>
          <View style={styles.auditRow}>
            <Text style={styles.auditLabel}>Manual Operating Cost:</Text>
            <Text style={styles.auditVal}>${currentCost.toLocaleString()} / wk</Text>
          </View>
          <View style={styles.auditRow}>
            <Text style={styles.auditLabel}>AI Augmented Cost:</Text>
            <Text style={styles.auditVal}>${aiCost.toLocaleString()} / wk</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.highlightRow}>
            <View>
              <Text style={styles.highlightLabel}>Weekly Saved Hours:</Text>
              <Text style={styles.highlightValText}>{hoursSaved.toFixed(1)} hrs</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.highlightLabel}>Weekly Value Saved:</Text>
              <Text style={[styles.highlightValText, { color: COLORS.success }]}>
                ${savings.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SolutionMapping')}
        >
          <Text style={styles.nextButtonText}>Proceed to Solution Mapping</Text>
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
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  selectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  selectBtn: {
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
  selectBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
  },
  selectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectBtnTextActive: {
    color: COLORS.secondary,
  },
  auditorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  auditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  auditLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  auditVal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  highlightValText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
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
