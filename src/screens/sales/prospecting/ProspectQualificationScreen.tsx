import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProspectQualificationScreen({ navigation }: any) {
  const [budgetVal, setBudgetVal] = useState<boolean | null>(null);
  const [authorityVal, setAuthorityVal] = useState<boolean | null>(null);
  const [needVal, setNeedVal] = useState<boolean | null>(null);
  const [timelineVal, setTimelineVal] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const checkBantScore = () => {
    if (budgetVal === null || authorityVal === null || needVal === null || timelineVal === null) {
      Alert.alert('Incomplete', 'Please check qualifications for all four BANT metrics.');
      return;
    }
    setSubmitted(true);
  };

  const resetBant = () => {
    setBudgetVal(null);
    setAuthorityVal(null);
    setNeedVal(null);
    setTimelineVal(null);
    setSubmitted(false);
  };

  const getBantAssessment = () => {
    let yesCount = 0;
    if (budgetVal) yesCount++;
    if (authorityVal) yesCount++;
    if (needVal) yesCount++;
    if (timelineVal) yesCount++;

    if (yesCount === 4) {
      return {
        label: 'SQL (Sales Qualified Lead) - Tier 1',
        desc: 'All criteria met. Budget exists, target holds authority, clear pain exists, and purchase timeline is near-term. Transition to discovery call immediately.',
        color: COLORS.success,
      };
    } else if (yesCount >= 2) {
      return {
        label: 'MQL (Marketing Qualified Lead) - Tier 2',
        desc: 'Partial fit. Clear pain or budget is present, but authority must be reached or timeline is long. Needs email nurturing sequences.',
        color: COLORS.warning,
      };
    } else {
      return {
        label: 'Disqualified Lead - Tier 3',
        desc: 'Insufficient fit. Prospect lacks budget authority and shows low near-term need. Archive and remove from active sales outreach lists.',
        color: COLORS.danger,
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. BANT Qualification</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>BANT Evaluation</Text>
          <Text style={styles.cardBody}>
            Don't waste time on sales calls with companies that cannot buy. Evaluate every prospect against the four core BANT pillars:
          </Text>
          <View style={styles.bantMatrix}>
            <Text style={styles.bantBullet}>• <Text style={{ fontWeight: '800' }}>Budget</Text>: Do they have financial resources?</Text>
            <Text style={styles.bantBullet}>• <Text style={{ fontWeight: '800' }}>Authority</Text>: Are you speaking to the decision-maker?</Text>
            <Text style={styles.bantBullet}>• <Text style={{ fontWeight: '800' }}>Need</Text>: Does your solution solve an active pain?</Text>
            <Text style={styles.bantBullet}>• <Text style={{ fontWeight: '800' }}>Timeline</Text>: Are they ready to purchase soon?</Text>
          </View>
        </View>

        {/* Lead Case study details */}
        <Text style={styles.sectionTitle}>BANT Qualification Simulator</Text>
        <Text style={styles.sectionSubtitle}>Review the prospect case notes and classify each metric below:</Text>

        <View style={styles.caseCard}>
          <Text style={styles.caseHeader}>Prospect Lead: Metro Logistics Corp</Text>
          <Text style={styles.caseBody}>
            "We are losing $4,000 monthly due to route dispatch errors. I am the VP of Operations and have $15,000 approved for software solutions. We want to implement a solution within 30 days."
          </Text>
        </View>

        <View style={styles.selectionPanel}>
          {/* Budget Row */}
          <View style={styles.selectRow}>
            <Text style={styles.metricLabel}>Budget Present?</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, budgetVal === true && styles.toggleBtnYes]}
                onPress={() => { setBudgetVal(true); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, budgetVal === true && styles.toggleTextYes]}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, budgetVal === false && styles.toggleBtnNo]}
                onPress={() => { setBudgetVal(false); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, budgetVal === false && styles.toggleTextNo]}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Authority Row */}
          <View style={styles.selectRow}>
            <Text style={styles.metricLabel}>Decision Maker Authority?</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, authorityVal === true && styles.toggleBtnYes]}
                onPress={() => { setAuthorityVal(true); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, authorityVal === true && styles.toggleTextYes]}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, authorityVal === false && styles.toggleBtnNo]}
                onPress={() => { setAuthorityVal(false); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, authorityVal === false && styles.toggleTextNo]}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Need Row */}
          <View style={styles.selectRow}>
            <Text style={styles.metricLabel}>Clear Active Need?</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, needVal === true && styles.toggleBtnYes]}
                onPress={() => { setNeedVal(true); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, needVal === true && styles.toggleTextYes]}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, needVal === false && styles.toggleBtnNo]}
                onPress={() => { setNeedVal(false); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, needVal === false && styles.toggleTextNo]}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Timeline Row */}
          <View style={styles.selectRow}>
            <Text style={styles.metricLabel}>Urgent Timeline ({"<"} 90 days)?</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, timelineVal === true && styles.toggleBtnYes]}
                onPress={() => { setTimelineVal(true); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, timelineVal === true && styles.toggleTextYes]}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, timelineVal === false && styles.toggleBtnNo]}
                onPress={() => { setTimelineVal(false); setSubmitted(false); }}
              >
                <Text style={[styles.toggleText, timelineVal === false && styles.toggleTextNo]}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={checkBantScore}>
            <Text style={styles.submitBtnText}>Evaluate BANT Status</Text>
          </TouchableOpacity>
        </View>

        {/* BANT Result Panel */}
        {submitted && (
          <View style={styles.resultPanel}>
            <Text style={styles.resultHeader}>Evaluation Outcome</Text>
            <Text style={[styles.resultTitle, { color: getBantAssessment().color }]}>
              {getBantAssessment().label}
            </Text>
            <Text style={styles.resultDesc}>{getBantAssessment().desc}</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={resetBant}>
              <Text style={styles.resetText}>Reset Simulator</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProspectingExercise')}
        >
          <Text style={styles.nextButtonText}>Proceed to Sourcing Exercise</Text>
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
  bantMatrix: {
    marginTop: 10,
  },
  bantBullet: {
    fontSize: 12,
    color: COLORS.textLight,
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
  caseCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  caseHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  caseBody: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  selectionPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  toggleRow: {
    flexDirection: 'row',
  },
  toggleBtn: {
    width: 50,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  toggleBtnYes: {
    backgroundColor: '#C6F6D5',
  },
  toggleBtnNo: {
    backgroundColor: '#FED7D7',
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  toggleTextYes: {
    color: '#22543D',
  },
  toggleTextNo: {
    color: '#742A2A',
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    ...SHADOWS.light,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  resultPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  resultHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginVertical: 4,
  },
  resultDesc: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  resetBtn: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textDecorationLine: 'underline',
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
