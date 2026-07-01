import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Survey {
  id: string;
  title: string;
  module: string;
  status: 'Pending' | 'Completed';
  questions: string[];
}

interface CompletedFeedback {
  id: string;
  title: string;
  date: string;
  avgRating: number;
}

const ratingEmojis = [
  { value: 1, char: '😠', label: 'Poor', activeBg: '#FEE2E2', activeColor: '#EF4444' },
  { value: 2, char: '🙁', label: 'Fair', activeBg: '#FFEDD5', activeColor: '#F97316' },
  { value: 3, char: '😐', label: 'Neutral', activeBg: '#FEF9C3', activeColor: '#CA8A04' },
  { value: 4, char: '🙂', label: 'Good', activeBg: '#ECFDF5', activeColor: '#059669' },
  { value: 5, char: '😄', label: 'Excellent', activeBg: '#EEF2FF', activeColor: '#4F46E5' },
];

export default function FeedbackSurveyScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  
  // Survey response state
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [writtenFeedback, setWrittenFeedback] = useState('');

  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 's1',
      title: 'Dementia Care Course Satisfaction Survey',
      module: 'Dementia Care Advanced',
      status: 'Pending',
      questions: [
        'How clear was the instructor\'s delivery?',
        'Was the course material relevant to your daily duties?',
        'How would you rate the interactive case studies?',
      ],
    },
    {
      id: 's2',
      title: 'Practical Transfer Checklist Usability Survey',
      module: 'Mobility Assistance',
      status: 'Pending',
      questions: [
        'Was the slide board video guide easy to follow?',
        'Are the checklist steps comprehensive?',
        'How confident do you feel doing this manual transfer now?',
      ],
    },
  ]);

  const [completedList, setCompletedList] = useState<CompletedFeedback[]>([
    {
      id: 'c1',
      title: 'Elderly Care App Onboarding Survey',
      date: 'June 20, 2026',
      avgRating: 4.7,
    },
  ]);

  const handleSelectSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    const initialRatings: { [key: number]: number } = {};
    survey.questions.forEach((_, index) => {
      initialRatings[index] = 0;
    });
    setRatings(initialRatings);
    setWrittenFeedback('');
  };

  const handleRate = (questionIndex: number, emojiValue: number) => {
    setRatings(prev => ({
      ...prev,
      [questionIndex]: emojiValue,
    }));
  };

  const handleSubmitSurvey = () => {
    if (!selectedSurvey) return;

    const unrated = selectedSurvey.questions.some((_, index) => !ratings[index]);
    if (unrated) {
      Alert.alert('Incomplete Survey', 'Please select an emoji rating for all questions.');
      return;
    }

    const total = Object.values(ratings).reduce((acc, val) => acc + val, 0);
    const avg = parseFloat((total / selectedSurvey.questions.length).toFixed(1));

    setSurveys(prev => prev.filter(s => s.id !== selectedSurvey.id));

    const newCompleted: CompletedFeedback = {
      id: selectedSurvey.id,
      title: selectedSurvey.title,
      date: 'Today',
      avgRating: avg,
    };
    setCompletedList([newCompleted, ...completedList]);

    Alert.alert(
      'Feedback Submitted',
      'Thank you! Your feedback has been registered and sent to the training quality team.'
    );
    setSelectedSurvey(null);
  };

  const questionsRatedCount = Object.values(ratings).filter(r => r > 0).length;
  const surveyProgress = selectedSurvey ? (questionsRatedCount / selectedSurvey.questions.length) : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback & Surveys</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Modernized Banner */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerIconContainer}>
            <Ionicons name="chatbubbles" size={32} color={COLORS.white} />
          </View>
          <Text style={styles.bannerTitle}>Help Us Improve</Text>
          <Text style={styles.bannerDesc}>Your voice shapes course lectures, simulators, and mobile features. Let us know how we can serve you better.</Text>
        </LinearGradient>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('pending')}
            style={[styles.tabBtn, activeTab === 'pending' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>Pending Surveys</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('completed')}
            style={[styles.tabBtn, activeTab === 'completed' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>Completed History</Text>
          </TouchableOpacity>
        </View>

        {/* List Content */}
        <View style={styles.listContainer}>
          {activeTab === 'pending' ? (
            surveys.length === 0 ? (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconBg}>
                  <Ionicons name="checkmark" size={36} color={COLORS.success} />
                </View>
                <Text style={styles.emptyText}>All caught up! No pending surveys.</Text>
              </View>
            ) : (
              surveys.map(survey => (
                <TouchableOpacity 
                  key={survey.id} 
                  style={styles.card}
                  onPress={() => handleSelectSurvey(survey)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.moduleText}>{survey.module}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>REQUIRED</Text>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>{survey.title}</Text>
                  
                  <View style={styles.cardDivider} />
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.footerQRow}>
                      <Ionicons name="help-circle-outline" size={16} color={COLORS.textLight} style={{ marginRight: 4 }} />
                      <Text style={styles.footerInfo}>3 Rating Questions</Text>
                    </View>
                    <View style={styles.actionBtn}>
                      <Text style={styles.actionBtnText}>Start Feedback</Text>
                      <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          ) : (
            completedList.map(item => (
              <View key={item.id} style={styles.completedCard}>
                <View style={styles.completedHeader}>
                  <Text style={styles.completedTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.completedDate}>{item.date}</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>Avg Score Submitted:</Text>
                  <View style={[styles.scoreBadge, { backgroundColor: item.avgRating >= 4 ? '#ECFDF5' : '#FEF9C3' }]}>
                    <Ionicons 
                      name="star" 
                      size={12} 
                      color={item.avgRating >= 4 ? '#059669' : '#CA8A04'} 
                      style={{ marginRight: 4 }} 
                    />
                    <Text style={[styles.scoreText, { color: item.avgRating >= 4 ? '#059669' : '#CA8A04' }]}>
                      {item.avgRating} / 5
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Survey Modal with Emoji Rating Scale & Progress Tracking */}
      <Modal visible={selectedSurvey !== null} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          {selectedSurvey && (
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTitleBlock}>
                  <Text style={styles.modalTitle}>Survey Evaluation</Text>
                  <Text style={styles.modalSubTitle}>{selectedSurvey.module}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedSurvey(null)} style={styles.closeModalBtn}>
                  <Ionicons name="close" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              {/* Progress Tracker */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTextRow}>
                  <Text style={styles.progressLabel}>COMPLETION PROGRESS</Text>
                  <Text style={styles.progressPercentage}>{Math.round(surveyProgress * 100)}%</Text>
                </View>
                <View style={styles.progressBgBar}>
                  <View style={[styles.progressFillBar, { width: `${surveyProgress * 100}%` }]} />
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
                <Text style={styles.modalSurveyTitle}>{selectedSurvey.title}</Text>

                {selectedSurvey.questions.map((question, index) => {
                  const currentRating = ratings[index] || 0;
                  return (
                    <View key={index} style={styles.questionBlock}>
                      <Text style={styles.questionText}>
                        {index + 1}. {question}
                      </Text>
                      <View style={styles.emojisRow}>
                        {ratingEmojis.map((emoji) => {
                          const isActive = currentRating === emoji.value;
                          return (
                            <TouchableOpacity 
                              key={emoji.value} 
                              onPress={() => handleRate(index, emoji.value)}
                              style={[
                                styles.emojiBtn,
                                isActive && {
                                  backgroundColor: emoji.activeBg,
                                  borderColor: emoji.activeColor,
                                  transform: [{ scale: 1.1 }],
                                }
                              ]}
                            >
                              <Text style={styles.emojiChar}>{emoji.char}</Text>
                              <Text style={[
                                styles.emojiLabel, 
                                isActive && { color: emoji.activeColor, fontWeight: '800' }
                              ]}>
                                {emoji.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}

                <Text style={styles.label}>Suggestions / Written Remarks</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tell us what you liked or how we can improve..."
                  multiline
                  value={writtenFeedback}
                  onChangeText={setWrittenFeedback}
                />
              </ScrollView>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitSurvey}>
                <Text style={styles.submitBtnText}>Submit Evaluation Response</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  banner: {
    margin: 16,
    borderRadius: 24,
    padding: 24,
    ...SHADOWS.medium,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  bannerDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.textDark,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderLeftWidth: 6,
    borderLeftColor: '#4F46E5', // Left-hand accent bar
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moduleText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: 'rgba(79, 70, 229, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#4F46E5',
    fontSize: 9,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerQRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerInfo: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },
  completedCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completedTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginRight: 12,
  },
  completedDate: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '92%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderTitleBlock: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  modalSubTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  closeModalBtn: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: 0.5,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4F46E5',
  },
  progressBgBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressFillBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalSurveyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 24,
  },
  questionBlock: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  emojisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    marginHorizontal: 3,
  },
  emojiChar: {
    fontSize: 22,
    marginBottom: 4,
  },
  emojiLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    height: 100,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: '#F8FAFC',
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#4F46E5',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...SHADOWS.medium,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
