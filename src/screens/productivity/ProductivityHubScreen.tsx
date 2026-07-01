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

export default function ProductivityHubScreen({ navigation }: any) {
  const showBackButton = navigation.canGoBack();

  const paths = [
    {
      id: 'excel',
      title: 'Microsoft Excel',
      subtitle: 'Spreadsheets & Data',
      desc: 'Formulas, Pivot Tables, functions, VLOOKUP, and business data analysis.',
      icon: 'grid-outline',
      color: COLORS.success,
      gradient: ['#38A169', '#276749'],
      screen: 'ExcelDashboard',
      progress: 0.15,
      lessons: 7,
    },
    {
      id: 'word',
      title: 'Microsoft Word',
      subtitle: 'Business Documents',
      desc: 'Formatting layouts, business memos, templates, and collaboration features.',
      icon: 'document-text-outline',
      color: COLORS.secondary,
      gradient: ['#2B6CB0', '#1A365D'],
      screen: 'WordDashboard',
      progress: 0.0,
      lessons: 7,
    },
    {
      id: 'powerpoint',
      title: 'Microsoft PowerPoint',
      subtitle: 'Decks & Presentation',
      desc: 'Slide design rules, storytelling techniques, sales pitches, and master templates.',
      icon: 'easel-outline',
      color: COLORS.warning,
      gradient: ['#DD6B20', '#9C4221'],
      screen: 'PowerPointDashboard',
      progress: 0.0,
      lessons: 6,
    },
    {
      id: 'business',
      title: 'Productivity Skills',
      subtitle: 'Workplace Operations',
      desc: 'Time management, workplace organization, inbox zero, and active communication.',
      icon: 'briefcase-outline',
      color: COLORS.accent,
      gradient: ['#6B46C1', '#4C309B'],
      screen: 'ProductivityDashboard',
      progress: 0.25,
      lessons: 5,
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
        <Text style={styles.headerTitle}>Productivity Software</Text>
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
            <Text style={styles.heroTitle}>Enhance Your Skills</Text>
            <Text style={styles.heroSubtitle}>
              Master industry-standard software tools and essential workplace methods.
            </Text>
          </View>
          <Ionicons name="desktop-outline" size={80} color="rgba(255, 255, 255, 0.15)" style={styles.heroIcon} />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Select a Training Track</Text>

        {/* Pathway List */}
        {paths.map((path) => (
          <TouchableOpacity
            key={path.id}
            style={styles.pathCard}
            onPress={() => navigation.navigate(path.screen)}
            activeOpacity={0.95}
          >
            <LinearGradient
              colors={path.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardHeader}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={path.icon as any} size={28} color={COLORS.white} />
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.pathSubtitle}>{path.subtitle}</Text>
                <Text style={styles.pathTitle}>{path.title}</Text>
              </View>
            </LinearGradient>
            
            <View style={styles.cardBody}>
              <Text style={styles.pathDesc}>{path.desc}</Text>
              
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{path.lessons} Lessons & Activities</Text>
                <Text style={styles.progressPercent}>{Math.round(path.progress * 100)}% Complete</Text>
              </View>

              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${path.progress * 100}%`, backgroundColor: path.color }]} />
              </View>

              <View style={styles.cardFooter}>
                <Text style={[styles.startLink, { color: path.color }]}>Resume Learning Track</Text>
                <Ionicons name="arrow-forward" size={16} color={path.color} />
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
  pathCard: {
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
  pathSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
    marginTop: 2,
  },
  cardBody: {
    padding: 16,
  },
  pathDesc: {
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
