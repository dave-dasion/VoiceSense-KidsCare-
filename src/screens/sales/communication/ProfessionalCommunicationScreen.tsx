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

export default function ProfessionalCommunicationScreen({ navigation }: any) {
  const [speed, setSpeed] = useState<'Slow' | 'Moderate' | 'Fast'>('Moderate');
  const [noBuzzwords, setNoBuzzwords] = useState(false);
  const [valueEarly, setValueEarly] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getPitchGrade = () => {
    let score = 0;
    if (speed === 'Moderate') score += 40;
    else score += 15;

    if (noBuzzwords) score += 30;
    if (valueEarly) score += 30;

    if (score >= 90) return { grade: 'A', desc: 'Highly professional. Pacing is natural, statements focus on value rather than empty hype, and the ask is clear.', color: COLORS.success };
    if (score >= 60) return { grade: 'B', desc: 'Acceptable speech layout. Try to drop industry buzzwords or adjust pacing to improve trust score.', color: COLORS.warning };
    return { grade: 'D', desc: 'Rushed or hype-filled pitch. Fast pacing causes prospect stress; empty buzzwords lower corporate authority.', color: COLORS.danger };
  };

  const getPitchSnippet = () => {
    let base = "We offer a route dispatch software. It has database backups and uses machine learning AI algorithms to run logistics optimization panels.";
    if (noBuzzwords) {
      base = "We offer a route dispatch portal that automates schedule coordination and handles fleet routing logistics.";
    }
    if (valueEarly) {
      base = "We help fleet operators reduce route dispatch delays by 20% using an automated routing portal.";
    }
    if (noBuzzwords && valueEarly) {
      base = "We help fleet operators cut dispatch errors by 20% and automate driver coordinate templates. Love to share how other regional hubs set this up.";
    }
    return base;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Professional Speech</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Voice Pacing & Clarity</Text>
          <Text style={styles.cardBody}>
            When speaking over the phone, pacing, clarity, and simplicity determine authority. Rushing your voice (Fast) or using empty buzzwords ("AI machine learning optimization") triggers defense mechanisms.
          </Text>
        </View>

        {/* Pitch playground */}
        <Text style={styles.sectionTitle}>Speech Structure Designer</Text>
        <Text style={styles.sectionSubtitle}>Toggle formatting controls to restructure your opening pitch statement:</Text>

        <View style={styles.playground}>
          {/* Pacing Speed */}
          <Text style={styles.label}>Pacing speed (Words per minute):</Text>
          <View style={styles.speedRow}>
            {(['Slow', 'Moderate', 'Fast'] as const).map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.speedBtn, speed === s && styles.speedBtnActive]}
                onPress={() => { setSpeed(s); setSubmitted(false); }}
              >
                <Text style={[styles.speedText, speed === s && styles.speedTextActive]}>
                  {s} {s === 'Moderate' ? '(130 WPM)' : s === 'Slow' ? '(100 WPM)' : '(180 WPM)'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Toggles */}
          <Text style={styles.label}>Content Filters:</Text>
          <TouchableOpacity
            style={[styles.toggleRow, noBuzzwords && styles.toggleRowActive]}
            onPress={() => { setNoBuzzwords(!noBuzzwords); setSubmitted(false); }}
          >
            <Ionicons
              name={noBuzzwords ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={noBuzzwords ? COLORS.success : COLORS.textLight}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.toggleLabel}>Eliminate AI Buzzwords (Simplify language)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleRow, valueEarly && styles.toggleRowActive]}
            onPress={() => { setValueEarly(!valueEarly); setSubmitted(false); }}
          >
            <Ionicons
              name={valueEarly ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={valueEarly ? COLORS.success : COLORS.textLight}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.toggleLabel}>Lead with quantifiable business value (20% reduction)</Text>
          </TouchableOpacity>

          {/* Result preview */}
          <View style={styles.speechBubble}>
            <Text style={styles.speechTitle}>Your Speech Draft:</Text>
            <Text style={styles.speechText}>"{getPitchSnippet()}"</Text>
            <Text style={styles.pacingIndicator}>Delivery speed: <Text style={{ fontWeight: '700' }}>{speed}</Text></Text>
          </View>

          <TouchableOpacity style={styles.analyzeBtn} onPress={() => setSubmitted(true)}>
            <Text style={styles.analyzeBtnText}>Evaluate Pitch Grade</Text>
          </TouchableOpacity>
        </View>

        {/* Grade Card */}
        {submitted && (
          <View style={styles.gradePanel}>
            <View style={styles.gradeHeader}>
              <Text style={styles.gradeTitle}>Speech Assessment Grade</Text>
              <Text style={[styles.gradeBadge, { color: getPitchGrade().color }]}>
                {getPitchGrade().grade}
              </Text>
            </View>
            <Text style={styles.gradeDesc}>{getPitchGrade().desc}</Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BusinessEtiquette')}
        >
          <Text style={styles.nextButtonText}>Proceed to Business Etiquette</Text>
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
  playground: {
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
    marginTop: 6,
  },
  speedRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  speedBtn: {
    flex: 1,
    height: 36,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  speedBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
  },
  speedText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  speedTextActive: {
    color: COLORS.secondary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  toggleRowActive: {
    backgroundColor: '#FAFDFB',
  },
  toggleLabel: {
    fontSize: 11,
    color: COLORS.textDark,
  },
  speechBubble: {
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  speechTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  speechText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  pacingIndicator: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 8,
  },
  analyzeBtn: {
    backgroundColor: COLORS.secondary,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    ...SHADOWS.light,
  },
  analyzeBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  gradePanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  gradeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  gradeBadge: {
    fontSize: 24,
    fontWeight: '900',
  },
  gradeDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
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
