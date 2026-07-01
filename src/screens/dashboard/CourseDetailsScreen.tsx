import React, { useRef, useState } from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';

interface Chapter {
  id: string;
  title: string;
  lessons: string[];
}

const MOCK_CHAPTERS: Record<string, Chapter[]> = {
  mc1: [
    { id: 'ch1', title: 'Chapter 1: Flexbox Basics', lessons: ['Intro to layout hierarchies', 'Understanding Flex direction & Wrap', 'Aligning items and self-positions'] },
    { id: 'ch2', title: 'Chapter 2: Responsive Design', lessons: ['Dealing with screen sizes and orientations', 'Defining dynamic percentage width sizes', 'Safe areas and margins buffers'] },
  ],
  mc2: [
    { id: 'ch3', title: 'Chapter 1: Redux Essentials', lessons: ['Core store architecture design', 'Actions creators and payload scopes', 'Using Redux state Hooks'] },
    { id: 'ch4', title: 'Chapter 2: Middlewares & Sagas', lessons: ['Creating async generator saga flows', 'Handling API responses & fetch routines', 'Debouncing and throttling actions'] },
  ],
  mc3: [
    { id: 'ch5', title: 'Chapter 1: iOS Module Bridging', lessons: ['Exposing Objective-C macros to JS', 'Handling NSNotification thread cues', 'Transferring parameters and JSON collections'] },
    { id: 'ch6', title: 'Chapter 2: Android Modules Bridging', lessons: ['Defining ReactMethod annotations in Java', 'Running asynchronous promises', 'Lifecycle callbacks configurations'] },
  ],
  mc4: [
    { id: 'ch7', title: 'Chapter 1: Prompt Fundamentals', lessons: ['Configuring zero-shot and few-shot presets', 'Understanding model token costs', 'System vs User prompt scopes'] },
    { id: 'ch8', title: 'Chapter 2: Agent Workflows', lessons: ['Constructing multi-agent decision steps', 'Using tools and function outputs', 'Integrating with Pinecone RAG databases'] },
  ],
};

const SKILLS_CHECKLIST: Record<string, string[]> = {
  mc1: ['Implement nested Flexbox layouts', 'Handle device notches and safe zones', 'Create reusable custom grid containers'],
  mc2: ['Implement scalable Redux state layers', 'Manage complex API calls asynchronously', 'Debug states with Redux Flipper'],
  mc3: ['Expose iOS native functions to JS', 'Build native Android packages in Java/Kotlin', 'Interact with native camera and sensors'],
  mc4: ['Structure highly optimal LLM prompts', 'Design memory retention workflows', 'Connect prompt models to API databases'],
};

export default function CourseDetailsScreen({ route, navigation }: any) {
  const { course }: { course: Course } = route.params;

  const chapters = MOCK_CHAPTERS[course.id] || [];
  const skills = SKILLS_CHECKLIST[course.id] || [];

  const [selectedLesson, setSelectedLesson] = useState<{ title: string; chapterTitle: string } | null>(null);
  const refRBSheet = useRef<any>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.metaHeader}>
            <Text style={styles.categoryText}>{course.category}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#D69E2E" style={{ marginRight: 2 }} />
              <Text style={styles.ratingText}>{course.rating} ({course.studentsCount} students)</Text>
            </View>
          </View>

          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDesc}>{course.description}</Text>

          <View style={styles.metaGrid}>
            <View style={styles.metaBox}>
              <Ionicons name="time" size={16} color={COLORS.secondary} />
              <Text style={styles.metaVal}>{course.duration}</Text>
              <Text style={styles.metaLbl}>Length</Text>
            </View>
            <View style={styles.metaBox}>
              <Ionicons name="film" size={16} color={COLORS.secondary} />
              <Text style={styles.metaVal}>{course.lessonsCount} lessons</Text>
              <Text style={styles.metaLbl}>Curriculum</Text>
            </View>
            <View style={styles.metaBox}>
              <Ionicons name="person" size={16} color={COLORS.secondary} />
              <Text style={styles.metaVal} numberOfLines={1}>{course.instructor.split(' ')[0]}</Text>
              <Text style={styles.metaLbl}>Instructor</Text>
            </View>
          </View>
        </View>

        {/* Skills Covered */}
        <Text style={styles.sectionTitle}>What You Will Master</Text>
        <View style={styles.skillsCard}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} style={{ marginRight: 8 }} />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Syllabus / Chapters Accordion */}
        <Text style={styles.sectionTitle}>Course Syllabus</Text>
        <View style={styles.syllabusCard}>
          {chapters.map((chapter) => (
            <View key={chapter.id} style={styles.chapterBlock}>
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
              {chapter.lessons.map((lesson, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.lessonRow}
                  onPress={() => {
                    setSelectedLesson({ title: lesson, chapterTitle: chapter.title });
                    refRBSheet.current?.open();
                  }}
                >
                  <Ionicons name="play-circle-outline" size={14} color={COLORS.secondary} style={{ marginRight: 8 }} />
                  <Text style={styles.lessonText}>{lesson}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* CTA Button */}
        {course.isEnrolled ? (
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: COLORS.success }]}
            onPress={() => navigation.navigate('CourseOverview', { course })}
          >
            <Text style={styles.ctaButtonText}>Open Course Workspace</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('CourseEnrollment', { course })}
          >
            <Text style={styles.ctaButtonText}>Enroll in Course — {course.price}</Text>
            <Ionicons name="lock-open-outline" size={16} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        draggable={true}
        closeOnPressMask={true}
        height={340}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#CBD5E1',
            width: 60,
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            backgroundColor: COLORS.white,
          },
        }}
      >
        {selectedLesson && (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetChapter}>{selectedLesson.chapterTitle}</Text>
            <Text style={styles.sheetTitle}>{selectedLesson.title}</Text>
            
            <View style={styles.sheetMetaRow}>
              <View style={styles.sheetMeta}>
                <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
                <Text style={styles.sheetMetaText}>15-20 mins study</Text>
              </View>
              <View style={styles.sheetMeta}>
                <Ionicons name="film-outline" size={16} color={COLORS.textLight} />
                <Text style={styles.sheetMetaText}>Interactive video</Text>
              </View>
            </View>

            <Text style={styles.sheetDesc}>
              This lesson provides a comprehensive review of the topic. You will complete active learning exercises, study resource cheat sheets, and review instructor explanations.
            </Text>

            <TouchableOpacity
              style={styles.sheetStartBtn}
              onPress={() => {
                refRBSheet.current?.close();
                if (course.isEnrolled) {
                  navigation.navigate('CourseContent', { course });
                } else {
                  navigation.navigate('CourseEnrollment', { course });
                }
              }}
            >
              <Text style={styles.sheetStartBtnText}>
                {course.isEnrolled ? 'Start Lesson' : 'Enroll to Start'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>
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
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  courseDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 16,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaBox: {
    alignItems: 'center',
    flex: 1,
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
    fontFamily: FONTS.bold,
  },
  metaLbl: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sectionTitle: {
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
  syllabusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  chapterBlock: {
    marginBottom: 16,
  },
  chapterTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
    fontFamily: FONTS.bold,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 4,
  },
  lessonText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  ctaButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  sheetContent: {
    flex: 1,
  },
  sheetChapter: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 6,
    fontFamily: FONTS.bold,
  },
  sheetMetaRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 14,
  },
  sheetMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sheetMetaText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '500',
  },
  sheetDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    marginBottom: 20,
  },
  sheetStartBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  sheetStartBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
