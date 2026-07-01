import React, { useState, useEffect } from 'react';
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
import { MOCK_LESSONS, DetailedLesson } from './mockData';

export default function LessonListScreen({ route, navigation }: any) {
  const { course } = route.params;
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'document' | 'interactive' | 'completed' | 'inprogress'>('all');
  const [lessons, setLessons] = useState<DetailedLesson[]>([]);

  // Reload lessons state when screen gains focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const courseLessons = MOCK_LESSONS.filter((les) => les.courseId === course.id);
      setLessons(courseLessons);
    });
    return unsubscribe;
  }, [navigation, course.id]);

  const completedCount = lessons.filter((les) => les.status === 'Completed').length;
  const totalCount = lessons.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filteredLessons = lessons.filter((les) => {
    const matchesSearch = les.title.toLowerCase().includes(search.toLowerCase()) ||
      les.description.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return les.type === 'video';
    if (activeFilter === 'document') return les.type === 'document';
    if (activeFilter === 'interactive') return les.type === 'interactive';
    if (activeFilter === 'completed') return les.status === 'Completed';
    if (activeFilter === 'inprogress') return les.status === 'In Progress';
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return { name: 'play-circle', color: COLORS.secondary };
      case 'document':
        return { name: 'document-text', color: COLORS.practice };
      case 'interactive':
        return { name: 'game-controller', color: COLORS.progress };
      default:
        return { name: 'book', color: COLORS.textLight };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return { text: 'Completed', bg: COLORS.successLight, textCol: COLORS.success };
      case 'In Progress':
        return { text: 'In Progress', bg: COLORS.infoLight, textCol: COLORS.info };
      default:
        return { text: 'Not Started', bg: COLORS.border, textCol: COLORS.textLight };
    }
  };

  const renderLessonItem = ({ item }: { item: DetailedLesson }) => {
    const typeStyle = getTypeIcon(item.type);
    const badge = getStatusBadge(item.status);

    return (
      <TouchableOpacity
        style={styles.lessonCard}
        onPress={() => navigation.navigate('LessonDetails', { lesson: item, course })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.typeTag}>
            <Ionicons name={typeStyle.name as any} size={16} color={typeStyle.color} style={{ marginRight: 6 }} />
            <Text style={[styles.typeText, { color: typeStyle.color }]}>
              {item.type.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusBadgeText, { color: badge.textCol }]}>
              {badge.text}
            </Text>
          </View>
        </View>

        <Text style={styles.lessonIndex}>LESSON {item.index}</Text>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDesc} numberOfLines={2}>{item.description}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color={COLORS.textLight} style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="ribbon-outline" size={14} color={COLORS.succeed} style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>{item.points} XP</Text>
          </View>
          <View style={styles.arrowRow}>
            <Text style={styles.startText}>Study</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.secondary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
          <Text style={styles.headerSubtitle}>Curriculum & Lessons</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressCard}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>Overall Course Progress</Text>
          <Text style={styles.progressValue}>
            {completedCount} / {totalCount} Completed ({Math.round(progressPercent)}%)
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.filterSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons..."
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
            { id: 'all', label: 'All' },
            { id: 'video', label: 'Videos' },
            { id: 'document', label: 'Docs' },
            { id: 'interactive', label: 'Quizzes' },
            { id: 'completed', label: 'Completed' },
            { id: 'inprogress', label: 'Active' },
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

      {/* Lessons List */}
      <FlatList
        data={filteredLessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Lessons Match</Text>
            <Text style={styles.emptyDesc}>Try adjusting your filter or search query.</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 6,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  progressValue: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  filterSection: {
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
  searchIcon: {
    marginRight: 8,
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
    paddingBottom: 40,
  },
  lessonCard: {
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
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  lessonIndex: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 12,
    fontWeight: '800',
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
    fontFamily: FONTS.bold,
  },
  lessonDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    marginTop: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  startText: {
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
