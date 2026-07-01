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

export default function ManagedServicesScreen({ navigation }: any) {
  const [deployment, setDeployment] = useState<'cloud' | 'vpc' | 'onprem'>('cloud');

  const getDeploymentSpecs = () => {
    switch (deployment) {
      case 'cloud':
        return {
          title: "Public Managed Cloud Ingestion",
          licensing: "$120 / month",
          setup: "None. Direct API URL access.",
          uptime: "99.9% availability SLA",
          ideal: "Startups and low-security document processing centers.",
        };
      case 'vpc':
        return {
          title: "Virtual Private Cloud (VPC) Tenant",
          licensing: "$400 / month",
          setup: "2 hours (Terraform script deployment).",
          uptime: "99.99% availability SLA",
          ideal: "FinTech and scale-up logistics operations with internal network policies.",
        };
      case 'onprem':
        return {
          title: "On-Premise Private Docker Host",
          licensing: "$900 / month",
          setup: "1 day (Local GPU Docker cluster setup).",
          uptime: "Client-managed server SLA",
          ideal: "Enterprise hospital systems and strict intelligence agencies.",
        };
    }
  };

  const specs = getDeploymentSpecs();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Managed Hosting Footprint</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Matching Client Infrastructure</Text>
          <Text style={styles.cardBody}>
            Deploying AI models depends heavily on client data sensitivity. Choose an architecture below to review technical specifications:
          </Text>
        </View>

        {/* Options Selector */}
        <View style={styles.selectorRow}>
          {['cloud', 'vpc', 'onprem'].map((dep) => (
            <TouchableOpacity
              key={dep}
              style={[styles.selectBtn, deployment === dep && styles.selectBtnActive]}
              onPress={() => setDeployment(dep as any)}
            >
              <Text style={[styles.selectBtnText, deployment === dep && styles.selectBtnTextActive]}>
                {dep === 'cloud' ? 'Managed Cloud' : dep === 'vpc' ? 'Dedicated VPC' : 'Private On-Prem'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Specs Table */}
        <View style={styles.specsCard}>
          <Text style={styles.specsTitle}>{specs.title}</Text>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Licensing Cost:</Text>
            <Text style={styles.specValue}>{specs.licensing}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Onboarding Setup:</Text>
            <Text style={styles.specValue}>{specs.setup}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Availability SLA:</Text>
            <Text style={styles.specValue}>{specs.uptime}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Ideal Scenario:</Text>
            <Text style={styles.specValue}>{specs.ideal}</Text>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ITWorkflows')}
        >
          <Text style={styles.nextButtonText}>Proceed to IT Data Workflows</Text>
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
  selectorRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectBtn: {
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
  selectBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
  },
  selectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectBtnTextActive: {
    color: COLORS.secondary,
  },
  specsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  specsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  specLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    flex: 1,
  },
  specValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1.8,
    textAlign: 'right',
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
