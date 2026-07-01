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

export default function DemoDeliveryScreen({ navigation }: any) {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const getPhaseData = () => {
    switch (selectedPhase) {
      case 1:
        return {
          title: "Phase 1: Intros & Recap (5 mins)",
          goal: "Align expectations and summarize prior discovery findings.",
          rule: "Avoid immediate screen sharing. Ask: 'Since our last call, has anyone else joined the decision board?'",
        };
      case 2:
        return {
          title: "Phase 2: Core Ingestion Click-through (15 mins)",
          goal: "Demonstrate layout parsing flow using client sample documents.",
          rule: "Limit clicks. Focus on outcomes: upload the PDF, click process, and show the instantly parsed text outputs.",
        };
      case 3:
        return {
          title: "Phase 3: Calibration & Latency SLA (5 mins)",
          goal: "Explain hosting methods (cloud vs local Docker subnets).",
          rule: "Address the IT concerns directly. Show the configurator scorecards and model scale latencies.",
        };
      case 4:
        return {
          title: "Phase 4: Q&A & Action Locking (5 mins)",
          goal: "Address lingering questions and lock down a follow-up trial sandbox.",
          rule: "Do not end without locking down a specific pilot trial date: 'Shall we schedule the 2-week trial next Tuesday?'",
        };
    }
  };

  const current = getPhaseData()!;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Demo Delivery Timeline</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Timeboxed Demo Flow</Text>
          <Text style={styles.cardBody}>
            Successful software demonstrations adhere to strict schedules. Click each agenda segment below to check best delivery practices:
          </Text>
        </View>

        {/* Timeline blocks */}
        <View style={styles.timelineCard}>
          {[
            { id: 1, name: "Intros & Recap", time: "5m", icon: "people" },
            { id: 2, name: "Core Ingestion", time: "15m", icon: "desktop" },
            { id: 3, name: "Hosting Calibration", time: "5m", icon: "settings" },
            { id: 4, name: "Q&A & Lock CTA", time: "5m", icon: "flag" },
          ].map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <Ionicons name="arrow-down" size={16} color={COLORS.textLight} style={{ marginVertical: 4 }} />}
              <TouchableOpacity
                style={[styles.phaseBtn, selectedPhase === item.id && styles.phaseBtnActive]}
                onPress={() => setSelectedPhase(item.id)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={selectedPhase === item.id ? COLORS.secondary : COLORS.textLight}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.phaseLabel, selectedPhase === item.id && styles.phaseLabelActive]}>
                  {item.name}
                </Text>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeBadgeText}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        {/* Dynamic Detail Card */}
        <Text style={styles.sectionTitle}>Agenda Phase Guidelines</Text>
        <View style={styles.guidelinesCard}>
          <Text style={styles.guideTitle}>{current.title}</Text>
          <Text style={styles.guideText}>**Core Goal**: {current.goal}</Text>
          <Text style={styles.guideText}>**Golden Rule**: {current.rule}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DemoScripts')}
        >
          <Text style={styles.nextButtonText}>Proceed to Demo Scripts</Text>
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
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  timelineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.light,
  },
  phaseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
  },
  phaseBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '08',
    borderWidth: 1.5,
  },
  phaseLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  phaseLabelActive: {
    color: COLORS.secondary,
  },
  timeBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  guidelinesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  guideTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 10,
  },
  guideText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 6,
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
