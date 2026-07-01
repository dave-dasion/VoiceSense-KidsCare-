import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Course } from './CourseCatalogScreen';
import { MOCK_LESSONS } from '../lessons/mockData';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
  isCompleted: boolean;
}

const MOCK_COURSE_LESSONS: Record<string, Lesson[]> = {
  mc1: [
    { id: 'l1', title: '1. Introduction to Flexbox Layouts', duration: '12 min', content: 'Flexbox is a layout module designed to make responsive structure configurations simple. Use justifyContent to manage main axis layouts, and alignItems to align items on the cross-axis.', isCompleted: true },
    { id: 'l2', title: '2. Flex Direction & Wrap Modes', duration: '18 min', content: 'Setting flexDirection changes the main axis from row to column. flexWrap controls whether items wrap into multiple rows or squeeze inside one viewport.', isCompleted: false },
    { id: 'l3', title: '3. Margin Auto & AlignSelf', duration: '15 min', content: 'AlignSelf allows individual item overrides on cross-axis alignments. Using margin: auto splits leftover spacers equally.', isCompleted: false },
  ],
  mc2: [
    { id: 'l4', title: '1. Redux Store Architectures', duration: '20 min', content: 'The store holds the central app database. Actions dispatch instructions, and pure Redux Reducers calculate new state layers.', isCompleted: true },
    { id: 'l5', title: '2. Saga Generator Functions', duration: '25 min', content: 'Sagas handle side effects using ES6 generators. yield call invokes API calls, and yield put dispatches actions.', isCompleted: false },
  ],
  mc3: [
    { id: 'l6', title: '1. iOS Swift Bridge Setup', duration: '22 min', content: 'Register your Swift class as an RCTBridgeModule. Use RCT_EXPORT_METHOD to expose Objective-C signatures.', isCompleted: false },
  ],
  mc4: [
    { id: 'l7', title: '1. Prompt Engineering 101', duration: '14 min', content: 'Prompts direct LLM behavior. Zero-shot prompts query directly, while few-shot prompts offer example sequences.', isCompleted: false },
  ],
};

const MOCK_RESOURCES = [
  { id: 'r1', name: 'Layouts_Flexbox_CheatSheet.pdf', size: '1.8 MB' },
  { id: 'r2', name: 'Saga_State_Template.zip', size: '4.2 MB' },
  { id: 'r3', name: 'RAG_Pipeline_Guide.md', size: '42 KB' },
];

interface Discussion {
  id: string;
  user: string;
  avatarColor: string;
  question: string;
  date: string;
  replies: number;
}

const INITIAL_DISCUSSIONS: Discussion[] = [
  { id: 'd1', user: 'EW', avatarColor: '#319795', question: 'How can I fix flexDirection row items from clipping off-screen on Android?', date: '1d ago', replies: 3 },
  { id: 'd2', user: 'JD', avatarColor: '#805AD5', question: 'Is it better to use Redux toolkit or custom saga middleware for simple API integrations?', date: '2d ago', replies: 1 },
];

