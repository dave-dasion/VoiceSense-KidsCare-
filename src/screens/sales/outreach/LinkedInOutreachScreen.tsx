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

export default function LinkedInOutreachScreen({ navigation }: any) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [pitchText, setPitchText] = useState<string>('');

  const templates = [
    {
      id: 'personalized',
      title: 'Context-Based Connection Request',
      text: "Hi John, noticed your recent post on route logistics. We built a free dispatch checklist that saved 10hrs/wk for mid-market fleets. Thought it could be useful here. Love to connect! - Alex",
    },
    {
      id: 'generic',
      title: 'Generic Business Pitch',
      text: "Hello John, I am Alex from Metro Soft. I would love to connect with you to discuss scheduling a live product demonstration of our software. We help companies automate route dispatches.",
    },
  ];

  const handleSelectTemplate = (text: string) => {
    setSelectedTemplate(text);
    setPitchText(text);
  };

  const getCharColor = () => {
    if (pitchText.length > 300) return COLORS.danger;
    if (pitchText.length > 250) return COLORS.warning;
    return COLORS.success;
  };

  const getScore = () => {
    if (pitchText.length > 300) return 'Invalid (Over 300 limit)';
    if (pitchText.includes('post on route') || pitchText.includes('checklist')) return 'High Quality (Relevance-focused)';
    if (pitchText === '') return 'Draft a message';
    return 'Low Quality (Generic pitch)';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. LinkedIn Sourcing</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>LinkedIn Connection Limitations</Text>
          <Text style={styles.cardBody}>
            When sending connection requests on LinkedIn, you are restricted to <Text style={{ fontWeight: '800' }}>300 characters</Text>. Use this space to reference shared content, express mutual interests, or offer values.
          </Text>
        </View>

        {/* Pitch Builder Simulator */}
        <Text style={styles.sectionTitle}>LinkedIn Connection Pitch Simulator</Text>
        <Text style={styles.sectionSubtitle}>Select a template below to inspect character fit:</Text>

        {/* Template options */}
        <View style={styles.templateList}>
          {templates.map((tpl) => (
            <TouchableOpacity
              key={tpl.id}
              style={[
                styles.tplCard,
                selectedTemplate === tpl.text && styles.tplCardActive,
              ]}
              onPress={() => handleSelectTemplate(tpl.text)}
            >
              <Text style={styles.tplTitle}>{tpl.title}</Text>
              <Text style={styles.tplText} numberOfLines={2}>{tpl.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Live editor display */}
        <View style={styles.previewPanel}>
          <Text style={styles.previewHeader}>LinkedIn Message Box (Live preview)</Text>
          <View style={styles.textBox}>
            <Text style={styles.previewBodyText}>
              {pitchText || "Select a template above to view character limits..."}
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.qualityLabel}>Quality Assessment: <Text style={{ fontWeight: '700' }}>{getScore()}</Text></Text>
            <Text style={[styles.charCounter, { color: getCharColor() }]}>
              {pitchText.length} / 300 chars
            </Text>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('MultiChannelOutreach')}
        >
          <Text style={styles.nextButtonText}>Proceed to Multichannel Sequences</Text>
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
  templateList: {
    marginBottom: 16,
  },
  tplCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  tplCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#F7FAFC',
  },
  tplTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  tplText: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
  },
  previewPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  previewHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  textBox: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    minHeight: 80,
  },
  previewBodyText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  qualityLabel: {
    fontSize: 11,
    color: COLORS.textDark,
  },
  charCounter: {
    fontSize: 11,
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
