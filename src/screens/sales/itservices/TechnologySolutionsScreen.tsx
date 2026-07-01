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

export default function TechnologySolutionsScreen({ navigation }: any) {
  const [apiChecked, setApiChecked] = useState(true);
  const [onPremChecked, setOnPremChecked] = useState(false);
  const [slaChecked, setSlaChecked] = useState(false);

  const getProposalTotal = () => {
    let setup = 0;
    let recurring = 0;

    if (apiChecked) setup += 1200;
    if (onPremChecked) setup += 3500;
    if (slaChecked) recurring += 1500;

    return { setup, recurring };
  };

  const totals = getProposalTotal();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Custom Tech Proposals</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Proposal Customization</Text>
          <Text style={styles.cardBody}>
            Enterprise IT solutions require custom integration scopes. Select the technical solutions to include in your client contract proposal:
          </Text>
        </View>

        {/* Interactive Checkbox list */}
        <Text style={styles.sectionTitle}>Proposal Configuration Items</Text>
        <View style={styles.checklist}>
          {/* Item 1 */}
          <TouchableOpacity
            style={[styles.checkRow, apiChecked && styles.checkRowActive]}
            onPress={() => setApiChecked(!apiChecked)}
          >
            <Ionicons
              name={apiChecked ? "checkbox" : "square-outline"}
              size={20}
              color={apiChecked ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>API Webhook Integration Adapter</Text>
              <Text style={styles.checkDesc}>One-time connection setup: **$1,200**</Text>
            </View>
          </TouchableOpacity>

          {/* Item 2 */}
          <TouchableOpacity
            style={[styles.checkRow, onPremChecked && styles.checkRowActive]}
            onPress={() => setOnPremChecked(!onPremChecked)}
          >
            <Ionicons
              name={onPremChecked ? "checkbox" : "square-outline"}
              size={20}
              color={onPremChecked ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>On-Premise Docker GPU Assist</Text>
              <Text style={styles.checkDesc}>One-time engineering setup: **$3,500**</Text>
            </View>
          </TouchableOpacity>

          {/* Item 3 */}
          <TouchableOpacity
            style={[styles.checkRow, slaChecked && styles.checkRowActive]}
            onPress={() => setSlaChecked(!slaChecked)}
          >
            <Ionicons
              name={slaChecked ? "checkbox" : "square-outline"}
              size={20}
              color={slaChecked ? COLORS.secondary : COLORS.textLight}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>24/7 Dedicated SLA channel</Text>
              <Text style={styles.checkDesc}>Recurring support channel: **$1,500/mo**</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pricing Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeader}>Proposal Price Summary</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Setup Services:</Text>
            <Text style={styles.totalValue}>${totals.setup.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Recurring Services:</Text>
            <Text style={styles.totalValue}>${totals.recurring.toLocaleString()} / mo</Text>
          </View>
        </View>

        {/* Finish IT Solutions */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('AIProductHub')}
        >
          <Text style={styles.nextButtonText}>Finish IT Services Sub-Module</Text>
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
  checklist: {
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
