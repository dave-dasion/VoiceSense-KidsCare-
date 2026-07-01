import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function WorkplaceOrganizationScreen({ navigation }: any) {
  const [sSteps, setSSteps] = useState<Record<string, boolean>>({
    sort: false,
    set: false,
    shine: false,
    standardize: false,
    sustain: false,
  });

  const toggleStep = (stepKey: string) => {
    setSSteps({
      ...sSteps,
      [stepKey]: !sSteps[stepKey],
    });
  };

  const handleAuditSubmit = () => {
    const allDone = Object.values(sSteps).every((v) => v);
    if (allDone) {
      Alert.alert('Perfect 5S Audit!', 'Workspace organization standards met.');
    } else {
      Alert.alert('Incomplete Audit', 'Please execute all 5S steps to confirm workplace cleanup.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Workplace Organization</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>The Lean 5S Methodology</Text>
          <Text style={styles.cardBody}>
            Originating from manufacturing design, the <Text style={{ fontWeight: '800', color: COLORS.secondary }}>5S system</Text> organizes physical files, digital assets, and desks to eliminate waste, improve safety, and enhance efficiency.
          </Text>
        </View>

        {/* 5S Simulator checklist */}
        <Text style={styles.sectionTitle}>Interactive 5S Audit Checklist</Text>
        <Text style={styles.sectionSubtitle}>Select each phase below to perform a mock workspace audit:</Text>

        <View style={styles.checklistPanel}>
          {/* Sort */}
          <TouchableOpacity style={[styles.stepRow, sSteps.sort && styles.stepRowDone]} onPress={() => toggleStep('sort')}>
            <View style={[styles.checkbox, sSteps.sort && styles.checkboxDone]}>
              {sSteps.sort && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>1. Sort (Seiri)</Text>
              <Text style={styles.stepDesc}>Separate needed items from unneeded files or assets; discard clutter.</Text>
            </View>
          </TouchableOpacity>

          {/* Set */}
          <TouchableOpacity style={[styles.stepRow, sSteps.set && styles.stepRowDone]} onPress={() => toggleStep('set')}>
            <View style={[styles.checkbox, sSteps.set && styles.checkboxDone]}>
              {sSteps.set && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>2. Set in Order (Seiton)</Text>
              <Text style={styles.stepDesc}>Organize remaining items. Give everything a designated storage location.</Text>
            </View>
          </TouchableOpacity>

          {/* Shine */}
          <TouchableOpacity style={[styles.stepRow, sSteps.shine && styles.stepRowDone]} onPress={() => toggleStep('shine')}>
            <View style={[styles.checkbox, sSteps.shine && styles.checkboxDone]}>
              {sSteps.shine && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>3. Shine (Seiso)</Text>
              <Text style={styles.stepDesc}>Clean the work area, tools, and digital folders daily to prevent failures.</Text>
            </View>
          </TouchableOpacity>

          {/* Standardize */}
          <TouchableOpacity style={[styles.stepRow, sSteps.standardize && styles.stepRowDone]} onPress={() => toggleStep('standardize')}>
            <View style={[styles.checkbox, sSteps.standardize && styles.checkboxDone]}>
              {sSteps.standardize && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>4. Standardize (Seiketsu)</Text>
              <Text style={styles.stepDesc}>Create standard checklists and visual markers to maintain first 3 steps.</Text>
            </View>
          </TouchableOpacity>

          {/* Sustain */}
          <TouchableOpacity style={[styles.stepRow, sSteps.sustain && styles.stepRowDone]} onPress={() => toggleStep('sustain')}>
            <View style={[styles.checkbox, sSteps.sustain && styles.checkboxDone]}>
              {sSteps.sustain && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>5. Sustain (Shitsuke)</Text>
              <Text style={styles.stepDesc}>Perform weekly evaluations to review, audit, and sustain compliance long term.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Audit submit CTA */}
        <TouchableOpacity style={styles.auditSubmitBtn} onPress={handleAuditSubmit}>
          <Text style={styles.auditSubmitBtnText}>Submit 5S Audit</Text>
        </TouchableOpacity>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('EmailProductivity')}
        >
          <Text style={styles.nextButtonText}>Proceed to Email Productivity</Text>
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
    marginBottom: 12,
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
  checklistPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  stepRowDone: {
    backgroundColor: '#FAFDFB',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 2,
  },
  auditSubmitBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  auditSubmitBtnText: {
    color: COLORS.white,
    fontSize: 13,
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
