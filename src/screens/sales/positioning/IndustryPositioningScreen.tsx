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

export default function IndustryPositioningScreen({ navigation }: any) {
  const [selectedIndustry, setSelectedIndustry] = useState<'FinTech' | 'Legal' | 'Retail'>('FinTech');

  const getIndustryDetails = () => {
    switch (selectedIndustry) {
      case 'FinTech':
        return {
          buyer: "VP of Risk Operations",
          concern: "Data security, regulatory compliance audit trails (SOC2/GDPR).",
          pitch: "Pitch the **On-Premise Isolated Core** option. Emphasize that zero document data leaves their internal firewalled subnet and model inference occurs on local GPUs.",
        };
      case 'Legal':
        return {
          buyer: "Managing Partner",
          concern: "Accuracy rates, citation referencing, ingestion speed.",
          pitch: "Pitch the **70B parameter model with LoRA fine-tuning**. Emphasize the 99% extraction accuracy and automated reference check capabilities.",
        };
      case 'Retail':
        return {
          buyer: "Director of Logistics",
          concern: "System throughput, low latency API integrations, invoicing costs.",
          pitch: "Pitch the **1.5B/7B model with Prompting**. Show how 200ms latency speeds up cargo dispatching and cuts invoice processing costs to $0.80/unit.",
        };
    }
  };

  const details = getIndustryDetails();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Industry Vertical Alignment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Targeting Industry Priorities</Text>
          <Text style={styles.cardBody}>
            Enterprise sales deals fail when pitches are generic. Align model selection and hosting specifications to match vertical specific buyer pain points:
          </Text>
        </View>

        {/* Tab Row */}
        <View style={styles.tabRow}>
          {['FinTech', 'Legal', 'Retail'].map((ind) => (
            <TouchableOpacity
              key={ind}
              style={[styles.tabBtn, selectedIndustry === ind && styles.tabBtnActive]}
              onPress={() => setSelectedIndustry(ind as any)}
            >
              <Text style={[styles.tabBtnText, selectedIndustry === ind && styles.tabBtnTextActive]}>
                {ind === 'FinTech' ? '🏦 FinTech' : ind === 'Legal' ? '⚖️ Legal' : '🛒 Retail'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Strategy Card */}
        <View style={styles.strategyCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Key Decision Maker:</Text>
            <Text style={styles.detailValue}>{details.buyer}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Primary Core Concern:</Text>
            <Text style={styles.detailValue}>{details.concern}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.pitchHeader}>Tailored Product Pitch Play:</Text>
          <Text style={styles.pitchText}>{details.pitch}</Text>
        </View>

        {/* Return to Hub */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('AIProductHub')}
        >
          <Text style={styles.nextButtonText}>Finish Positioning Sub-Module</Text>
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
  strategyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    flex: 1,
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1.5,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  pitchHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  pitchText: {
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
