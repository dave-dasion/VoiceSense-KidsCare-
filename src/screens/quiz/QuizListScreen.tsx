import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { getQuizzes, getAttempts, getOverallStats, Quiz, QuizAttempt } from './mockData';

export default function QuizListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'passed' | 'failed' | 'not_started'>('all');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // Reload stats and quizzes when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setQuizzes(getQuizzes());
      setStats(getOverallStats());
      setAttempts(getAttempts());
    });
    return unsubscribe;
  }, [navigation]);

  const getQuizStatus = (quizId: string) => {
    const quizAttempts = attempts.filter((a) => a.quizId === quizId);
    if (quizAttempts.length === 0) return 'not_started';
    const hasPassed = quizAttempts.some((a) => a.passed);
    return hasPassed ? 'passed' : 'failed';
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return COLORS.success;
      case 'Intermediate':
        return COLORS.warning;
      case 'Advanced':
        return COLORS.accent;
      default:
        return COLORS.textLight;
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.description.toLowerCase().includes(search.toLowerCase()) ||
      quiz.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    const status = getQuizStatus(quiz.id);
    if (activeFilter === 'all') return true;
    if (activeFilter === 'passed') return status === 'passed';
    if (activeFilter === 'failed') return status === 'failed';
    if (activeFilter === 'not_started') return status === 'not_started';
    return true;
  });

  const renderQuizItem = ({ item }: { item: Quiz }) => {
    const status = getQuizStatus(item.id);
    const difficultyColor = getDifficultyColor(item.difficulty);

    let statusBadgeText = 'Not Started';
    let statusBadgeBg = COLORS.border;
    let statusBadgeTextCol = COLORS.textLight;
    let statusIcon = 'play-outline';

    if (status === 'passed') {
      statusBadgeText = 'PASSED';
      statusBadgeBg = COLORS.successLight;
      statusBadgeTextCol = COLORS.success;
      statusIcon = 'checkmark-circle';
    } else if (status === 'failed') {
      statusBadgeText = 'FAILED';
      statusBadgeBg = COLORS.dangerLight;
      statusBadgeTextCol = COLORS.danger;
      statusIcon = 'alert-circle';
    }

    return (
      <TouchableOpacity
        style={styles.quizCard}
        onPress={() => navigation.navigate('QuizInstructions', { quiz: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          <View style={[styles.difficultyTag, { borderColor: difficultyColor }]}>
            <Text style={[styles.difficultyText, { color: difficultyColor }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.quizTitle}>{item.title}</Text>
        <Text style={styles.quizDesc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardMetrics}>
          <View style={styles.metricItem}>
            <Ionicons name="help-circle-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.metricVal}>{item.questionsCount} Qs</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.metricVal}>{item.timeLimit} min</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="sparkles-outline" size={14} color={COLORS.succeed} />
            <Text style={[styles.metricVal, { color: COLORS.succeed, fontWeight: '700' }]}>
              +{item.points} XP
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, { backgroundColor: statusBadgeBg }]}>
            <Ionicons
              name={statusIcon as any}
              size={12}
              color={statusBadgeTextCol}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.statusBadgeText, { color: statusBadgeTextCol }]}>
              {statusBadgeText}
            </Text>
          </View>
          <View style={styles.actionRow}>
            <Text style={styles.actionText}>
              {status === 'not_started' ? 'Start Quiz' : 'Try Again'}
            </Text>
            <Ionicons name="chevron-forward" size={14} color={COLORS.secondary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBtn} 
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Assessments</Text>
          <Text style={styles.headerSub}>Test & Prove Your Knowledge</Text>
        </View>
        <TouchableOpacity 
          style={[styles.headerBtn, styles.leaderboardBtn]}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Ionicons name="trophy" size={20} color="#D69E2E" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards Dashboard */}
      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.warningLight }]}>
                <Ionicons name="sparkles" size={18} color="#D69E2E" />
              </View>
              <Text style={styles.statValue}>{stats.totalXp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.successLight }]}>
                <Ionicons name="checkbox" size={18} color={COLORS.success} />
              </View>
              <Text style={styles.statValue}>
                {stats.completedCount}/{stats.totalQuizzes}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.infoLight }]}>
                <Ionicons name="analytics" size={18} color={COLORS.info} />
              </View>
              <Text style={styles.statValue}>{stats.averageScore}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.accentLight }]}>
                <Ionicons name="ribbon" size={18} color={COLORS.accent} />
              </View>
              <Text style={styles.statValue}>#{stats.globalRank}</Text>
              <Text style={styles.statLabel}>Global Rank</Text>
            </View>
          </View>
        </View>
      )}

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assessments..."
            placeholderTextColor={COLORS.textLight}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={[
            { id: 'all', label: 'All Quizzes' },
            { id: 'not_started', label: 'Not Attempted' },
            { id: 'passed', label: 'Passed' },
            { id: 'failed', label: 'Failed' },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isActive = activeFilter === item.id;
            return (
              <TouchableOpacity
                style={[styles.chipButton, isActive && styles.chipButtonActive]}
                onPress={() => setActiveFilter(item.id as any)}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Quizzes List */}
      <FlatList
        data={filteredQuizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="clipboard-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Assessments Found</Text>
            <Text style={styles.emptyDesc}>Try adjusting your search criteria or filters.</Text>
          </View>
        }
      />
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerBtn: {
    padding: 6,
  },
  leaderboardBtn: {
    backgroundColor: '#FEFCBF',
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D69E2E',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSub: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: COLORS.white,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  searchSection: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 2,
  },
  chipButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  quizCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 9,
    fontWeight: '800',
  },
  quizTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  quizDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    marginBottom: 12,
  },
  cardMetrics: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metricVal: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 16,
    fontFamily: FONTS.bold,
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
