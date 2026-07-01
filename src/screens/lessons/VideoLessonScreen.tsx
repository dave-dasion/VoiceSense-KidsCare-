import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { addNote, DetailedLesson } from './mockData';

export default function VideoLessonScreen({ route, navigation }: any) {
  const { lesson, onComplete } = route.params;
  const videoDetails = lesson.components;

  const chapters = videoDetails?.chapters || [
    { time: '00:00', title: 'Start' },
    { time: '05:00', title: 'Middle' },
    { time: '10:00', title: 'Conclusion' }
  ];

  // Convert string MM:SS to seconds
  const parseTimeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10);
  };

  const formatSecondsToTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = Math.floor(totalSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDurationSeconds = parseTimeToSeconds(videoDetails?.duration || '12:00');

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(false);

  // Notes state
  const [noteText, setNoteText] = useState('');
  const [sessionNotes, setSessionNotes] = useState<any[]>([]);

  const timerRef = useRef<any>(null);

  // Playback timer simulator
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextVal = prev + playbackSpeed;
          if (nextVal >= totalDurationSeconds) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return totalDurationSeconds;
          }
          return nextVal;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDurationSeconds]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(prev + 10, totalDurationSeconds));
  };

  const skipBackward = () => {
    setCurrentTime((prev) => Math.max(prev - 10, 0));
  };

  const jumpToChapter = (timeStr: string) => {
    const sec = parseTimeToSeconds(timeStr);
    setCurrentTime(sec);
    Alert.alert('Timeline Jumped', `Navigated player to ${timeStr}`);
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    const stamp = formatSecondsToTime(currentTime);
    const newNote = addNote(lesson.id, stamp, noteText.trim());
    setSessionNotes([newNote, ...sessionNotes]);
    setNoteText('');
    Alert.alert('Note Captured', `Your note has been bound to video timestamp [${stamp}].`);
  };

  const handleFinishVideo = () => {
    setIsPlaying(false);
    if (onComplete) onComplete();
    Alert.alert('Video Lecture Completed!', 'You have completed the video portion. Keep it up!', [
      { text: 'Back to Workspace', onPress: () => navigation.goBack() }
    ]);
  };

  const progressPct = (currentTime / totalDurationSeconds) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Video Player</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Simulated Video Screen */}
        <View style={styles.videoPlayerContainer}>
          <View style={styles.videoWindow}>
            <Ionicons name="film" size={60} color="rgba(255,255,255,0.25)" />
            <Text style={styles.simText}>ElderlyCare Video Player Simulator</Text>
            
            {/* Speed overlay */}
            <View style={styles.speedOverlay}>
              <Text style={styles.speedText}>{playbackSpeed}x</Text>
            </View>

            {/* Central large play button when paused */}
            {!isPlaying && (
              <TouchableOpacity style={styles.centerPlayBtn} onPress={togglePlay}>
                <Ionicons name="play" size={32} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>

          {/* Scrub bar */}
          <View style={styles.timelineContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatSecondsToTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatSecondsToTime(totalDurationSeconds)}</Text>
            </View>
          </View>

          {/* Playback Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity onPress={cycleSpeed} style={styles.controlBtn}>
              <Text style={styles.controlBtnText}>{playbackSpeed}x</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={skipBackward} style={styles.controlBtn}>
              <Ionicons name="play-back" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={togglePlay} style={styles.playPauseBtn}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={24} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipForward} style={styles.controlBtn}>
              <Ionicons name="play-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMute} style={styles.controlBtn}>
              <Ionicons name={isMuted ? "volume-mute" : "volume-medium"} size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Chapters */}
        <Text style={styles.sectionTitle}>Video Outline & Chapters</Text>
        <View style={styles.card}>
          {chapters.map((chapter: any, index: number) => {
            const chapterSeconds = parseTimeToSeconds(chapter.time);
            const isPassed = currentTime >= chapterSeconds;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.chapterRow, isPassed && styles.chapterRowPassed]}
                onPress={() => jumpToChapter(chapter.time)}
              >
                <Ionicons 
                  name={isPassed ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={isPassed ? COLORS.success : COLORS.textLight} 
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.chapterTitle, isPassed && styles.chapterTitlePassed]}>
                  {chapter.title}
                </Text>
                <Text style={styles.chapterTime}>{chapter.time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Live Note Taking */}
        <Text style={styles.sectionTitle}>Anchor Note at Timestamp</Text>
        <View style={styles.card}>
          <View style={styles.noteAnchorHeader}>
            <Ionicons name="timer-outline" size={16} color={COLORS.secondary} />
            <Text style={styles.noteAnchorText}>Bound to current play time: {formatSecondsToTime(currentTime)}</Text>
          </View>
          <TextInput
            style={styles.noteInput}
            placeholder="Type notes relative to this video moment..."
            placeholderTextColor={COLORS.textLight}
            value={noteText}
            onChangeText={setNoteText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.saveNoteBtn, !noteText.trim() && styles.saveNoteBtnDisabled]}
            onPress={handleSaveNote}
            disabled={!noteText.trim()}
          >
            <Text style={styles.saveNoteBtnText}>Save Note</Text>
            <Ionicons name="bookmark" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Session saved notes */}
        {sessionNotes.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Notes Taken This Session</Text>
            {sessionNotes.map((note) => (
              <View key={note.id} style={styles.noteRecord}>
                <Text style={styles.noteRecordTime}>Timestamp: {note.timestamp}</Text>
                <Text style={styles.noteRecordText}>{note.text}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Completion Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeBtn} onPress={handleFinishVideo}>
          <Text style={styles.completeBtnText}>Mark Video Completed</Text>
          <Ionicons name="checkmark-done-circle" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
  videoPlayerContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  videoWindow: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  simText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 10,
    fontWeight: '600',
  },
  speedOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  speedText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  centerPlayBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(43, 108, 176, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  timelineContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#1E293B',
  },
  controlBtn: {
    padding: 8,
  },
  controlBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  playPauseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
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
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  chapterRowPassed: {
    backgroundColor: '#FAFAF9',
  },
  chapterTitle: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  chapterTitlePassed: {
    color: COLORS.textLight,
  },
  chapterTime: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '700',
  },
  noteAnchorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteAnchorText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginLeft: 6,
  },
  noteInput: {
    height: 60,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 10,
  },
  saveNoteBtn: {
    height: 38,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveNoteBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  saveNoteBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  noteRecord: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noteRecordTime: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: '700',
    marginBottom: 2,
  },
  noteRecordText: {
    fontSize: 11,
    color: COLORS.textDark,
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
  completeBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  completeBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
