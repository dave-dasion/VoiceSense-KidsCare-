import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_LESSONS as DETAILED_MOCK_LESSONS } from '../lessons/mockData';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isActive: boolean;
}

const MOCK_LESSONS: Lesson[] = [
  { id: 'l1', title: '1. Introduction to React Native Layouts', duration: '5 mins', isCompleted: true, isActive: false },
  { id: 'l2', title: '2. Flexbox Basics: AlignItems vs JustifyContent', duration: '8 mins', isCompleted: true, isActive: false },
  { id: 'l3', title: '3. FlexWrap and FlexGrow properties', duration: '12 mins', isCompleted: true, isActive: false },
  { id: 'l4', title: '4. Building Responsive Flex Grid Layouts', duration: '20 mins', isCompleted: false, isActive: true },
  { id: 'l5', title: '5. ScrollView vs FlatList Performance', duration: '15 mins', isCompleted: false, isActive: false },
  { id: 'l6', title: '6. SectionList and Dynamic Grid Lists', duration: '18 mins', isCompleted: false, isActive: false },
];

export default function ContinueLearningScreen({ navigation }: any) {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const activeLesson = lessons.find((l) => l.isActive) || lessons[3];

  const handleMarkComplete = () => {
    Alert.alert('Congratulations!', 'You completed: ' + activeLesson.title, [
      {
        text: 'Continue',
        onPress: () => {
          setLessons((prev) => {
            const currentIndex = prev.findIndex((l) => l.isActive);
            if (currentIndex === -1 || currentIndex === prev.length - 1) return prev;
            return prev.map((l, index) => {
              if (index === currentIndex) return { ...l, isCompleted: true, isActive: false };
              if (index === currentIndex + 1) return { ...l, isActive: true };
              return l;
            });
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Lesson</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Lesson Video Placeholder */}
        <View style={styles.videoPlayerPlaceholder}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              const detailedLesson = DETAILED_MOCK_LESSONS.find(l => l.id === activeLesson.id);
              if (detailedLesson) {
                navigation.navigate('LessonDetails', {
                  lesson: detailedLesson,
                  course: { id: 'mc1', title: 'React Native Layouts & Flexbox', category: 'Frontend', instructor: 'Emily Watson' }
                });
              }
            }}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.videoGradient}
            >
              <Ionicons name="play-circle-outline" size={64} color={COLORS.white} />
              <Text style={styles.videoLabel}>Interactive Lesson Player</Text>
              <Text style={styles.videoSubText}>Tap to stream course demonstration</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Lesson Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.courseCategory}>React Native Layouts & Flexbox</Text>
          <Text style={styles.lessonTitle}>{activeLesson.title}</Text>
          
          <View style={styles.durationRow}>
            <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.durationText}>Estimated Study Time: {activeLesson.duration}</Text>
          </View>

          <Text style={styles.lessonDescription}>
            In this lesson, we will explore the practical implementation of responsive grid systems. You will learn to nest Flexboxes and leverage the `flexWrap` property to build layout adapters that look perfect on both tablets and small devices.
          </Text>

          <TouchableOpacity style={styles.completeButton} onPress={handleMarkComplete}>
            <LinearGradient
              colors={[COLORS.success, '#2F855A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.completeGradient}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.white} style={{ marginRight: 6 }} />
              <Text style={styles.completeButtonText}>Mark Lesson Completed</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Lesson Schedule/Sequence */}
        <Text style={styles.sectionHeader}>Course Syllabus Sequence</Text>
        <View style={styles.sequenceContainer}>
          {lessons.map((item) => (
            <View key={item.id} style={styles.lessonRow}>
              <View style={styles.bulletColumn}>
                <View style={[
                  styles.bulletOuter,
                  item.isActive && styles.bulletActiveOuter,
                  item.isCompleted && styles.bulletCompletedOuter
                ]}>
                  <View style={[
                    styles.bulletInner,
                    item.isActive && styles.bulletActiveInner,
                    item.isCompleted && styles.bulletCompletedInner
                  ]} />
                </View>
                {/* Connecting line */}
                {item.id !== 'l6' && <View style={styles.bulletConnector} />}
              </View>

              <TouchableOpacity 
                style={[
                  styles.lessonInfoCard,
                  item.isActive && styles.lessonInfoCardActive
                ]}
                onPress={() => {
                  const detailedLesson = DETAILED_MOCK_LESSONS.find(l => l.id === item.id);
                  if (detailedLesson) {
                    navigation.navigate('LessonDetails', {
                      lesson: detailedLesson,
                      course: { id: 'mc1', title: 'React Native Layouts & Flexbox', category: 'Frontend', instructor: 'Emily Watson' }
                    });
                  }
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[
                    styles.lessonRowTitle,
                    item.isActive && styles.lessonRowTitleActive,
                    item.isCompleted && styles.lessonRowTitleCompleted
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.lessonRowMeta}>{item.duration}</Text>
                </View>

                {item.isCompleted && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                )}
                {item.isActive && (
                  <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>Active</Text>
                  </View>
                )}
              </TouchableOpacity>
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
    paddingBottom: 40,
  },
  videoPlayerPlaceholder: {
    height: 200,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
  },
  videoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
    fontFamily: FONTS.bold,
  },
  videoSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 6,
    fontFamily: FONTS.bold,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 6,
    fontWeight: '600',
  },
  lessonDescription: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 12,
    lineHeight: 18,
  },
  completeButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  completeGradient: {
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  sequenceContainer: {
    paddingHorizontal: 16,
  },
  lessonRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletColumn: {
    alignItems: 'center',
    marginRight: 12,
    width: 24,
  },
  bulletOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginTop: 12,
  },
  bulletActiveOuter: {
    borderColor: COLORS.secondary,
  },
  bulletCompletedOuter: {
    borderColor: COLORS.success,
  },
  bulletInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  bulletActiveInner: {
    backgroundColor: COLORS.secondary,
  },
  bulletCompletedInner: {
    backgroundColor: COLORS.success,
  },
  bulletConnector: {
    position: 'absolute',
    top: 26,
    bottom: -16,
    width: 2,
    backgroundColor: COLORS.border,
    zIndex: 1,
  },
  lessonInfoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  lessonInfoCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.infoLight,
  },
  lessonRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  lessonRowTitleActive: {
    color: COLORS.secondary,
  },
  lessonRowTitleCompleted: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  lessonRowMeta: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  activeTag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeTagText: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: '700',
  },
});
