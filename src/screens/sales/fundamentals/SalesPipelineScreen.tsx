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

export default function SalesPipelineScreen({ navigation }: any) {
  const [dealStage, setDealStage] = useState<'Prospect' | 'Qualify' | 'Demo' | 'Close'>('Prospect');

  const moveForward = () => {
    if (dealStage === 'Prospect') setDealStage('Qualify');
    else if (dealStage === 'Qualify') setDealStage('Demo');
    else if (dealStage === 'Demo') setDealStage('Close');
  };

  const moveBackward = () => {
    if (dealStage === 'Qualify') setDealStage('Prospect');
    else if (dealStage === 'Demo') setDealStage('Qualify');
    else if (dealStage === 'Close') setDealStage('Demo');
  };

  const getStageDescription = () => {
    switch (dealStage) {
      case 'Prospect': return "Cold lead identified from databases. Action: Send LinkedIn connect & cold email.";
      case 'Qualify': return "BANT criteria matched. Ops gap identified. Action: Schedule discovery video call.";
      case 'Demo': return "ROI gap proposal presented. Core pricing models detailed. Action: Resolve contract objections.";
      case 'Close': return "SLA signed, invoicing splits automated. Action: Kickoff onboarding checklist.";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SalesHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Pipeline Kanban</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Pipeline Management</Text>
          <Text style={styles.cardBody}>
            The Sales Pipeline tracks deals as they progress from Prospecting, to Qualification, Demonstration, and finally Closing. Keep deals moving by scheduling clear next steps for every stage.
          </Text>
        </View>

        {/* Kanban Board */}
        <Text style={styles.sectionTitle}>Pipeline Kanban Simulator</Text>
        <Text style={styles.sectionSubtitle}>Simulate moving the Metro Logistics account deal through the sales stages:</Text>

        <View style={styles.kanbanPanel}>
          {/* Columns */}
          <View style={styles.columnsRow}>
            {['Prospect', 'Qualify', 'Demo', 'Close'].map((stg) => {
              const isActive = dealStage === stg;
              return (
                <View key={stg} style={[styles.stageCol, isActive && styles.stageColActive]}>
                  <Text style={[styles.colTitle, isActive && styles.colTitleActive]}>{stg}</Text>
                  {isActive && (
                    <View style={styles.dealCard}>
                      <Text style={styles.dealName}>Metro Logistics</Text>
                      <Text style={styles.dealVal}>$15,000 / yr</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.moveBtn, dealStage === 'Prospect' && styles.btnDisabled]}
              disabled={dealStage === 'Prospect'}
              onPress={moveBackward}
            >
              <Ionicons name="arrow-back" size={14} color={COLORS.white} style={{ marginRight: 6 }} />
              <Text style={styles.btnText}>Move Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.moveBtn, dealStage === 'Close' && styles.btnDisabled]}
              disabled={dealStage === 'Close'}
              onPress={moveForward}
            >
              <Text style={styles.btnText}>Advance Stage</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stage details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsHeader}>Current Stage Instructions</Text>
          <Text style={styles.detailsText}>{getStageDescription()}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('OpportunityQualification')}
        >
          <Text style={styles.nextButtonText}>Proceed to Opportunity Qualification</Text>
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
  kanbanPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  columnsRow: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 16,
  },
  stageCol: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    marginHorizontal: 2,
    padding: 6,
    alignItems: 'center',
  },
  stageColActive: {
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  colTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  colTitleActive: {
    color: COLORS.secondary,
  },
  dealCard: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 6,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  dealName: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  dealVal: {
    fontSize: 8,
    color: COLORS.success,
    marginTop: 2,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moveBtn: {
    flex: 1,
    height: 36,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  btnDisabled: {
    backgroundColor: COLORS.border,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  detailsText: {
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
