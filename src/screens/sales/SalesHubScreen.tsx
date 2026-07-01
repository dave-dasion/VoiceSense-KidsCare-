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
import { LinearGradient } from 'expo-linear-gradient';

export default function SalesHubScreen({ navigation }: any) {
  const showBackButton = navigation.canGoBack();

  const tracks = [
    {
      id: 'prospecting',
      title: 'Prospect Identification',
      subtitle: 'Target Profiling & Qualification',
      desc: 'Ideal Customer Profiles (ICP), lead lists, and BANT qualification frameworks.',
      icon: 'search-outline',
      color: COLORS.success,
      gradient: ['#38A169', '#276749'],
      screen: 'ProspectingDashboard',
      progress: 0.1,
      lessons: 5,
    },
    {
      id: 'outreach',
      title: 'Sales Outreach',
      subtitle: 'Cold Pitching & Touchpoints',
      desc: 'Cold call trees, emails, LinkedIn connection pitches, and multichannel sequencing.',
      icon: 'paper-plane-outline',
      color: COLORS.secondary,
      gradient: ['#2B6CB0', '#1A365D'],
      screen: 'OutreachDashboard',
      progress: 0.0,
      lessons: 6,
    },
    {
      id: 'communication',
      title: 'Communication Skills',
      subtitle: 'Active Listening & Etiquette',
      desc: 'Professional communication formats, corporate etiquette, and active listening drills.',
      icon: 'chatbubble-ellipses-outline',
      color: COLORS.warning,
      gradient: ['#DD6B20', '#9C4221'],
      screen: 'CommunicationDashboard',
      progress: 0.0,
      lessons: 6,
    },
    {
      id: 'discovery',
      title: 'Discovery Conversations',
      subtitle: 'Client Needs & Pain Mapping',
      desc: 'Discovery question categories, client gap analysis, and pain point maps.',
      icon: 'compass-outline',
      color: COLORS.accent,
      gradient: ['#6B46C1', '#4C309B'],
      screen: 'DiscoveryDashboard',
      progress: 0.0,
      lessons: 5,
    },
    {
      id: 'objections',
      title: 'Objection Handling',
      subtitle: 'Objections & Negotiation',
      desc: 'LAER framework dialogues, price resistance cards, and basic value concessions.',
      icon: 'shield-checkmark-outline',
      color: COLORS.danger,
      gradient: ['#E53E3E', '#9B2C2C'],
      screen: 'ObjectionDashboard',
      progress: 0.0,
      lessons: 5,
    },
    {
      id: 'fundamentals',
      title: 'Sales Process Fundamentals',
      subtitle: 'Pipeline & Pipeline Rules',
      desc: 'Interactive pipeline Kanban board, deal score calculations, and follow-ups.',
      icon: 'git-branch-outline',
      color: COLORS.primary,
      gradient: ['#3182CE', '#2B6CB0'],
      screen: 'SalesPipeline', // Lead to first screen of fundamentals
      progress: 0.0,
      lessons: 4,
    },
    {
      id: 'roleplay',
      title: 'Sales Role Play',
      subtitle: 'Mock Calls & Evaluation',
      desc: 'Dialogue simulators, scenario calls, and interactive feedback review checklists.',
      icon: 'people-outline',
      color: COLORS.textLight,
      gradient: ['#718096', '#4A5568'],
      screen: 'RolePlayDashboard',
      progress: 0.0,
      lessons: 4,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => showBackButton ? navigation.goBack() : navigation.openDrawer()}
          style={styles.backButton}
        >
          <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Outreach & Comm</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Master Modern Sales</Text>
            <Text style={styles.heroSubtitle}>
              Develop lead qualification, cold messaging, discovery methods, and roleplay scripts.
            </Text>
          </View>
          <Ionicons name="trending-up" size={80} color="rgba(255, 255, 255, 0.15)" style={styles.heroIcon} />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Training Modules</Text>

        {/* Tracks List */}
        {tracks.map((track) => (
          <TouchableOpacity
            key={track.id}
            style={styles.trackCard}
            onPress={() => navigation.navigate(track.screen)}
            activeOpacity={0.95}
          >
            <LinearGradient
              colors={track.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardHeader}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={track.icon as any} size={28} color={COLORS.white} />
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.trackSubtitle}>{track.subtitle}</Text>
                <Text style={styles.trackTitle}>{track.title}</Text>
              </View>
            </LinearGradient>
            
            <View style={styles.cardBody}>
              <Text style={styles.trackDesc}>{track.desc}</Text>
              
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{track.lessons} Lessons & Activities</Text>
                <Text style={styles.progressPercent}>{Math.round(track.progress * 100)}% Complete</Text>
              </View>

              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${track.progress * 100}%`, backgroundColor: track.color }]} />
              </View>

              <View style={styles.cardFooter}>
                <Text style={[styles.startLink, { color: track.color }]}>Resume Learning Track</Text>
                <Ionicons name="arrow-forward" size={16} color={track.color} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 30,
  },
  heroBanner: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  heroTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  heroIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  trackCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  trackSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  trackTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
    marginTop: 2,
  },
  cardBody: {
    padding: 16,
  },
  trackDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  startLink: {
    fontSize: 12,
    fontWeight: '700',
  },
});
