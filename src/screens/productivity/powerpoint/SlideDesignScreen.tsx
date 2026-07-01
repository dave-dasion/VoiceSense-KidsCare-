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

export default function SlideDesignScreen({ navigation }: any) {
  const [themeMode, setThemeMode] = useState<'Dark' | 'Light' | 'Poor'>('Dark');
  const [textSize, setTextSize] = useState<number>(24);

  const themeColors = {
    Dark: { bg: COLORS.primary, text: COLORS.white, contrast: 'Excellent (Pass)' },
    Light: { bg: COLORS.white, text: COLORS.textDark, contrast: 'Excellent (Pass)' },
    Poor: { bg: '#A0AEC0', text: '#718096', contrast: 'Poor (Fail - low contrast)' },
  };

  const currentTheme = themeColors[themeMode];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Slide Design</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>The 60-30-10 Layout Rule</Text>
          <Text style={styles.cardBody}>
            Great slides prioritize readability. A golden rule is to use high contrast colors: 60% dominant color (background), 30% structural text, and 10% accent highlights.
          </Text>
          <Text style={styles.cardBody}>
            Maintain text sizes: Headings should be at least <Text style={{ fontWeight: '800' }}>32pt</Text> and body bullets at least <Text style={{ fontWeight: '800' }}>18pt</Text> to ensure readability from the back of presentation rooms.
          </Text>
        </View>

        {/* Interactive Slide Simulator */}
        <Text style={styles.sectionTitle}>Interactive Slide Preview Checker</Text>
        <Text style={styles.sectionSubtitle}>Toggle styles below to audit readability metrics on the mock slide sheet:</Text>

        <View style={styles.simulatorPanel}>
          {/* Theme Mode Toggle */}
          <Text style={styles.controlLabel}>Slide Color Contrast Theme:</Text>
          <View style={styles.toggleRow}>
            {(['Dark', 'Light', 'Poor'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.toggleBtn, themeMode === mode && styles.toggleBtnActive]}
                onPress={() => setThemeMode(mode)}
              >
                <Text style={[styles.toggleText, themeMode === mode && styles.toggleTextActive]}>{mode} Theme</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Font Size Selector */}
          <Text style={[styles.controlLabel, { marginTop: 16 }]}>Body Text Size: {textSize}pt</Text>
          <View style={styles.toggleRow}>
            {([14, 18, 24, 32] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.toggleBtn, textSize === size && styles.toggleBtnActive]}
                onPress={() => setTextSize(size)}
              >
                <Text style={[styles.toggleText, textSize === size && styles.toggleTextActive]}>{size}pt</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Visual Slide mockup */}
          <View style={styles.previewContainer}>
            <View style={[styles.slideCanvas, { backgroundColor: currentTheme.bg }]}>
              <Text style={[styles.slideHeader, { color: currentTheme.text }]}>
                Design Audit Presentation
              </Text>
              <Text style={[styles.slideBody, { color: currentTheme.text, fontSize: textSize * 0.75 }]}>
                • High contrast ensures reading compliance.
              </Text>
              <Text style={[styles.slideBody, { color: currentTheme.text, fontSize: textSize * 0.75 }]}>
                • Keep bullet lines short and readable.
              </Text>
            </View>

            {/* Audit Results Panel */}
            <View style={styles.auditStatus}>
              <View style={styles.auditRow}>
                <Text style={styles.auditLabel}>Contrast Check:</Text>
                <Text
                  style={[
                    styles.auditVal,
                    themeMode === 'Poor' ? { color: COLORS.danger } : { color: COLORS.success },
                  ]}
                >
                  {currentTheme.contrast}
                </Text>
              </View>
              <View style={styles.auditRow}>
                <Text style={styles.auditLabel}>Text Sizing Check:</Text>
                <Text
                  style={[
                    styles.auditVal,
                    textSize < 18 ? { color: COLORS.danger } : { color: COLORS.success },
                  ]}
                >
                  {textSize < 18 ? 'Too Small (Fail < 18pt)' : 'Sufficient (Pass)'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('PresentationBuilding')}
        >
          <Text style={styles.nextButtonText}>Proceed to Slide Building</Text>
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
  simulatorPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  toggleTextActive: {
    color: COLORS.secondary,
  },
  previewContainer: {
    marginTop: 20,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slideCanvas: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    padding: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  slideHeader: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  slideBody: {
    fontSize: 11,
    marginBottom: 4,
  },
  auditStatus: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  auditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  auditLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  auditVal: {
    fontSize: 11,
    fontWeight: '800',
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
