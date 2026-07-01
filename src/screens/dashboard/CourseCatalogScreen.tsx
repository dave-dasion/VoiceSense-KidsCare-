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

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  studentsCount: number;
  price: string;
  isEnrolled: boolean;
}

// In-memory catalog state to dynamically reflect enrollments during active app session
let CATALOG_DATA: Course[] = [
  {
    id: 'mc1',
    title: 'React Native Layouts & Flexbox',
    category: 'Frontend',
    description: 'Learn to design complex mobile layouts using Flexbox, layout boundaries, and responsive grids.',
    instructor: 'Emily Watson',
    duration: '6 hours',
    lessonsCount: 8,
    rating: 4.8,
    studentsCount: 1240,
    price: 'Free',
    isEnrolled: true,
  },
  {
    id: 'mc2',
    title: 'Redux State Management Architecture',
    category: 'Frontend',
    description: 'Master central state flows, action reducers, middleware integration, and performance enhancements.',
    instructor: 'Marcus Aurelius',
    duration: '8 hours',
    lessonsCount: 10,
    rating: 4.7,
    studentsCount: 850,
    price: 'Free',
    isEnrolled: true,
  },
  {
    id: 'mc3',
    title: 'Custom Native Modules in iOS & Android',
    category: 'Mobile Native',
    description: 'Expose objective native code routines, build thread listeners, and bind third-party SDKs.',
    instructor: 'Devin Finch',
    duration: '6 hours',
    lessonsCount: 6,
    rating: 4.9,
    studentsCount: 430,
    price: '$99',
    isEnrolled: false,
  },
  {
    id: 'mc4',
    title: 'AI Prompt Engineering & Personas',
    category: 'AI Training',
    description: 'Structure complex instruction sets, construct context windows, and deploy RAG agents.',
    instructor: 'Sophia Reed',
    duration: '4 hours',
    lessonsCount: 6,
    rating: 4.6,
    studentsCount: 2150,
    price: '$49',
    isEnrolled: false,
  },
];

// Helper functions to manage catalog state across screens
export function getCatalogCourses() {
  return CATALOG_DATA;
}

export function enrollInCatalogCourse(courseId: string) {
  CATALOG_DATA = CATALOG_DATA.map((course) =>
    course.id === courseId ? { ...course, isEnrolled: true } : course
  );
}

export default function CourseCatalogScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Frontend' | 'Mobile Native' | 'AI Training'>('All');
  const [courses, setCourses] = useState<Course[]>(getCatalogCourses());

  // Focus effect simulator to refresh data when returning from checkout screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCourses(getCatalogCourses());
    });
    return unsubscribe;
  }, [navigation]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && course.category === activeTab;
  });

  const renderCourseItem = ({ item }: { item: Course }) => {
    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetails', { course: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#D69E2E" style={{ marginRight: 2 }} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.instructorText}>Instructor: {item.instructor}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="book-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.statText}>{item.lessonsCount} lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={[
            styles.priceBadge,
            item.price === 'Free' ? styles.priceBadgeFree : styles.priceBadgePaid
          ]}>
            <Text style={[
              styles.priceText,
              item.price === 'Free' ? styles.priceTextFree : styles.priceTextPaid
            ]}>
              {item.price}
            </Text>
          </View>

          <View style={styles.actionRow}>
            {item.isEnrolled ? (
              <View style={styles.enrolledBadge}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                <Text style={styles.enrolledText}>Enrolled</Text>
              </View>
            ) : (
              <>
                <Text style={styles.learnMoreText}>View Details</Text>
                <Ionicons name="chevron-forward" size={14} color={COLORS.secondary} />
              </>
            )}
          </View>
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
        <Text style={styles.headerTitle}>Course Catalog</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses or instructors..."
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

      {/* Categories */}
      <View style={styles.tabsContainer}>
        {(['All', 'Frontend', 'Mobile Native', 'AI Training'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'Mobile Native' ? 'Native' : tab === 'AI Training' ? 'AI' : tab}
            </Text>
          </TouchableOpacity>
        ))}
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
            <Ionicons name="library-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Courses Found</Text>
            <Text style={styles.emptyDesc}>Try searching for a different keyword or category.</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.white,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
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
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  priceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceBadgeFree: {
    backgroundColor: COLORS.successLight,
  },
  priceBadgePaid: {
    backgroundColor: COLORS.infoLight,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '800',
  },
  priceTextFree: {
    color: COLORS.success,
  },
  priceTextPaid: {
    color: COLORS.info,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  enrolledText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
    marginLeft: 4,
  },
  learnMoreText: {
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
