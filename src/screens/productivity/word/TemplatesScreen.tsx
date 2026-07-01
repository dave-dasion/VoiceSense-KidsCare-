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

export default function TemplatesScreen({ navigation }: any) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('invoice');

  const templates = [
    {
      id: 'invoice',
      name: 'Service Invoice',
      icon: 'receipt-outline',
      description: 'Pre-formatted invoice template containing tables for item descriptions, unit rates, quantities, and sales tax totals.',
      tips: ['Include payment terms clearly.', 'Double check SUM formulas in totals.', 'Keep layout clean and compact.'],
    },
    {
      id: 'proposal',
      name: 'Project Proposal',
      icon: 'document-text-outline',
      description: 'Formal proposal structure outlining project objectives, scope of work, budget tables, deliverables, and timelines.',
      tips: ['Use Headings (H1, H2) for clear outline.', 'Insert page breaks before tables.', 'Define delivery schedules clearly.'],
    },
    {
      id: 'minutes',
      name: 'Meeting Minutes',
      icon: 'time-outline',
      description: 'Simple template to log attendee lists, agenda items discussed, decisions taken, and assign action steps.',
      tips: ['List attendees alphabetically.', 'Use bullet points for key items.', 'Bold important decisions.'],
    },
  ];

  const activeTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Word Templates</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Bootstrap Document Creation</Text>
          <Text style={styles.cardBody}>
            Instead of building documents from scratch, Microsoft Word features a catalog of pre-designed <Text style={{ fontWeight: '800' }}>Templates</Text> to streamline standard office workflows.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Select a Template to Preview</Text>
        <View style={styles.gridContainer}>
          {templates.map((tpl) => {
            const isSelected = tpl.id === selectedTemplate;
            return (
              <TouchableOpacity
                key={tpl.id}
                style={[styles.tplCard, isSelected && styles.tplCardActive]}
                onPress={() => setSelectedTemplate(tpl.id)}
              >
                <Ionicons
                  name={tpl.icon as any}
                  size={24}
                  color={isSelected ? COLORS.white : COLORS.secondary}
                />
                <Text style={[styles.tplCardName, isSelected && styles.tplCardNameActive]}>
                  {tpl.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Template Details Panel */}
        <View style={styles.detailsPanel}>
          <Text style={styles.panelTitle}>{activeTemplate.name} Structure</Text>
          <Text style={styles.panelDesc}>{activeTemplate.description}</Text>

          <Text style={styles.tipsHeading}>Best Practices Checklist:</Text>
          {activeTemplate.tips.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Ionicons name="checkmark-done" size={16} color={COLORS.success} style={{ marginRight: 8 }} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('CollaborationFeatures')}
        >
          <Text style={styles.nextButtonText}>Proceed to Collaboration</Text>
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
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tplCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    ...SHADOWS.light,
  },
  tplCardActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  tplCardName: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
  },
  tplCardNameActive: {
    color: COLORS.white,
  },
  detailsPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  panelDesc: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 16,
  },
  tipsHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
