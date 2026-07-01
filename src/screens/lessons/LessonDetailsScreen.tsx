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
import { DetailedLesson } from './mockData';

export default function LessonDetailsScreen({ route, navigation }: any) {
  const { lesson, course }: { lesson: DetailedLesson; course: any } = route.params;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return COLORS.success;
      case 'Intermediate':
        return COLORS.warning;
      case 'Advanced':
        return COLORS.danger;
      default:
        return COLORS.textLight;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'video':
        return 'videocam-outline';
      case 'document':
        return 'document-text-outline';
      case 'interactive':
        return 'game-controller-outline';
      default:
        return 'school-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Lesson Overview</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Course Association */}
        <Text style={styles.courseTag}>{course.title.toUpperCase()}</Text>

        {/* Title & Description */}
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonDesc}>{lesson.description}</Text>

        {/* Metadata Grid */}
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.infoLight }]}>
              <Ionicons name={getIconForType(lesson.type) as any} size={20} color={COLORS.secondary} />
            </View>
            <Text style={styles.metaVal}>{lesson.type.toUpperCase()}</Text>
            <Text style={styles.metaLabel}>Format</Text>
          </View>

          <View style={styles.metaItem}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.accentLight }]}>
              <Ionicons name="hourglass-outline" size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.metaVal}>{lesson.estimatedTime}</Text>
            <Text style={styles.metaLabel}>Study Time</Text>
          </View>

          <View style={styles.metaItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E6FFFA' }]}>
              <Ionicons name="speedometer-outline" size={20} color={getDifficultyColor(lesson.difficulty)} />
            </View>
            <Text style={[styles.metaVal, { color: getDifficultyColor(lesson.difficulty) }]}>
              {lesson.difficulty}
            </Text>
            <Text style={styles.metaLabel}>Difficulty</Text>
          </View>

          <View style={styles.metaItem}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.warningLight }]}>
              <Ionicons name="trophy-outline" size={20} color={COLORS.succeed} />
            </View>
            <Text style={styles.metaVal}>+{lesson.points} XP</Text>
            <Text style={styles.metaLabel}>Completion Award</Text>
          </View>
        </View>

        {/* Current status display */}
        <View style={styles.statusBox}>
          <View style={styles.statusRow}>
            <Ionicons 
              name={lesson.status === 'Completed' ? 'checkmark-circle' : 'time-outline'} 
              size={18} 
              color={lesson.status === 'Completed' ? COLORS.success : COLORS.textLight} 
            />
            <Text style={[styles.statusText, { color: lesson.status === 'Completed' ? COLORS.success : COLORS.textDark }]}>
              Current Status: <Text style={{ fontWeight: '800' }}>{lesson.status}</Text>
            </Text>
          </View>
        </View>

        {/* Objectives */}
        <Text style={styles.sectionTitle}>Learning Objectives</Text>
        <View style={styles.card}>
          {lesson.objectives.map((obj, index) => (
            <View key={index} style={styles.objectiveRow}>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.objectiveText}>{obj}</Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <Text style={styles.sectionTitle}>Prerequisites & Instructions</Text>
        <View style={styles.card}>
          {lesson.requirements.map((req, index) => (
            <View key={index} style={styles.reqRow}>
              <Ionicons name="information-circle-outline" size={16} color={COLORS.secondary} style={{ marginRight: 10 }} />
              <Text style={styles.reqText}>{req}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionBtn, lesson.status === 'Completed' && styles.actionBtnReview]}
          onPress={() => navigation.navigate('LessonContent', { lesson, course })}
        >
          <Text style={styles.actionBtnText}>
            {lesson.status === 'Completed' ? 'Review Lesson Workspace' : 'Launch Lesson Workspace'}
          </Text>
          <Ionicons name="rocket-outline" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  courseTag: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    lineHeight: 26,
  },
  lessonDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 20,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaVal: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  metaLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
  },
  statusBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  bulletText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
  },
  objectiveText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
    fontWeight: '500',
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reqText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  actionBtnReview: {
    backgroundColor: COLORS.success,
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
