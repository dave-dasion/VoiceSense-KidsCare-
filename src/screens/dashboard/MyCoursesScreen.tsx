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
import { Course, getCatalogCourses } from './CourseCatalogScreen';

// Mock progress mappings for enrolled courses
const ENROLLED_PROGRESS: Record<string, number> = {
  mc1: 100, // completed
  mc2: 40,  // in progress
};

export default function MyCoursesScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  // Focus subscriber to refresh enrollments list
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const active = getCatalogCourses().filter((c) => c.isEnrolled);
      setMyCourses(active);
    });
    return unsubscribe;
  }, [navigation]);

  const filtered = myCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  const renderCourseItem = ({ item }: { item: Course }) => {
    const progress = ENROLLED_PROGRESS[item.id] !== undefined ? ENROLLED_PROGRESS[item.id] : 0;
    const isFinished = progress === 100;

    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseOverview', { course: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <View style={[styles.statusBadge, isFinished ? styles.badgeDone : styles.badgeActive]}>
            <Text style={[styles.badgeText, isFinished ? styles.badgeTextDone : styles.badgeTextActive]}>
              {isFinished ? 'Completed' : 'In Progress'}
            </Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.instructorText}>Instructor: {item.instructor}</Text>

        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Course Progress</Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[
              styles.progressBarFill,
              { width: `${progress}%`, backgroundColor: isFinished ? COLORS.success : COLORS.secondary }
            ]} />
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.actionText}>
            {isFinished ? 'Review Content' : 'Resume Lessons'}
          </Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.secondary} />
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
        <Text style={styles.headerTitle}>My Enrolled Courses</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search enrolled courses..."
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

      {/* Course List */}
      <FlatList
        data={filtered}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Active Enrollments</Text>
            <Text style={styles.emptyDesc}>Discover and sign up for classes inside the Course Catalog.</Text>
            
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('CourseCatalog')}
            >
              <Text style={styles.browseBtnText}>Browse Catalog</Text>
            </TouchableOpacity>
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
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  courseCard: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeActive: {
    backgroundColor: COLORS.infoLight,
  },
  badgeDone: {
    backgroundColor: COLORS.successLight,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextActive: {
    color: COLORS.info,
  },
  badgeTextDone: {
    color: COLORS.success,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  instructorText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  progressSection: {
    marginTop: 16,
    marginBottom: 14,
  },
  progressLabelRow: {
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
  actionText: {
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
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  browseBtn: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    ...SHADOWS.light,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
