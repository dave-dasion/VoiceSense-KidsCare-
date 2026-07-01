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

export default function CompetitiveAdvantageScreen({ navigation }: any) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<'A' | 'B'>('A');

  const getDifferentiator = () => {
    if (selectedCompetitor === 'A') {
      return {
        name: "Competitor A (Legacy Rules-Engine)",
        threat: "They are cheaper ($0.20/invoice) but rely on rigid regex rules.",
        counter: "Regex breaks whenever invoice layouts change slightly. Our AI model adapts dynamically to layout variations without layout templates, saving thousands of manual configuration hours.",
      };
    } else {
      return {
        name: "Competitor B (General Cloud API)",
        threat: "They have a massive name brand but only offer public cloud hosting.",
        counter: "Healthcare and FinTech clients have strict data protection guidelines. Competitor B trains models on public data; we support isolated on-premise local Docker containers with zero outside cloud communication.",
      };
    }
  };

  const diff = getDifferentiator();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Competitive Advantage</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Defeating Legacy & Generalist Threats</Text>
          <Text style={styles.cardBody}>
            When buyers compare options, you must frame differentiation around **flexibility** and **privacy** rather than competing on price discounts.
          </Text>
        </View>

        {/* Feature Grid */}
        <Text style={styles.sectionTitle}>Feature Comparison Matrix</Text>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, { flex: 1.5 }]}>Feature</Text>
            <Text style={styles.colHeader}>Our AI</Text>
            <Text style={styles.colHeader}>Comp A</Text>
            <Text style={styles.colHeader}>Comp B</Text>
          </View>

          {/* Row 1 */}
          <View style={styles.tableRow}>
            <Text style={[styles.rowLabel, { flex: 1.5 }]}>Local On-Prem Deploy</Text>
            <Ionicons name="checkmark" size={16} color={COLORS.success} style={styles.rowIcon} />
            <Ionicons name="checkmark" size={16} color={COLORS.success} style={styles.rowIcon} />
            <Ionicons name="close" size={16} color={COLORS.danger} style={styles.rowIcon} />
          </View>

          {/* Row 2 */}
          <View style={styles.tableRow}>
            <Text style={[styles.rowLabel, { flex: 1.5 }]}>Dynamic Layout Adapters</Text>
            <Ionicons name="checkmark" size={16} color={COLORS.success} style={styles.rowIcon} />
            <Ionicons name="close" size={16} color={COLORS.danger} style={styles.rowIcon} />
            <Ionicons name="checkmark" size={16} color={COLORS.success} style={styles.rowIcon} />
          </View>

          {/* Row 3 */}
          <View style={styles.tableRow}>
            <Text style={[styles.rowLabel, { flex: 1.5 }]}>Fine-Tuned Weight Control</Text>
            <Ionicons name="checkmark" size={16} color={COLORS.success} style={styles.rowIcon} />
            <Ionicons name="close" size={16} color={COLORS.danger} style={styles.rowIcon} />
            <Ionicons name="close" size={16} color={COLORS.danger} style={styles.rowIcon} />
          </View>
        </View>

        {/* Competitor Selector */}
        <Text style={styles.sectionTitle}>Competitor Objection Playbook</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, selectedCompetitor === 'A' && styles.tabBtnActive]}
            onPress={() => setSelectedCompetitor('A')}
          >
            <Text style={[styles.tabBtnText, selectedCompetitor === 'A' && styles.tabBtnTextActive]}>Competitor A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedCompetitor === 'B' && styles.tabBtnActive]}
            onPress={() => setSelectedCompetitor('B')}
          >
            <Text style={[styles.tabBtnText, selectedCompetitor === 'B' && styles.tabBtnTextActive]}>Competitor B</Text>
          </TouchableOpacity>
        </View>

        {/* Strategy Play Card */}
        <View style={styles.playbookCard}>
          <Text style={styles.playbookTitle}>{diff.name}</Text>
          <Text style={styles.threatText}>**Their Claim/Threat**: {diff.threat}</Text>
          <Text style={styles.counterText}>**Your Objection Pivot**: {diff.counter}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ValueProposition')}
        >
          <Text style={styles.nextButtonText}>Proceed to Value Prop Builder</Text>
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
  tableCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
    marginBottom: 8,
  },
  colHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  rowLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  rowIcon: {
    flex: 1,
    textAlign: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    height: 36,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    ...SHADOWS.light,
  },
  tabBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabBtnTextActive: {
    color: COLORS.secondary,
  },
  playbookCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  playbookTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  threatText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 8,
  },
  counterText: {
    fontSize: 11,
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
