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

export default function PresentationBuildingScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState<'Master' | 'Transitions'>('Master');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Slide Building</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Master Decks & Motion</Text>
          <Text style={styles.cardBody}>
            Creating consistent slides requires leveraging PowerPoint's core automation tools.
          </Text>
          <Text style={styles.cardBody}>
            Use a <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Master Slide</Text> to define global background designs, headers, and footer page counts once. Use transitions and entry animations to control the visual flow of information during presentations.
          </Text>
        </View>

        {/* Tab Controls */}
        <Text style={styles.sectionTitle}>Tap to Learn Key Building Tools</Text>
        <View style={styles.tabContainer}>
          {(['Master', 'Transitions'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab === 'Master' ? 'Master Slide Templates' : 'Transitions & Timing'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Detail Card */}
        {selectedTab === 'Master' ? (
          <View style={styles.detailCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="layers-outline" size={22} color={COLORS.secondary} />
              <Text style={styles.cardTitle}>Global Master Templates</Text>
            </View>
            <Text style={styles.cardText}>
              Instead of manually styling and copying headings across dozens of slides, configure a Slide Master template. Any logo placement, margin grid, font choice, or footer page number defined here propagates automatically.
            </Text>
            <View style={styles.featureBox}>
              <Text style={styles.featureItem}>• Saves hours of styling formatting.</Text>
              <Text style={styles.featureItem}>• Enforces corporate branding rules automatically.</Text>
              <Text style={styles.featureItem}>• Easily update global layouts with a single edit.</Text>
            </View>
          </View>
        ) : (
          <View style={styles.detailCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="play-forward-outline" size={22} color={COLORS.secondary} />
              <Text style={styles.cardTitle}>Transitions & Motion Rules</Text>
            </View>
            <Text style={styles.cardText}>
              Transitions control the motion style when moving from one slide to another. Use subtle fades (0.5 to 1.0 seconds) to maintain professional composure.
            </Text>
            <View style={styles.featureBox}>
              <Text style={styles.featureItem}>• Avoid flashy, distracting cartoonish entries.</Text>
              <Text style={styles.featureItem}>• Keep transition speed uniform across the entire deck.</Text>
              <Text style={styles.featureItem}>• Sync slide reveals to match your vocal cues.</Text>
            </View>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('StorytellingTechniques')}
        >
          <Text style={styles.nextButtonText}>Proceed to Storytelling</Text>
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.secondary,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 8,
    fontFamily: FONTS.bold,
  },
  cardText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 14,
  },
  featureBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  featureItem: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginBottom: 4,
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
