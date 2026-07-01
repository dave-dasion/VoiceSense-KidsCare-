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

interface CompanyDossier {
  name: string;
  industry: string;
  size: string;
  techStack: string;
  news: string;
  cto: string;
}

export default function LeadResearchScreen({ navigation }: any) {
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const companies: Record<string, CompanyDossier> = {
    acme: {
      name: 'Acme Cloud Solutions',
      industry: 'SaaS Software',
      size: '220 employees',
      techStack: 'React Native, AWS, Salesforce, Hubspot',
      news: 'Recently closed $25M Series B funding to scale operations.',
      cto: 'Sarah Connor (CTO)',
    },
    general: {
      name: 'General Health Clinics',
      industry: 'Healthcare Services',
      size: '1,200 employees',
      techStack: 'Epic Systems, Azure, Microsoft 365, Marketo',
      news: 'Expanding outpatient clinics into three new state regions.',
      cto: 'Marcus Aurelius (Chief Information Officer)',
    },
    apex: {
      name: 'Apex Retail Markets',
      industry: 'Retail Distribution',
      size: '40 employees',
      techStack: 'Shopify, GCP, QuickBooks, Mailchimp',
      news: 'Struggling with inventory pipeline distribution bottlenecks.',
      cto: 'Jane Doe (Operations Director)',
    },
  };

  const currentDossier = selectedCompany ? companies[selectedCompany] : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Lead Research</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>The Power of Personalization</Text>
          <Text style={styles.cardBody}>
            Sending generic sales emails results in low conversions. Before reaching out, review company press releases, CTO profiles, and current tech stacks to find high-impact context triggers.
          </Text>
        </View>

        {/* Directory Search Panel */}
        <Text style={styles.sectionTitle}>Sales Intelligence Tool Simulator</Text>
        <Text style={styles.sectionSubtitle}>Select a target corporate lead to load their research dossier:</Text>

        <View style={styles.directoryGrid}>
          {Object.keys(companies).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.companyTab,
                selectedCompany === key && styles.companyTabActive,
              ]}
              onPress={() => setSelectedCompany(key)}
            >
              <Ionicons
                name="business-outline"
                size={18}
                color={selectedCompany === key ? COLORS.secondary : COLORS.textDark}
              />
              <Text style={[styles.tabText, selectedCompany === key && styles.tabTextActive]}>
                {companies[key].name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dossier Card */}
        {currentDossier ? (
          <View style={styles.dossierPanel}>
            <View style={styles.dossierHeader}>
              <Ionicons name="folder-open-outline" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
              <Text style={styles.dossierTitle}>Verified Intelligence Report</Text>
            </View>

            <View style={styles.dossierRow}>
              <Text style={styles.dossierLabel}>Industry / Size:</Text>
              <Text style={styles.dossierVal}>{currentDossier.industry} • {currentDossier.size}</Text>
            </View>

            <View style={styles.dossierRow}>
              <Text style={styles.dossierLabel}>Tech Stack:</Text>
              <Text style={styles.dossierVal}>{currentDossier.techStack}</Text>
            </View>

            <View style={styles.dossierRow}>
              <Text style={styles.dossierLabel}>Decision Maker:</Text>
              <Text style={styles.dossierVal}>{currentDossier.cto}</Text>
            </View>

            <View style={styles.newsBox}>
              <Text style={styles.newsLabel}>Recent Context Event:</Text>
              <Text style={styles.newsText}>"{currentDossier.news}"</Text>
            </View>
          </View>
        ) : (
          <View style={styles.dossierPlaceholder}>
            <Ionicons name="search" size={36} color={COLORS.border} />
            <Text style={styles.placeholderText}>Select a company above to generate lead intelligence.</Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProspectQualification')}
        >
          <Text style={styles.nextButtonText}>Proceed to BANT Qualification</Text>
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
  directoryGrid: {
    marginBottom: 20,
  },
  companyTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  companyTabActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#F7FAFC',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 10,
  },
  tabTextActive: {
    color: COLORS.secondary,
  },
  dossierPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  dossierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
    marginBottom: 12,
  },
  dossierTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  dossierRow: {
    marginBottom: 10,
  },
  dossierLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  dossierVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 2,
  },
  newsBox: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  newsLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  newsText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
    marginTop: 2,
    fontStyle: 'italic',
  },
  dossierPlaceholder: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
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
