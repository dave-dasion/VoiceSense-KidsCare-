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

export default function ProposalDiscussionScreen({ navigation }: any) {
  const [includeOnPrem, setIncludeOnPrem] = useState(true);
  const [includeSla, setIncludeSla] = useState(false);

  const getContractValues = () => {
    let setup = 1200; // Base API config
    let monthly = 120; // Shared cloud base

    if (includeOnPrem) {
      setup += 3500;
      monthly = 900; // Shifted from cloud to private Docker licensing
    }
    if (includeSla) {
      monthly += 1500;
    }

    return { setup, monthly };
  };

  const values = getContractValues();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Proposal Discussions</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Collaborative Scope Adjustments</Text>
          <Text style={styles.cardBody}>
            Negotiate contract requirements transparently by adjusting parameters to fit client constraints. Toggle scope options below:
          </Text>
        </View>

        {/* Scope Adjusters */}
        <Text style={styles.sectionTitle}>Adjust Proposal Parameters</Text>
        <View style={styles.checklistPanel}>
          {/* Toggle 1 */}
          <TouchableOpacity
            style={[styles.checkRow, includeOnPrem && styles.checkRowActive]}
            onPress={() => setIncludeOnPrem(!includeOnPrem)}
          >
            <Ionicons
              name={includeOnPrem ? "checkbox" : "square-outline"}
              size={20}
              color={includeOnPrem ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>Local Docker GPU Hosting</Text>
              <Text style={styles.checkDesc}>Increases setup to **$4,700**, shifts monthly to **$900**</Text>
            </View>
          </TouchableOpacity>

          {/* Toggle 2 */}
          <TouchableOpacity
            style={[styles.checkRow, includeSla && styles.checkRowActive]}
            onPress={() => setIncludeSla(!includeSla)}
          >
            <Ionicons
              name={includeSla ? "checkbox" : "square-outline"}
              size={20}
              color={includeSla ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>Dedicated 24/7 SLA Engineering Channel</Text>
              <Text style={styles.checkDesc}>Adds **$1,500 / month** recurring support cost</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pricing Dashboard */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeader}>Negotiated Contract Value</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Setup & Services:</Text>
            <Text style={styles.totalValue}>${values.setup.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Monthly Platform Subscription:</Text>
            <Text style={styles.totalValue}>${values.monthly.toLocaleString()} / mo</Text>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('FollowUpPlanning')}
        >
          <Text style={styles.nextButtonText}>Proceed to Follow-Up Planning</Text>
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
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  checkRowActive: {
    backgroundColor: '#FAFDFB',
  },
  checkTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  checkDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  summaryHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  totalValue: {
    fontSize: 13,
    fontWeight: '800',
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
