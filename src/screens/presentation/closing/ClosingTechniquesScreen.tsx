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

export default function ClosingTechniquesScreen({ navigation }: any) {
  const [selectedTech, setSelectedTech] = useState<'assumptive' | 'urgency' | 'value'>('assumptive');

  const getClosingInfo = () => {
    switch (selectedTech) {
      case 'assumptive':
        return {
          title: "🤝 Assumptive Close",
          script: "\"Since the technical parameters align perfectly with your VPC security guidelines, let's schedule the sandbox container configuration session. Would next Tuesday morning work for your engineering team?\"",
          rule: "Assume the sale is a natural next step. Avoid asking 'Do you want to buy?' and instead ask 'When should we launch the setup session?'",
        };
      case 'urgency':
        return {
          title: "⏳ Urgency Close",
          script: "\"Our deployment team has two open implementation slots left for this quarter. If we finalize the pilot contract this week, we can guarantee system launch by the 1st, saving your staff 400 manual hours next month.\"",
          rule: "Anchor urgency around the client's operational waste cost rather than artificial sales pressures.",
        };
      case 'value':
        return {
          title: "🏆 Value-Proof Close",
          script: "\"Similar to HealthCare Partners Network, who automated 80% of clinical data entry within 30 days, we'd like to help you capture these same efficiencies. Let's launch a localized trial to prove the ROI metrics.\"",
          rule: "Reference a relevant case study success story to build social validation and risk reduction.",
        };
    }
  };

  const active = getClosingInfo();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AIProductHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Closing Techniques</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Closing the B2B Sales Cycle</Text>
          <Text style={styles.cardBody}>
            B2B closings should focus on securing the next collaborative action (e.g. pilot sandbox setup) rather than aggressive pushy hard sales. Select a closing technique:
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabRow}>
          {['assumptive', 'urgency', 'value'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, selectedTech === t && styles.tabBtnActive]}
              onPress={() => setSelectedTech(t as any)}
            >
              <Text style={[styles.tabBtnText, selectedTech === t && styles.tabBtnTextActive]}>
                {t === 'assumptive' ? 'Assumptive' : t === 'urgency' ? 'Urgency' : 'Value-Proof'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Script Card */}
        <View style={styles.scriptCard}>
          <Text style={styles.scriptTitle}>{active.title}</Text>
          <Text style={styles.scriptLabel}>Mock Response Script:</Text>
          <Text style={styles.scriptText}>{active.script}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.ruleLabel}>Key Sales Principle:</Text>
          <Text style={styles.ruleText}>{active.rule}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProposalDiscussion')}
        >
          <Text style={styles.nextButtonText}>Proceed to Proposal Discussions</Text>
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
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
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
  scriptCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  scriptTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 14,
  },
  scriptLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  scriptText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  ruleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  ruleText: {
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
