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

export default function RequirementGatheringScreen({ navigation }: any) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const checklist = [
    { id: 'legacy', label: 'Identify legacy systems of record (e.g. EPIC, SAP ERP, Oracle database).' },
    { id: 'compliance', label: 'Verify strict compliance constraints (HIPAA, GDPR, SOC2 Type II).' },
    { id: 'format', label: 'Audit input formats (scanned image PDFs, API text, audio recordings).' },
    { id: 'throughput', label: 'Determine peak daily throughput speed and token volume thresholds.' },
    { id: 'hardware', label: 'Confirm internal GPU cloud hosting availability (A10G/H100 instances).' },
  ];

  const toggleCheck = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Requirement Gathering</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Technical Discovery Audits</Text>
          <Text style={styles.cardBody}>
            Failing to audit client database capabilities leads to stalled onboarding cycles. Check off the requirements gathered to check audit status:
          </Text>
        </View>

        {/* Checklist */}
        <Text style={styles.sectionTitle}>Discovery checklist</Text>
        <View style={styles.checklistPanel}>
          {checklist.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.checkRow, isChecked && styles.checkRowActive]}
                onPress={() => toggleCheck(item.id)}
              >
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={20}
                  color={isChecked ? COLORS.secondary : COLORS.textLight}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.checkText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Audit Completion</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${(checkedItems.length / checklist.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {checkedItems.length} of {checklist.length} core infrastructure parameters verified.
          </Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('NeedsAssessment')}
        >
          <Text style={styles.nextButtonText}>Proceed to Needs Assessment</Text>
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
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  checklistPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  checkRowActive: {
    backgroundColor: '#FAFDFB',
  },
  checkText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  progressTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  barBg: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 11,
    color: COLORS.textLight,
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
