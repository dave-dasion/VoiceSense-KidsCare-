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

export default function StorytellingTechniquesScreen({ navigation }: any) {
  const [selectedPhase, setSelectedPhase] = useState<'Hook' | 'Body' | 'CTA'>('Hook');

  const phases = {
    Hook: {
      title: 'The Hook: Capture Attention',
      subtitle: 'Slides 1 - 2',
      desc: 'Start with a shocking statistic, a relatable problem question, or a compelling personal anecdote. Avoid dry corporate introductions; address the core pain point immediately.',
      icon: 'bulb-outline',
    },
    Body: {
      title: 'The Body: Support with Data',
      subtitle: 'Slides 3 - 8',
      desc: 'Introduce your product solution. Support claims using structured tables, charts, or diagrams. Keep slides focused on a single key takeaway message to prevent cognitive overload.',
      icon: 'analytics-outline',
    },
    CTA: {
      title: 'The CTA: Call to Action',
      subtitle: 'Slide 9 - 10',
      desc: 'Conclude with a clear action step. Tell your audience exactly what you want them to do next (e.g., download a demo, sign a compliance policy, or request a quotation).',
      icon: 'checkmark-circle-outline',
    },
  };

  const currentPhase = phases[selectedPhase];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Storytelling</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Narrative Presentation Structures</Text>
          <Text style={styles.cardBody}>
            Audience engagement drops if slides are presented as a random sequence of facts. Successful presenters organize their decks into a cohesive three-act storyline.
          </Text>
        </View>

        {/* Phase Select Buttons */}
        <Text style={styles.sectionTitle}>Tap a Narrative Phase to Inspect:</Text>
        <View style={styles.phaseRow}>
          {(['Hook', 'Body', 'CTA'] as const).map((phase) => {
            const isActive = selectedPhase === phase;
            return (
              <TouchableOpacity
                key={phase}
                style={[styles.phaseBtn, isActive && styles.phaseBtnActive]}
                onPress={() => setSelectedPhase(phase)}
              >
                <Text style={[styles.phaseText, isActive && styles.phaseTextActive]}>{phase}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Details Panel */}
        <View style={styles.detailsPanel}>
          <View style={styles.panelHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name={currentPhase.icon as any} size={22} color={COLORS.secondary} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.panelTitle}>{currentPhase.title}</Text>
              <Text style={styles.panelSub}>{currentPhase.subtitle}</Text>
            </View>
          </View>
          <Text style={styles.panelDesc}>{currentPhase.desc}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SalesDeckCreation')}
        >
          <Text style={styles.nextButtonText}>Proceed to Sales Decks</Text>
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
  phaseRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  phaseBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 3,
    ...SHADOWS.light,
  },
  phaseBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  phaseText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  phaseTextActive: {
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
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  panelSub: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  panelDesc: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
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
