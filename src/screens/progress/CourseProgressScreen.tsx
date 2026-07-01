import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COURSE_PROGRESS_DATA, CourseProgress } from './mockProgressData';

const MOCK_LESSONS: Record<string, { title: string; isCompleted: boolean }[]> = {
  course_1: [
    { title: 'Patient Orientation & Ethics', isCompleted: true },
    { title: 'Body Mechanics & Transferring', isCompleted: true },
    { title: 'Bathing & Skin Care', isCompleted: true },
    { title: 'Perineal Care Protocols', isCompleted: true },
    { title: 'Dressing & Grooming', isCompleted: true },
    { title: 'Oral & Denture Care', isCompleted: true },
    { title: 'Hair & Nail Care Checklist', isCompleted: true },
    { title: 'Practical Care Final Quiz', isCompleted: true },
  ],
  course_2: [
    { title: "Introduction to Alzheimer's", isCompleted: true },
    { title: 'Normal Aging vs Dementia', isCompleted: true },
    { title: 'Sensory Validation Techniques', isCompleted: true },
    { title: 'Managing Agitation Drills', isCompleted: true },
    { title: 'Redirection & Distraction', isCompleted: true },
    { title: 'Wandering Safety Protocols', isCompleted: true },
    { title: 'De-escalation Scenarios', isCompleted: false },
    { title: 'Caregiver Respite Checkpoints', isCompleted: false },
    { title: 'Dementia Assessment Quiz', isCompleted: false },
  ],
  course_3: [
    { title: 'Cold Outreach Fundamentals', isCompleted: true },
    { title: 'Objection Identification Drill', isCompleted: true },
    { title: 'Mock Objection Negotiation', isCompleted: false },
    { title: 'Pipeline Qualifying Scenario', isCompleted: false },
    { title: 'Sales Process Quiz', isCompleted: false },
    { title: 'Roleplay Prep Video', isCompleted: false },
    { title: 'Structured Pitch Deck Prep', isCompleted: false },
    { title: 'Outbound Pitch Exam', isCompleted: false },
  ],
  course_4: [
    { title: 'Workplace Rules & Teamwork', isCompleted: false },
    { title: 'Customer Respect & Care Guidelines', isCompleted: false },
    { title: 'HIPAA & Privacy Policies', isCompleted: false },
    { title: 'Reporting & Documentation', isCompleted: false },
    { title: 'Ethics Final Exam', isCompleted: false },
  ],
  course_5: [
    { title: 'Identifying Home Safety Risks', isCompleted: true },
    { title: 'Assistive Devices (Walkers/Canes)', isCompleted: true },
    { title: 'Safe Shower Transfers', isCompleted: true },
    { title: 'Wandering Alert Systems', isCompleted: true },
    { title: 'Post-Fall Reporting Actions', isCompleted: true },
    { title: 'Safety Assessment Quiz', isCompleted: true },
  ],
};

export default function CourseProgressScreen({ navigation }: any) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleExpand = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const getStatusColor = (status: CourseProgress['status']) => {
    switch (status) {
      case 'Completed':
        return COLORS.success;
      case 'In Progress':
        return COLORS.secondary;
      default:
        return COLORS.textLight;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Progress</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>
          Select a course card to view lesson-by-lesson completions.
        </Text>

        {COURSE_PROGRESS_DATA.map((course) => {
          const isExpanded = expandedCourse === course.id;
          const lessons = MOCK_LESSONS[course.id] || [];

          return (
            <View key={course.id} style={styles.cardContainer}>
              <TouchableOpacity
                style={[
                  styles.courseCard,
                  isExpanded && styles.courseCardExpanded
                ]}
                onPress={() => toggleExpand(course.id)}
              >
                {/* Header Row */}
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.categoryText}>{course.category}</Text>
                    <Text style={styles.titleText}>{course.title}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { borderColor: getStatusColor(course.status), backgroundColor: `${getStatusColor(course.status)}10` }
                  ]}>
                    <Text style={[styles.statusText, { color: getStatusColor(course.status) }]}>
                      {course.status}
                    </Text>
                  </View>
                </View>

                {/* Progress Details */}
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{course.percentComplete}%</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{course.lessonsCompleted}/{course.totalLessons}</Text>
                    <Text style={styles.statLabel}>Lessons</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>{course.hoursSpent} hrs</Text>
                    <Text style={styles.statLabel}>Studied</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statVal}>
                      {course.averageScore > 0 ? `${course.averageScore}%` : 'N/A'}
                    </Text>
                    <Text style={styles.statLabel}>Quiz Avg</Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarBg}>
                  <View style={[
                    styles.progressBarFill,
                    {
                      width: `${course.percentComplete}%`,
                      backgroundColor: getStatusColor(course.status)
                    }
                  ]} />
                </View>

                {/* Card Toggle footer */}
                <View style={styles.toggleFooter}>
                  <Text style={styles.toggleText}>
                    {isExpanded ? 'Hide Chapters' : 'View Chapters'}
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={14}
                    color={COLORS.secondary}
                    style={{ marginLeft: 4 }}
                  />
                </View>
              </TouchableOpacity>

              {/* Collapsible lesson list */}
              {isExpanded && (
                <View style={styles.lessonListContainer}>
                  {lessons.map((lesson, index) => (
                    <View
                      key={index}
                      style={[
                        styles.lessonRow,
                        index === lessons.length - 1 && { borderBottomWidth: 0 }
                      ]}
                    >
                      <Ionicons
                        name={lesson.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                        size={18}
                        color={lesson.isCompleted ? COLORS.success : COLORS.border}
                        style={styles.lessonIcon}
                      />
                      <Text style={[
                        styles.lessonTitle,
                        lesson.isCompleted && styles.lessonCompletedText
                      ]}>
                        {lesson.title}
                      </Text>
                      <Text style={[
                        styles.lessonStatusTag,
                        { color: lesson.isCompleted ? COLORS.success : COLORS.textLight }
                      ]}>
                        {lesson.isCompleted ? 'Passed' : 'Pending'}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: COLORS.textLight,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  courseCard: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  courseCardExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  categoryText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 2,
    fontFamily: FONTS.bold,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 8.5,
    color: COLORS.textLight,
    fontWeight: '500',
    marginTop: 2,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  toggleFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  lessonListContainer: {
    backgroundColor: '#FAFDFE',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  lessonIcon: {
    marginRight: 12,
  },
  lessonTitle: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  lessonCompletedText: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  lessonStatusTag: {
    fontSize: 9.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
