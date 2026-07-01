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

export default function DocumentFormattingScreen({ navigation }: any) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'justify'>('left');
  const [lineSpacing, setLineSpacing] = useState<number>(1.15);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Formatting</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Character & Paragraph Styles</Text>
          <Text style={styles.cardBody}>
            Proper typography and spacing makes your business documents look polished and highly readable.
          </Text>
          <Text style={styles.cardBody}>
            Use <Text style={{ fontWeight: '800' }}>Bold</Text> to emphasize headings, <Text style={{ fontStyle: 'italic' }}>Italics</Text> for references or notes, and apply <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Justify</Text> alignment to give formal reports clean margins on both sides.
          </Text>
        </View>

        {/* Live Typography Preview Panel */}
        <Text style={styles.sectionTitle}>Interactive Style Playground</Text>
        <Text style={styles.sectionSubtitle}>Toggle styles below to format the paragraph content immediately:</Text>

        <View style={styles.playgroundPanel}>
          {/* Format toolbar */}
          <View style={styles.toolbar}>
            {/* Bold Toggle */}
            <TouchableOpacity
              style={[styles.toolBtn, isBold && styles.toolBtnActive]}
              onPress={() => setIsBold(!isBold)}
            >
              <Ionicons name={"bold" as any} size={16} color={isBold ? COLORS.secondary : COLORS.textDark} />
            </TouchableOpacity>

            {/* Italic Toggle */}
            <TouchableOpacity
              style={[styles.toolBtn, isItalic && styles.toolBtnActive]}
              onPress={() => setIsItalic(!isItalic)}
            >
              <Ionicons name={"italic" as any} size={16} color={isItalic ? COLORS.secondary : COLORS.textDark} />
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Align Left */}
            <TouchableOpacity
              style={[styles.toolBtn, alignment === 'left' && styles.toolBtnActive]}
              onPress={() => setAlignment('left')}
            >
              <Ionicons name={"align-left" as any} size={16} color={alignment === 'left' ? COLORS.secondary : COLORS.textDark} />
            </TouchableOpacity>

            {/* Align Center */}
            <TouchableOpacity
              style={[styles.toolBtn, alignment === 'center' && styles.toolBtnActive]}
              onPress={() => setAlignment('center')}
            >
              <Ionicons name={"align-center" as any} size={16} color={alignment === 'center' ? COLORS.secondary : COLORS.textDark} />
            </TouchableOpacity>

            {/* Align Justify */}
            <TouchableOpacity
              style={[styles.toolBtn, alignment === 'justify' && styles.toolBtnActive]}
              onPress={() => setAlignment('justify')}
            >
              <Ionicons name="filter" size={16} color={alignment === 'justify' ? COLORS.secondary : COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {/* Line spacing control */}
          <View style={styles.spacingControls}>
            <Text style={styles.spacingLabel}>Line Spacing: {lineSpacing}x</Text>
            <View style={styles.spacingBtnRow}>
              {([1.0, 1.15, 1.5, 2.0] as const).map((space) => (
                <TouchableOpacity
                  key={space}
                  style={[styles.spacingBtn, lineSpacing === space && styles.spacingBtnActive]}
                  onPress={() => setLineSpacing(space)}
                >
                  <Text style={[styles.spacingText, lineSpacing === space && styles.spacingTextActive]}>
                    {space}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Document Content View */}
          <View style={styles.pageSheet}>
            <Text style={styles.pageHeading}>Policy Guidelines Memorandum</Text>
            <Text
              style={[
                styles.paragraphText,
                isBold && { fontWeight: '700' },
                isItalic && { fontStyle: 'italic' },
                {
                  textAlign: alignment === 'justify' ? 'justify' : alignment,
                  lineHeight: 14 * lineSpacing * 1.25,
                },
              ]}
            >
              This document outlines the standard operation rules for the training workspace. All instructors are expected to enforce these procedures during sessions. Double-space long memos to increase readability for physical printing audits.
            </Text>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BusinessDocuments')}
        >
          <Text style={styles.nextButtonText}>Proceed to Business Documents</Text>
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
  playgroundPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  toolBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  spacingControls: {
    marginBottom: 16,
  },
  spacingLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  spacingBtnRow: {
    flexDirection: 'row',
  },
  spacingBtn: {
    flex: 1,
    height: 32,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingBtnActive: {
    backgroundColor: COLORS.secondary,
  },
  spacingText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  spacingTextActive: {
    color: COLORS.white,
  },
  pageSheet: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 4,
    padding: 16,
    minHeight: 140,
    ...SHADOWS.light,
  },
  pageHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: FONTS.bold,
  },
  paragraphText: {
    fontSize: 11,
    color: COLORS.textDark,
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
