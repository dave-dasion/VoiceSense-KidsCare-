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

export default function WordBasicsScreen({ navigation }: any) {
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>('Portrait');
  const [marginSize, setMarginSize] = useState<'Normal' | 'Narrow' | 'Wide'>('Normal');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Word Basics</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Ribbon Interface & Page Setup</Text>
          <Text style={styles.cardBody}>
            The Microsoft Word interface organizes tools into tabs at the top, collectively called the <Text style={{ fontWeight: '800' }}>Ribbon</Text> (Home, Insert, Layout, etc.).
          </Text>
          <Text style={styles.cardBody}>
            Before writing a document, it's vital to configure the <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Layout</Text>. Setting margins (white space around text borders) and page orientation determines how content splits across page sheets.
          </Text>
        </View>

        {/* Live Layout Simulator */}
        <Text style={styles.sectionTitle}>Interactive Page Setup Simulator</Text>
        <Text style={styles.sectionSubtitle}>Toggle orientations and margins below to see how the layout updates:</Text>

        <View style={styles.simulatorPanel}>
          {/* Orientation Toggles */}
          <Text style={styles.controlLabel}>Page Orientation:</Text>
          <View style={styles.toggleRow}>
            {(['Portrait', 'Landscape'] as const).map((orient) => (
              <TouchableOpacity
                key={orient}
                style={[styles.toggleBtn, orientation === orient && styles.toggleBtnActive]}
                onPress={() => setOrientation(orient)}
              >
                <Ionicons
                  name={orient === 'Portrait' ? 'document-outline' : 'document-text-outline'}
                  size={14}
                  color={orientation === orient ? COLORS.secondary : COLORS.textLight}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.toggleText, orientation === orient && styles.toggleTextActive]}>{orient}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Margins Toggles */}
          <Text style={[styles.controlLabel, { marginTop: 16 }]}>Margin Size:</Text>
          <View style={styles.toggleRow}>
            {(['Normal', 'Narrow', 'Wide'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.toggleBtn, marginSize === size && styles.toggleBtnActive]}
                onPress={() => setMarginSize(size)}
              >
                <Text style={[styles.toggleText, marginSize === size && styles.toggleTextActive]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Visual Sheet Preview representation */}
          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>Document Sheet Preview</Text>
            <View
              style={[
                styles.pageSheet,
                orientation === 'Landscape' ? styles.pageLandscape : styles.pagePortrait,
                {
                  padding: marginSize === 'Narrow' ? 10 : marginSize === 'Wide' ? 30 : 20,
                },
              ]}
            >
              <View style={styles.sheetContentBar} />
              <View style={styles.sheetContentBar} />
              <View style={[styles.sheetContentBar, { width: '60%' }]} />
            </View>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DocumentFormatting')}
        >
          <Text style={styles.nextButtonText}>Proceed to Formatting</Text>
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
    flexDirection: 'row',
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
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 12,
  },
  pageSheet: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
    borderRadius: 4,
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  pagePortrait: {
    width: 130,
    height: 180,
  },
  pageLandscape: {
    width: 180,
    height: 130,
  },
  sheetContentBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 8,
    width: '100%',
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
