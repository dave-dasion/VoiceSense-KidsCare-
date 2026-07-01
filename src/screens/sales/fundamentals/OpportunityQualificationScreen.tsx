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

export default function OpportunityQualificationScreen({ navigation }: any) {
  const [hasAuthority, setHasAuthority] = useState(false);
  const [hasPain, setHasPain] = useState(false);
  const [hasDemo, setHasDemo] = useState(false);
  const [hasCompetitor, setHasCompetitor] = useState(false);

  const getWinProbability = () => {
    let prob = 10; // baseline
    if (hasAuthority) prob += 25;
    if (hasPain) prob += 25;
    if (hasDemo) prob += 20;
    if (hasCompetitor) prob += 20;
    return prob;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Deal Health Scoring</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Deal Qualification Metrics</Text>
          <Text style={styles.cardBody}>
            Don't rely on gut feelings. Qualify the health of your opportunities objectively by checking decision authority, verified operational pain costs, demo engagement, and competitor positioning.
          </Text>
        </View>

        {/* Opportunity checklist */}
        <Text style={styles.sectionTitle}>Deal Health Checklist</Text>
        <Text style={styles.sectionSubtitle}>Toggle the qualification checks for your active deal profile:</Text>

        <View style={styles.checklistPanel}>
          {/* Authority */}
          <TouchableOpacity
            style={[styles.checkRow, hasAuthority && styles.checkRowActive]}
            onPress={() => setHasAuthority(!hasAuthority)}
          >
            <Ionicons
              name={hasAuthority ? "checkbox" : "square-outline"}
              size={20}
              color={hasAuthority ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.checkText}>Direct communication access to the Budget Holder established.</Text>
          </TouchableOpacity>

          {/* Pain */}
          <TouchableOpacity
            style={[styles.checkRow, hasPain && styles.checkRowActive]}
            onPress={() => setHasPain(!hasPain)}
          >
            <Ionicons
              name={hasPain ? "checkbox" : "square-outline"}
              size={20}
              color={hasPain ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.checkText}>Operational pain gap cost (e.g. courier delays) verified by VP.</Text>
          </TouchableOpacity>

          {/* Demo */}
          <TouchableOpacity
            style={[styles.checkRow, hasDemo && styles.checkRowActive]}
            onPress={() => setHasDemo(!hasDemo)}
          >
            <Ionicons
              name={hasDemo ? "checkbox" : "square-outline"}
              size={20}
              color={hasDemo ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.checkText}>Interactive software demo scheduled with department heads.</Text>
          </TouchableOpacity>

          {/* Competitor */}
          <TouchableOpacity
            style={[styles.checkRow, hasCompetitor && styles.checkRowActive]}
            onPress={() => setHasCompetitor(!hasCompetitor)}
          >
            <Ionicons
              name={hasCompetitor ? "checkbox" : "square-outline"}
              size={20}
              color={hasCompetitor ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.checkText}>Competitor alternatives identified and value differentiation stated.</Text>
          </TouchableOpacity>
        </View>

        {/* Health Meter */}
        <View style={styles.meterCard}>
          <Text style={styles.meterTitle}>Win Probability Meter</Text>
          <Text style={[styles.meterNumber, { color: getWinProbability() >= 70 ? COLORS.success : getWinProbability() >= 40 ? COLORS.warning : COLORS.danger }]}>
            {getWinProbability()}%
          </Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${getWinProbability()}%`, backgroundColor: getWinProbability() >= 70 ? COLORS.success : getWinProbability() >= 40 ? COLORS.warning : COLORS.danger }]} />
          </View>
          <Text style={styles.meterDesc}>
            {getWinProbability() >= 70
              ? "High Probability Deal. Healthy qualification indicators. Prepare proposal terms and push to close."
              : getWinProbability() >= 40
              ? "Moderate Probability. Missing critical authority or pain verifications. Explore budget holder contacts."
              : "Low Probability. High risk of stall. Dedicate efforts to qualify needs before proposal presentations."}
          </Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('FollowUpStrategies')}
        >
          <Text style={styles.nextButtonText}>Proceed to Follow-up Strategies</Text>
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
  checklistPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  checkRowActive: {
    backgroundColor: '#FAFDFB',
  },
  checkText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  meterCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  meterTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  meterNumber: {
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
    fontFamily: FONTS.bold,
  },
  barBg: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    width: '100%',
    marginBottom: 14,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  meterDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
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
