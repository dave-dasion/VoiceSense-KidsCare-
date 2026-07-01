import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function AIProductHubScreen({ navigation }: any) {
  const modules = [
    {
      id: 'knowledge',
      title: '1. AI Product Knowledge',
      desc: 'Neural networks, latency parameters, features, and ROI metrics.',
      screen: 'AIProductDashboard',
      icon: 'bulb-outline',
      color: '#4F46E5',
    },
    {
      id: 'positioning',
      title: '2. Product Positioning',
      desc: 'Differentiating value propositions and competitor comparison matrices.',
      screen: 'ProductPositioning',
      icon: 'compass-outline',
      color: '#0EA5E9',
    },
    {
      id: 'healthcare',
      title: '3. Healthcare Solutions',
      desc: 'HIPAA guidelines, clinical workflows, and patient intake audits.',
      screen: 'HealthcareOverview',
      icon: 'heart-outline',
      color: '#10B981',
    },
    {
      id: 'itservices',
      title: '4. IT Services Training',
      desc: 'API triggers, warehouse ingestion, SLA parameters, and hybrid cloud.',
      screen: 'ITServicesOverview',
      icon: 'git-merge-outline',
      color: '#F59E0B',
    },
    {
      id: 'discovery',
      title: '5. Client Discovery',
      desc: 'Legacy infrastructure checklist and operational gap audit.',
      screen: 'ClientDiscoveryDashboard',
      icon: 'search-outline',
      color: '#EC4899',
    },
    {
      id: 'demo',
      title: '6. Product Demonstration',
      desc: 'Sandbox preparation, demo timeline, scripts, and practice scenarios.',
      screen: 'DemoPreparation',
      icon: 'desktop-outline',
      color: '#8B5CF6',
    },
    {
      id: 'questions',
      title: '7. Question Handling',
      desc: 'Answering core technical/business queries and mock response trees.',
      screen: 'FAQ',
      icon: 'chatbubble-ellipses-outline',
      color: '#14B8A6',
    },
    {
      id: 'closing',
      title: '8. Closing & Follow-Up',
      desc: 'Summary and assumptive close scripts, contract adjustments, and final assessments.',
      screen: 'ClosingTechniques',
      icon: 'flag-outline',
      color: '#F43F5E',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Product presentation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>AI Presentation & Demo Arena</Text>
          <Text style={styles.welcomeText}>
            Learn to present machine learning infrastructure, structure clinical & IT workflows, run software sandboxes, and handle critical customer questions.
          </Text>
        </View>

        {/* Modules List */}
        <Text style={styles.sectionTitle}>Training Roadmap</Text>
        <View style={styles.gridContainer}>
          {modules.map((mod) => (
            <TouchableOpacity
              key={mod.id}
              style={styles.moduleCard}
              onPress={() => navigation.navigate(mod.screen)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: mod.color + '15' }]}>
                <Ionicons name={mod.icon as any} size={22} color={mod.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{mod.title}</Text>
                <Text style={styles.cardDesc}>{mod.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}
        </View>
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
  menuButton: {
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
  welcomeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 2,
  },
});
