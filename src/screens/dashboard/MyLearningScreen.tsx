import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number; // 0 to 100
  lessonsCount: number;
  completedCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'React Native Layouts & Flexbox',
    category: 'Frontend Engineering',
    progress: 75,
    lessonsCount: 8,
    completedCount: 6,
    difficulty: 'Beginner',
  },
  {
    id: 'c2',
    title: 'Redux State Management Architecture',
    category: 'Architecture',
    progress: 40,
    lessonsCount: 10,
    completedCount: 4,
    difficulty: 'Intermediate',
  },
  {
    id: 'c3',
    title: 'Custom Native Modules in iOS & Android',
    category: 'Advanced Native',
    progress: 0,
    lessonsCount: 6,
    completedCount: 0,
    difficulty: 'Advanced',
  },
  {
    id: 'c4',
    title: 'App Store Optimization & Deployment',
    category: 'Product & Launch',
    progress: 100,
    lessonsCount: 5,
    completedCount: 5,
    difficulty: 'Intermediate',
  },
  {
    id: 'c5',
    title: 'Performance Profiling & Memory Leak Audit',
    category: 'Performance Tuning',
    progress: 15,
    lessonsCount: 8,
    completedCount: 1,
    difficulty: 'Advanced',
  },
];

export default function MyLearningScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'Active') {
      return matchesSearch && course.progress > 0 && course.progress < 100;
    }
    if (activeTab === 'Completed') {
      return matchesSearch && course.progress === 100;
    }
    return matchesSearch;
  });

  const renderCourseItem = ({ item }: { item: Course }) => {
    const isCompleted = item.progress === 100;
    const isNotStarted = item.progress === 0;

    // Difficulty styles helper
    const getDifficultyStyles = (diff: Course['difficulty']) => {
      switch (diff) {
        case 'Beginner':
          return { bg: '#ECFDF5', text: '#059669', dot: '#10B981' };
        case 'Intermediate':
          return { bg: '#EFF6FF', text: '#2563EB', dot: '#3B82F6' };
        case 'Advanced':
          return { bg: '#FFF1F2', text: '#E11D48', dot: '#F43F5E' };
      }
    };

    const diffStyle = getDifficultyStyles(item.difficulty);

    // Left Border Color accent based on progress state
    const getLeftBorderColor = () => {
      if (isCompleted) return '#10B981'; // Green
      if (isNotStarted) return '#94A3B8'; // Grey
      return '#3B82F6'; // Blue
    };

    return (
      <View style={[styles.courseCard, { borderLeftColor: getLeftBorderColor() }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <View style={[styles.badge, { backgroundColor: diffStyle.bg }]}>
            <View style={[styles.badgeDot, { backgroundColor: diffStyle.dot }]} />
            <Text style={[styles.badgeText, { color: diffStyle.text }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{item.title}</Text>

        <View style={styles.progressRow}>
          <View style={styles.progressInfoRow}>
            <Ionicons name="book-outline" size={14} color={COLORS.textLight} style={{ marginRight: 5 }} />
            <Text style={styles.progressText}>
              {item.completedCount}/{item.lessonsCount} lessons completed
            </Text>
          </View>
          <Text style={styles.percentText}>{item.progress}%</Text>
        </View>

        {/* Custom Premium Progress Bar */}
        <View style={styles.progressBarBg}>
          {item.progress > 0 && (
            <LinearGradient
              colors={isCompleted ? ['#10B981', '#059669'] : ['#3B82F6', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${item.progress}%` }]}
            />
          )}
        </View>

        {/* Card Footer Divider */}
        <View style={styles.cardDivider} />

        <View style={styles.cardFooter}>
          <View style={styles.statusLabelContainer}>
            <Ionicons
              name={isCompleted ? "checkmark-circle" : isNotStarted ? "ellipse-outline" : "play-circle"}
              size={18}
              color={isCompleted ? '#10B981' : isNotStarted ? '#94A3B8' : '#3B82F6'}
            />
            <Text style={[
              styles.statusLabelText,
              { color: isCompleted ? '#059669' : isNotStarted ? '#64748B' : '#2563EB' }
            ]}>
              {isCompleted ? 'Completed' : isNotStarted ? 'Not Started' : 'In Progress'}
            </Text>
          </View>

          {isCompleted ? (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => navigation.navigate('ContinueLearning')}
            >
              <Text style={styles.reviewButtonText}>Review</Text>
              <Ionicons name="eye-outline" size={14} color="#64748B" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ContinueLearning')}
              style={{ borderRadius: 12, overflow: 'hidden' }}
            >
              <LinearGradient
                colors={isNotStarted ? ['#4F46E5', '#3730A3'] : ['#3B82F6', '#1D4ED8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionButtonGradient}
              >
                <Text style={styles.actionButtonText}>
                  {isNotStarted ? 'Start' : 'Resume'}
                </Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 4 }} />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const showBackButton = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => showBackButton ? navigation.goBack() : navigation.openDrawer()} 
          style={styles.backButton}
        >
          <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Learning Tracks</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses or topics..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearSearchBtn}>
            <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs / Filter Pills */}
      <View style={styles.tabsContainer}>
        {(['All', 'Active', 'Completed'] as const).map((tab) => {
          const isTabActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                isTabActive && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                isTabActive && styles.tabTextActive
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={54} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No Courses Found</Text>
            <Text style={styles.emptyDesc}>Try searching for a different keyword or check other tabs.</Text>
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
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 48,
    ...SHADOWS.light,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  clearSearchBtn: {
    padding: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.light,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderLeftWidth: 6, // Thick Left Status Accent border
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 10,
    marginBottom: 16,
    lineHeight: 22,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  percentText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabelText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 18,
  },
});
