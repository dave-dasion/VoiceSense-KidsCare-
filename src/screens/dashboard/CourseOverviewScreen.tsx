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
import { Course } from './CourseCatalogScreen';

export default function CourseOverviewScreen({ route, navigation }: any) {
  const { course }: { course: Course } = route.params;

  // Mock announcement logs
  const ANNOUNCEMENTS = [
    { id: 'a1', date: 'June 4, 2026', title: 'Office Hours Tonight', content: 'Join Marcus at 6 PM EST for live Q&A state debugging reviews.' },
    { id: 'a2', date: 'May 28, 2026', title: 'Chapter 2 Resources Added', content: 'Full cheat sheets and starter code bundles have been uploaded to the resources tab.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Workspace</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Course Header Banner */}
        <View style={styles.welcomeCard}>
          <Text style={styles.categoryText}>{course.category}</Text>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorSub}>Led by: {course.instructor}</Text>

          <View style={styles.progressRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressLbl}>Course Completion</Text>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: course.id === 'mc1' ? '100%' : '40%' }]} />
              </View>
            </View>
            <Text style={styles.progressVal}>{course.id === 'mc1' ? '100' : '40'}%</Text>
          </View>
        </View>

        {/* Enter Class content CTA */}
        <TouchableOpacity
          style={styles.contentCta}
          onPress={() => navigation.navigate('CourseContent', { course })}
        >
          <Ionicons name="play-circle" size={24} color={COLORS.white} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.ctaHeader}>Enter Course Content</Text>
            <Text style={styles.ctaDesc}>Access interactive lessons, code workspaces, and file resources.</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>

        {/* Instructor Message Box */}
        <Text style={styles.sectionHeader}>Instructor Message</Text>
        <View style={styles.instructorCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarTxt}>
              {course.instructor.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.instructorName}>{course.instructor}</Text>
            <Text style={styles.instructorQuote}>
              "Welcome to the module! Be sure to read the code examples carefully and complete the chapter challenges. Feel free to start a forum discussion thread if you get stuck."
            </Text>
          </View>
        </View>

        {/* Announcements List */}
        <Text style={styles.sectionHeader}>Announcements</Text>
        <View style={styles.announceList}>
          {ANNOUNCEMENTS.map((ann) => (
            <View key={ann.id} style={styles.announceCard}>
              <View style={styles.announceHeader}>
                <Text style={styles.announceTitle}>{ann.title}</Text>
                <Text style={styles.announceDate}>{ann.date}</Text>
              </View>
              <Text style={styles.announceContent}>{ann.content}</Text>
            </View>
          ))}
        </View>
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
  welcomeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
    fontFamily: FONTS.bold,
  },
  instructorSub: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  progressLbl: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  progressVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  contentCta: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  ctaHeader: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  ctaDesc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 14,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  instructorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  instructorName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  instructorQuote: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 16,
  },
  announceList: {
    marginBottom: 16,
  },
  announceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  announceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  announceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  announceDate: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  announceContent: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
});
