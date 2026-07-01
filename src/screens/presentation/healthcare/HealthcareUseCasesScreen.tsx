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

export default function HealthcareUseCasesScreen({ navigation }: any) {
  const [selectedCase, setSelectedCase] = useState<string>('charting');

  const cases = [
    {
      id: 'charting',
      title: '🎙️ Medical Charting Assistant',
      metric: 'Save clinicians 2.5 hours daily',
      desc: 'Translates doctor-patient raw conversational audio into structured SOAP (Subjective, Objective, Assessment, Plan) electronic chart entries in real time.',
    },
    {
      id: 'trial',
      title: '🔬 Clinical Trial Ingestion',
      metric: 'Accelerate candidate matching by 75%',
      desc: 'Parses unstructured EHR files, scanning historical patient data against complex clinical trial inclusion criteria rules instantly.',
    },
    {
      id: 'auth',
      title: '📄 Prior Authorization Auditor',
      metric: 'Reduce insurance claim rejections by 40%',
      desc: 'Extracts insurance medical policy criteria from insurer PDF guidelines and matches patient clinical summaries to verify compliance before submission.',
    },
  ];

  const activeCase = cases.find((c) => c.id === selectedCase) || cases[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Healthcare Use Cases</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Targeting Medical Administration</Text>
          <Text style={styles.cardBody}>
            Hospitals face severe clinician burnout and billing inefficiencies. Select a clinical use case below to study its performance values:
          </Text>
        </View>

        {/* Case Cards List */}
        {cases.map((c) => {
          const isActive = c.id === selectedCase;
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.caseCard, isActive && styles.caseCardActive]}
              onPress={() => setSelectedCase(c.id)}
            >
              <Text style={[styles.caseTitle, isActive && styles.caseTitleActive]}>{c.title}</Text>
              <Text style={styles.caseMetric}>{c.metric}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Dynamic Detail Card */}
        <View style={styles.detailCard}>
          <Text style={styles.detailHeader}>Workflow Integration Detail</Text>
          <Text style={styles.detailBody}>{activeCase.desc}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ClinicalWorkflows')}
        >
          <Text style={styles.nextButtonText}>Proceed to Clinical Workflows</Text>
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
  caseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    ...SHADOWS.light,
  },
  caseCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '05',
    borderWidth: 1.5,
  },
  caseTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  caseTitleActive: {
    color: COLORS.secondary,
  },
  caseMetric: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '700',
    marginTop: 4,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 14,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  detailBody: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
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
