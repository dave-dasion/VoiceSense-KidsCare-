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

export default function ValuePropositionScreen({ navigation }: any) {
  const [profile, setProfile] = useState<string>('clinical healthcare providers');
  const [action, setAction] = useState<string>('automate parsing pipeline logs');
  const [benefit, setBenefit] = useState<string>('cutting processing labor by 80%');

  const profiles = [
    'clinical healthcare providers',
    'fintech compliance managers',
    'legal processing centers',
  ];

  const actions = [
    'automate parsing pipeline logs',
    'audit compliance checklist metrics',
    'extract data layout structures',
  ];

  const benefits = [
    'cutting processing labor by 80%',
    'mitigating compliance audit penalty risks',
    'speeding up data pipelines to 200ms',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Value Proposition Builder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Cohesive Value Framing</Text>
          <Text style={styles.cardBody}>
            An effective pitch statement links target buyer profiles directly with system capabilities and tangible economic outcomes. Build a value statement below:
          </Text>
        </View>

        {/* Slot 1 Profile */}
        <Text style={styles.sectionTitle}>1. Target Buyer Profile</Text>
        <View style={styles.optionsBlock}>
          {profiles.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.optionBtn, profile === p && styles.optionBtnActive]}
              onPress={() => setProfile(p)}
            >
              <Text style={[styles.optionText, profile === p && styles.optionTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Slot 2 Action */}
        <Text style={styles.sectionTitle}>2. Value Action</Text>
        <View style={styles.optionsBlock}>
          {actions.map((a) => (
            <TouchableOpacity
              key={a}
              style={[styles.optionBtn, action === a && styles.optionBtnActive]}
              onPress={() => setAction(a)}
            >
              <Text style={[styles.optionText, action === a && styles.optionTextActive]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Slot 3 Benefit */}
        <Text style={styles.sectionTitle}>3. Economic Outcome</Text>
        <View style={styles.optionsBlock}>
          {benefits.map((b) => (
            <TouchableOpacity
              key={b}
              style={[styles.optionBtn, benefit === b && styles.optionBtnActive]}
              onPress={() => setBenefit(b)}
            >
              <Text style={[styles.optionText, benefit === b && styles.optionTextActive]}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview Panel */}
        <Text style={styles.sectionTitle}>Proposition Statement Preview</Text>
        <View style={styles.previewPanel}>
          <Text style={styles.previewText}>
            "We help <Text style={styles.highlightText}>{profile}</Text> to <Text style={styles.highlightText}>{action}</Text>, thereby <Text style={styles.highlightText}>{benefit}</Text>."
          </Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('IndustryPositioning')}
        >
          <Text style={styles.nextButtonText}>Proceed to Industry Vertical Alignment</Text>
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
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  optionsBlock: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  optionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  optionBtnActive: {
    backgroundColor: COLORS.secondary + '15',
  },
  optionText: {
    fontSize: 11,
    color: COLORS.textDark,
  },
  optionTextActive: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  previewPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  previewText: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  highlightText: {
    fontWeight: '800',
    color: COLORS.secondary,
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
