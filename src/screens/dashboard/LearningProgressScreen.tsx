import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LearningPath } from './LearningPathsListScreen';

const { width } = Dimensions.get('window');

interface PathBadge {
  id: string;
  name: string;
  isUnlocked: boolean;
  icon: string;
  color: string;
}

const PATH_BADGES: Record<string, PathBadge[]> = {
  p1: [
    { id: 'b1', name: 'Layout Cadet', isUnlocked: true, icon: 'layers', color: '#319795' },
    { id: 'b2', name: 'State Master', isUnlocked: true, icon: 'git-merge', color: '#805AD5' },
    { id: 'b3', name: 'Native Captain', isUnlocked: false, icon: 'hardware-chip', color: '#DD6B20' },
    { id: 'b4', name: 'App General', isUnlocked: false, icon: 'trophy', color: '#D69E2E' },
  ],
  p2: [
    { id: 'b5', name: 'Prompt Cadet', isUnlocked: true, icon: 'chatbubbles', color: '#3182CE' },
    { id: 'b6', name: 'RAG Specialist', isUnlocked: false, icon: 'search', color: '#E53E3E' },
    { id: 'b7', name: 'Pipeline Expert', isUnlocked: false, icon: 'git-network', color: '#D69E2E' },
  ],
  p3: [
    { id: 'b8', name: 'Keys Warden', isUnlocked: true, icon: 'key', color: '#319795' },
    { id: 'b9', name: 'Group Auditor', isUnlocked: true, icon: 'shield-lock', color: '#805AD5' },
    { id: 'b10', name: 'Cloud inspector', isUnlocked: true, icon: 'eye', color: '#3182CE' },
  ],
};

export default function LearningProgressScreen({ route, navigation }: any) {
  const { path }: { path: LearningPath } = route.params;

  const badges = PATH_BADGES[path.id] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Path Progress</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Stats Overview */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{path.progress}%</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>
              {path.id === 'p1' ? '2 / 4' : path.id === 'p2' ? '0 / 3' : '3 / 3'}
            </Text>
            <Text style={styles.statLabel}>Courses Finished</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>
              {path.id === 'p1' ? '12.5h' : path.id === 'p2' ? '0h' : '15h'}
            </Text>
            <Text style={styles.statLabel}>Study Hours</Text>
          </View>
        </View>

        {/* Up Next Milestone Banner */}
        {path.progress < 100 && (
          <View style={styles.upNextCard}>
            <View style={styles.upNextIconCircle}>
              <Ionicons name="sparkles" size={20} color={COLORS.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.upNextTag}>Up Next Milestone</Text>
              <Text style={styles.upNextTitle}>
                {path.id === 'p1'
                  ? 'Complete Redux Middleware Quiz'
                  : 'Start Intro to Prompt Chaining course'}
              </Text>
              <Text style={styles.upNextDesc}>
                Required to unlock the next credentials badge.
              </Text>
            </View>
          </View>
        )}

        {/* Path Credentials Badges */}
        <Text style={styles.sectionTitle}>Path Badges & Achievements</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badgeCard, !badge.isUnlocked && styles.badgeCardLocked]}
            >
              <View style={[
                styles.badgeIconOuter,
                { borderColor: badge.isUnlocked ? badge.color : '#E2E8F0' },
                !badge.isUnlocked && styles.badgeIconOuterLocked
              ]}>
                <Ionicons
                  name={badge.icon as any}
                  size={24}
                  color={badge.isUnlocked ? badge.color : COLORS.textLight}
                />
              </View>
              <Text style={[styles.badgeName, !badge.isUnlocked && styles.badgeNameLocked]}>
                {badge.name}
              </Text>
              <Text style={styles.badgeStatus}>
                {badge.isUnlocked ? 'Earned' : 'Locked'}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Button */}
        {path.progress < 100 && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ContinueLearning')}
          >
            <Text style={styles.actionButtonText}>Resume Active Chapter</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        )}
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  upNextCard: {
    backgroundColor: COLORS.infoLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  upNextIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    ...SHADOWS.light,
  },
  upNextTag: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  upNextTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 2,
    fontFamily: FONTS.bold,
  },
  upNextDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  badgeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: (width - 44) / 2,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  badgeCardLocked: {
    backgroundColor: '#F8FAFC',
    opacity: 0.8,
  },
  badgeIconOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeIconOuterLocked: {
    backgroundColor: '#EDF2F7',
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  badgeNameLocked: {
    color: COLORS.textLight,
  },
  badgeStatus: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '500',
    marginTop: 2,
  },
  actionButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
