import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DetailedLesson, USER_NOTES, addNote, updateLessonStatus } from './mockData';

export default function LessonContentScreen({ route, navigation }: any) {
  const { lesson, course }: { lesson: DetailedLesson; course: any } = route.params;

  // Local state tracking completion of activities
  const [videoFinished, setVideoFinished] = useState(false);
  const [docFinished, setDocFinished] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Notes state
  const [notes, setNotes] = useState(USER_NOTES.filter(n => n.lessonId === lesson.id));
  const [noteInput, setNoteInput] = useState('');

  // Initial state setup based on lesson completion
  useEffect(() => {
    if (lesson.status === 'Completed') {
      setVideoFinished(true);
      setDocFinished(true);
      setQuizFinished(true);
    } else if (lesson.status === 'In Progress') {
      // For testing, let's unlock some states
      setVideoFinished(lesson.type !== 'video');
      setDocFinished(lesson.type !== 'document');
      setQuizFinished(lesson.type !== 'interactive');
    }
  }, [lesson]);

  // Keep notes synchronized
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNotes(USER_NOTES.filter(n => n.lessonId === lesson.id));
    });
    return unsubscribe;
  }, [navigation, lesson.id]);

  // Determine if primary activity is completed
  const isPrimaryCompleted = () => {
    if (lesson.type === 'video') return videoFinished;
    if (lesson.type === 'document') return docFinished;
    if (lesson.type === 'interactive') return quizFinished;
    return false;
  };

  const completedSteps = (videoFinished ? 1 : 0) + (docFinished ? 1 : 0) + (quizFinished ? 1 : 0);
  const progressPercent = (completedSteps / 3) * 100;

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    const newNote = addNote(lesson.id, 'Workspace', noteInput.trim());
    setNotes([newNote, ...notes]);
    setNoteInput('');
    Alert.alert('Note Saved', 'Your study note has been successfully saved to this lesson.');
  };

  const handleDeleteNote = (noteId: string) => {
    // Delete note from mock DB
    const index = USER_NOTES.findIndex(n => n.id === noteId);
    if (index > -1) {
      USER_NOTES.splice(index, 1);
    }
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const handleFinishLesson = () => {
    updateLessonStatus(lesson.id, 'Completed');
    navigation.navigate('LessonCompletion', { lesson, course, xpEarned: lesson.points });
  };

  // Activity launch handlers
  const startVideo = () => {
    navigation.navigate('VideoLesson', {
      lesson,
      course,
      onComplete: () => setVideoFinished(true)
    });
  };

  const startDocument = () => {
    navigation.navigate('DocumentLesson', {
      lesson,
      course,
      onComplete: () => setDocFinished(true)
    });
  };

  const startInteractive = () => {
    navigation.navigate('InteractiveLesson', {
      lesson,
      course,
      onComplete: () => setQuizFinished(true)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lesson.title}</Text>
          <Text style={styles.headerSubtitle}>Study Workspace</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Workspace Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introHeading}>Learning Steps</Text>
          <Text style={styles.introSub}>
            Complete the primary activity ({lesson.type.toUpperCase()}) to unlock completion. Complete other activities for bonus credit.
          </Text>

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Workspace Steps Completed</Text>
              <Text style={styles.progressVal}>{completedSteps} / 3</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        </View>

        {/* Steps List */}
        <Text style={styles.sectionTitle}>Lesson Components</Text>

        {/* Step 1: Video */}
        <TouchableOpacity 
          style={[styles.stepCard, videoFinished && styles.stepCardDone]} 
          onPress={startVideo}
        >
          <View style={[styles.stepIconBg, { backgroundColor: COLORS.infoLight }]}>
            <Ionicons name="play-circle" size={24} color={COLORS.secondary} />
          </View>
          <View style={styles.stepInfo}>
            <Text style={styles.stepTitle}>Part 1: Video Tutorial</Text>
            <Text style={styles.stepDesc}>Watch interactive video lecture with bookmarks</Text>
          </View>
          <View style={styles.stepStatus}>
            {videoFinished ? (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            ) : (
              <Ionicons name="arrow-forward-circle" size={24} color={COLORS.secondary} />
            )}
            {lesson.type === 'video' && <Text style={styles.requiredBadge}>REQUIRED</Text>}
          </View>
        </TouchableOpacity>

        {/* Step 2: Document */}
        <TouchableOpacity 
          style={[styles.stepCard, docFinished && styles.stepCardDone]} 
          onPress={startDocument}
        >
          <View style={[styles.stepIconBg, { backgroundColor: COLORS.accentLight }]}>
            <Ionicons name="document-text" size={24} color={COLORS.accent} />
          </View>
          <View style={styles.stepInfo}>
            <Text style={styles.stepTitle}>Part 2: Reference Manual</Text>
            <Text style={styles.stepDesc}>Read guidelines, search key concepts, customize views</Text>
          </View>
          <View style={styles.stepStatus}>
            {docFinished ? (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            ) : (
              <Ionicons name="arrow-forward-circle" size={24} color={COLORS.secondary} />
            )}
            {lesson.type === 'document' && <Text style={styles.requiredBadge}>REQUIRED</Text>}
          </View>
        </TouchableOpacity>

        {/* Step 3: Interactive */}
        <TouchableOpacity 
          style={[styles.stepCard, quizFinished && styles.stepCardDone]} 
          onPress={startInteractive}
        >
          <View style={[styles.stepIconBg, { backgroundColor: COLORS.successLight }]}>
            <Ionicons name="game-controller" size={24} color={COLORS.success} />
          </View>
          <View style={styles.stepInfo}>
            <Text style={styles.stepTitle}>Part 3: Quiz & Flashcards</Text>
            <Text style={styles.stepDesc}>Test your knowledge with cards and mini-quizzes</Text>
          </View>
          <View style={styles.stepStatus}>
            {quizFinished ? (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            ) : (
              <Ionicons name="arrow-forward-circle" size={24} color={COLORS.secondary} />
            )}
            {lesson.type === 'interactive' && <Text style={styles.requiredBadge}>REQUIRED</Text>}
          </View>
        </TouchableOpacity>

        {/* Notes Pad Section */}
        <View style={styles.notesContainer}>
          <Text style={styles.sectionTitle}>My Study Notes ({notes.length})</Text>
          
          <View style={styles.noteInputRow}>
            <TextInput
              style={styles.noteInput}
              placeholder="Jot down a quick note..."
              placeholderTextColor={COLORS.textLight}
              value={noteInput}
              onChangeText={setNoteInput}
              multiline
            />
            <TouchableOpacity style={styles.noteAddBtn} onPress={handleAddNote}>
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {notes.length === 0 ? (
            <View style={styles.emptyNotesCard}>
              <Ionicons name="create-outline" size={32} color={COLORS.border} />
              <Text style={styles.emptyNotesText}>No notes taken yet.</Text>
              <Text style={styles.emptyNotesSub}>Type in the box above or take notes while watching the video.</Text>
            </View>
          ) : (
            notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <View style={styles.noteHeader}>
                  <View style={styles.noteStamp}>
                    <Ionicons name="bookmark" size={12} color={COLORS.secondary} />
                    <Text style={styles.noteStampText}>{note.timestamp}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <Ionicons name="trash-outline" size={14} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.noteText}>{note.text}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Complete Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.finishBtn, !isPrimaryCompleted() && styles.finishBtnDisabled]}
          onPress={handleFinishLesson}
          disabled={!isPrimaryCompleted()}
        >
          <Text style={styles.finishBtnText}>
            {isPrimaryCompleted() ? 'Complete Lesson & Claim Reward' : `Complete Required step to Finish`}
          </Text>
          <Ionicons 
            name={isPrimaryCompleted() ? "checkmark-done" : "lock-closed"} 
            size={18} 
            color={COLORS.white} 
            style={{ marginLeft: 8 }} 
          />
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  introHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  introSub: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  progressSection: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  progressLabelRow: {
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
  progressVal: {
    fontSize: 12,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  stepCardDone: {
    borderColor: COLORS.success,
    backgroundColor: '#FAFDFB',
  },
  stepIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  stepStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  requiredBadge: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.danger,
    marginTop: 4,
    backgroundColor: COLORS.dangerLight,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  notesContainer: {
    marginTop: 20,
  },
  noteInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  noteInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.textDark,
    marginRight: 10,
    height: 44,
  },
  noteAddBtn: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  emptyNotesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  emptyNotesText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 8,
  },
  emptyNotesSub: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },
  noteCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  noteStamp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteStampText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
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
  finishBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  finishBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  finishBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