export default function CourseContentScreen({ route, navigation }: any) {
  const { course }: { course: Course } = route.params;

  const [activeTab, setActiveTab] = useState<'Lessons' | 'Resources' | 'Discussions'>('Lessons');
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_COURSE_LESSONS[course.id] || []);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    MOCK_COURSE_LESSONS[course.id]?.[0] || null
  );

  // Discussion forum state
  const [discussions, setDiscussions] = useState<Discussion[]>(INITIAL_DISCUSSIONS);
  const [newQuestion, setNewQuestion] = useState('');

  const handleToggleComplete = (lessonId: string) => {
    const updated = lessons.map((les) =>
      les.id === lessonId ? { ...les, isCompleted: !les.isCompleted } : les
    );
    setLessons(updated);
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, isCompleted: !selectedLesson.isCompleted });
    }
  };

  const handlePostQuestion = () => {
    if (!newQuestion.trim()) return;

    const newObj: Discussion = {
      id: `d-${Date.now()}`,
      user: 'ME',
      avatarColor: COLORS.secondary,
      question: newQuestion.trim(),
      date: 'Just now',
      replies: 0,
    };

    setDiscussions([newObj, ...discussions]);
    setNewQuestion('');
    Alert.alert('Question Posted!', 'Your inquiry has been shared with the class forum.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Tabs Menu */}
      <View style={styles.tabsMenu}>
        {(['Lessons', 'Resources', 'Discussions'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.menuTabBtn, activeTab === tab && styles.menuTabBtnActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.menuTabText, activeTab === tab && styles.menuTabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content Area */}
      {activeTab === 'Lessons' && (
        <View style={{ flex: 1 }}>
          {/* Mock Video Player container */}
          {selectedLesson && (
            <View style={styles.playerCard}>
              <View style={styles.videoPlayer}>
                <Ionicons name="play" size={48} color={COLORS.white} />
                <Text style={styles.playerStatusText}>Video Player Simulator</Text>
                <Text style={styles.playerDuration}>{selectedLesson.duration}</Text>
              </View>
              
              <View style={styles.playerDetails}>
                <Text style={styles.playerTitle}>{selectedLesson.title}</Text>
                
                <TouchableOpacity
                  style={[
                    styles.completeBtn,
                    selectedLesson.isCompleted && styles.completeBtnDone
                  ]}
                  onPress={() => handleToggleComplete(selectedLesson.id)}
                >
                  <Ionicons
                    name={selectedLesson.isCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
                    size={16}
                    color={COLORS.white}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.completeBtnText}>
                    {selectedLesson.isCompleted ? 'Marked Completed' : 'Mark Lesson Completed'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Collapsible Syllabus List */}
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lessonsList}
            renderItem={({ item }) => {
              const isSelected = selectedLesson?.id === item.id;
              return (
                <TouchableOpacity
                  style={[styles.lessonRow, isSelected && styles.lessonRowSelected]}
                  onPress={() => {
                    const detailedLesson = MOCK_LESSONS.find((l) => l.id === item.id);
                    if (detailedLesson) {
                      navigation.navigate('LessonDetails', { lesson: detailedLesson, course });
                    } else {
                      setSelectedLesson(item);
                    }
                  }}
                >
                  <View style={styles.statusCol}>
                    {item.isCompleted ? (
                      <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                    ) : (
                      <Ionicons name="play-circle-outline" size={20} color={COLORS.textLight} />
                    )}
                  </View>
                  
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.lessonTitle, isSelected && styles.lessonTitleSelected]}>
                      {item.title}
                    </Text>
                    <Text style={styles.lessonDuration}>{item.duration}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={16} color={COLORS.border} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {activeTab === 'Resources' && (
        <ScrollView contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.tabTitle}>Lecture Handouts & Worksheets</Text>
          <Text style={styles.tabDesc}>
            Download additional templates and reference PDF guides compiled by your course instructors.
          </Text>

          {MOCK_RESOURCES.map((res) => (
            <View key={res.id} style={styles.resourceRow}>
              <Ionicons name="document-text-outline" size={24} color={COLORS.secondary} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.resourceName}>{res.name}</Text>
                <Text style={styles.resourceSize}>{res.size}</Text>
              </View>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => Alert.alert('Downloading File', `Downloading ${res.name} ...`)}
              >
                <Ionicons name="download-outline" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'Discussions' && (
        <View style={{ flex: 1 }}>
          {/* Discussion Input Banner */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.questionInput}
              placeholder="Ask a question about this course..."
              placeholderTextColor={COLORS.textLight}
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
            />
            <TouchableOpacity
              style={[styles.postBtn, !newQuestion.trim() && styles.postBtnDisabled]}
              onPress={handlePostQuestion}
              disabled={!newQuestion.trim()}
            >
              <Ionicons name="send" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Forums List */}
          <FlatList
            data={discussions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.forumList}
            renderItem={({ item }) => (
              <View style={styles.forumCard}>
                <View style={styles.forumHeader}>
                  <View style={[styles.forumAvatar, { backgroundColor: item.avatarColor }]}>
                    <Text style={styles.forumAvatarText}>{item.user}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.forumUser}>Anonymous {item.user === 'ME' ? '(Me)' : 'Student'}</Text>
                    <Text style={styles.forumDate}>{item.date}</Text>
                  </View>
                </View>
                
                <Text style={styles.forumQuestion}>{item.question}</Text>
                
                <View style={styles.forumFooter}>
                  <Ionicons name="chatbubble-ellipses-outline" size={14} color={COLORS.textLight} />
                  <Text style={styles.repliesText}>{item.replies} replies</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
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
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    flex: 1,
    textAlign: 'center',
  },
  tabsMenu: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  menuTabBtnActive: {
    borderBottomColor: COLORS.secondary,
  },
  menuTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  menuTabTextActive: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  playerCard: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.light,
  },
  videoPlayer: {
    height: 180,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerStatusText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  playerDuration: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    marginTop: 2,
  },
  playerDetails: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    flex: 1,
    marginRight: 12,
  },
  completeBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeBtnDone: {
    backgroundColor: COLORS.success,
  },
  completeBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  lessonsList: {
    padding: 16,
  },
  lessonRow: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lessonRowSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.infoLight,
  },
  statusCol: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  lessonTitleSelected: {
    fontWeight: '800',
    color: COLORS.secondary,
  },
  lessonDuration: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  tabContent: {
    padding: 16,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  tabDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 16,
    marginBottom: 20,
  },
  resourceRow: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resourceName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  resourceSize: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  downloadBtn: {
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  questionInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.textDark,
    marginRight: 10,
  },
  postBtn: {
    backgroundColor: COLORS.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  forumList: {
    padding: 16,
  },
  forumCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  forumAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forumAvatarText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  forumUser: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  forumDate: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  forumQuestion: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  forumFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  repliesText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 6,
    fontWeight: '600',
  },
});
