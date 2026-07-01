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

export interface LearningPath {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number; // 0 to 100
  coursesCount: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MOCK_PATHS: LearningPath[] = [
  {
    id: 'p1',
    title: 'React Native Mobile Architect',
    category: 'Mobile Engineering',
    description: 'Master screen layout designs, local databases, context state systems, and custom native bridging.',
    progress: 75,
    coursesCount: 4,
    duration: '24 hours',
    difficulty: 'Intermediate',
  },
  {
    id: 'p2',
    title: 'AI Prompt & Assistant Builder',
    category: 'Artificial Intelligence',
    description: 'Learn context optimization, prompt architectures, instruction chaining, and system personas creation.',
    progress: 0,
    coursesCount: 3,
    duration: '12 hours',
    difficulty: 'Beginner',
  },
  {
    id: 'p3',
    title: 'Enterprise Security Compliance',
    category: 'IT Compliance',
    description: 'Full overview of encryption standards, access policies, data retention, and cloud auditing processes.',
    progress: 100,
    coursesCount: 5,
    duration: '15 hours',
    difficulty: 'Advanced',
  },
];

export default function LearningPathsListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Progress' | 'Completed'>('All');

  const filteredPaths = MOCK_PATHS.filter((path) => {
    const matchesSearch = path.title.toLowerCase().includes(search.toLowerCase()) ||
      path.category.toLowerCase().includes(search.toLowerCase()) ||
      path.description.toLowerCase().includes(search.toLowerCase());

    if (activeFilter === 'Progress') {
      return matchesSearch && path.progress > 0 && path.progress < 100;
    }
    if (activeFilter === 'Completed') {
      return matchesSearch && path.progress === 100;
    }
    return matchesSearch;
  });

  const renderPathItem = ({ item }: { item: LearningPath }) => {
    const isCompleted = item.progress === 100;
    const isNotStarted = item.progress === 0;

    return (
      <TouchableOpacity
        style={styles.pathCard}
        onPress={() => navigation.navigate('LearningPathDetails', { path: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <View style={[styles.badge, styles[`badge${item.difficulty}`]]}>
            <Text style={[styles.badgeText, styles[`badgeText${item.difficulty}`]]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.pathTitle}>{item.title}</Text>
        <Text style={styles.pathDescription} numberOfLines={2}>{item.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.metaText}>{item.coursesCount} Courses</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {isCompleted ? 'Path Finished' : isNotStarted ? 'Not Started' : 'Progress'}
          </Text>
          <Text style={styles.progressPercent}>{item.progress}%</Text>
        </View>

        {/* Custom Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${item.progress}%`,
                backgroundColor: isCompleted ? COLORS.success : COLORS.secondary,
              },
            ]}
          />
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.actionLink}>View Path Details</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.secondary} />
        </View>
      </TouchableOpacity>
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
          <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Paths</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search learning paths..."
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

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {(['All', 'Progress', 'Completed'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterBtn, activeFilter === filter && styles.filterBtnActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter === 'Progress' ? 'In Progress' : filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredPaths}
        renderItem={renderPathItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="git-network-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Learning Paths Found</Text>
            <Text style={styles.emptyDesc}>Try adjusting search or filters.</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
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
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  pathCard: {
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
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeBeginner: {
    backgroundColor: '#E6FFFA',
  },
  badgeIntermediate: {
    backgroundColor: '#EBF8FF',
  },
  badgeAdvanced: {
    backgroundColor: '#FFF5F5',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextBeginner: {
    color: '#319795',
  },
  badgeTextIntermediate: {
    color: '#3182CE',
  },
  badgeTextAdvanced: {
    color: '#E53E3E',
  },
  pathTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  pathDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '500',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginBottom: 14,
  },
  progressBarFill: {
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
  actionLink: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 16,
    fontFamily: FONTS.bold,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
  },
});
