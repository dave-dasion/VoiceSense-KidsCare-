import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LearningPath } from './LearningPathsListScreen';

interface DetailCourse {
  id: string;
  title: string;
  duration: string;
  status: 'Completed' | 'Active' | 'Locked';
  lessonsCount: number;
}

const MOCK_PATH_COURSES: Record<string, DetailCourse[]> = {
  p1: [
    { id: 'pc1', title: 'React Native Layouts & Flexbox', duration: '6 hrs', status: 'Completed', lessonsCount: 8 },
    { id: 'pc2', title: 'Redux State Management Architecture', duration: '8 hrs', status: 'Active', lessonsCount: 10 },
    { id: 'pc3', title: 'Custom Native Modules in iOS & Android', duration: '6 hrs', status: 'Locked', lessonsCount: 6 },
    { id: 'pc4', title: 'App Store Optimization & Deployment', duration: '4 hrs', status: 'Locked', lessonsCount: 5 },
  ],
  p2: [
    { id: 'pc5', title: 'Introduction to Prompt Chaining', duration: '4 hrs', status: 'Active', lessonsCount: 6 },
    { id: 'pc6', title: 'Context Optimizations & Personas', duration: '4 hrs', status: 'Locked', lessonsCount: 6 },
    { id: 'pc7', title: 'Vector DB & Agentic Pipelines', duration: '4 hrs', status: 'Locked', lessonsCount: 8 },
  ],
  p3: [
    { id: 'pc8', title: 'Security Cryptography Basics', duration: '5 hrs', status: 'Completed', lessonsCount: 8 },
    { id: 'pc9', title: 'Enterprise Access Policies', duration: '5 hrs', status: 'Completed', lessonsCount: 6 },
    { id: 'pc10', title: 'Cloud Data Auditing Protocols', duration: '5 hrs', status: 'Completed', lessonsCount: 10 },
  ],
};

const SKILLS_LIST: Record<string, string[]> = {
  p1: ['Responsive Layout Architectures', 'Redux Middleware & Hooks', 'Native Java/Swift Bridging', 'Publishing & Fastlane Build Automation'],
  p2: ['Persona Engineering', 'System Prompt Formatting', 'Chaining & RAG Workflows', 'Model Tokens Budget Audit'],
  p3: ['Access Roles Frameworks', 'Data Isolation Policies', 'Regulatory Audit Controls', 'Encryption Keys Rotation'],
};

export default function LearningPathDetailsScreen({ route, navigation }: any) {
  const { path }: { path: LearningPath } = route.params;

  const courses = MOCK_PATH_COURSES[path.id] || [];
  const skills = SKILLS_LIST[path.id] || [];

  const activeCourse = courses.find((c) => c.status === 'Active') || courses[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Path Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Path Card Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.pathCategory}>{path.category}</Text>
          <Text style={styles.pathTitle}>{path.title}</Text>
          <Text style={styles.pathDesc}>{path.description}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="film-outline" size={16} color={COLORS.primary} />
              <Text style={styles.statVal}>{path.coursesCount}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="time-outline" size={16} color={COLORS.primary} />
              <Text style={styles.statVal}>{path.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="ribbon-outline" size={16} color={COLORS.primary} />
              <Text style={styles.statVal}>{path.difficulty}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>
        </View>

        {/* Path Navigation Hub Buttons */}
        <View style={styles.navButtonsRow}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('LearningRoadmap', { path, courses })}
          >
            <LinearGradient
              colors={['#4F46E5', '#3B82F6']}
              style={styles.navBtnGradient}
            >
              <Ionicons name="git-branch-outline" size={20} color={COLORS.white} />
              <Text style={styles.navBtnText}>Roadmap View</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('LearningProgress', { path, courses, skills })}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.navBtnGradient}
            >
              <Ionicons name="analytics" size={20} color={COLORS.white} />
              <Text style={styles.navBtnText}>Path Analytics</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Skill Prerequisites */}
        <Text style={styles.sectionHeader}>Key Core Skills Acquired</Text>
        <View style={styles.skillsCard}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} style={{ marginRight: 8 }} />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Course Track Sequence list */}
        <Text style={styles.sectionHeader}>Course Sequence Schedule</Text>
        <View style={styles.courseList}>
          {courses.map((course, idx) => {
            const isCompleted = course.status === 'Completed';
            const isActive = course.status === 'Active';

            return (
              <View key={course.id} style={[styles.courseRow, isActive && styles.courseRowActive]}>
                <View style={styles.courseIndexCircle}>
                  <Text style={styles.courseIndexText}>{idx + 1}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.courseRowTitle, isCompleted && styles.courseRowTitleDone]}>
                    {course.title}
                  </Text>
                  <Text style={styles.courseRowMeta}>
                    {course.lessonsCount} lessons • {course.duration}
                  </Text>
                </View>

                <View style={styles.statusBox}>
                  {isCompleted ? (
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.success} />
                  ) : isActive ? (
                    <View style={styles.activeTag}>
                      <Text style={styles.activeTagText}>Active</Text>
                    </View>
                  ) : (
                    <Ionicons name="lock-closed" size={18} color={COLORS.textLight} />
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Path Action Footer */}
        {path.progress < 100 && (
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={() => navigation.navigate('ContinueLearning')}
          >
            <Text style={styles.resumeButtonText}>
              {path.progress === 0 ? 'Enroll & Start Learning' : `Resume Course: ${activeCourse.title}`}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 8 }} />
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
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  pathCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 6,
    fontFamily: FONTS.bold,
  },
  pathDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '500',
  },
  navButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  navBtn: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  navBtnGradient: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 24,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  skillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  courseList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  courseRowActive: {
    backgroundColor: COLORS.infoLight,
  },
  courseIndexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseIndexText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  courseRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  courseRowTitleDone: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  courseRowMeta: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  activeTag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  activeTagText: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: '700',
  },
  resumeButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  resumeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
