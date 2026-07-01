import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getInitials, getAvatarStyle } from '../../utils/avatar';

export default function DashboardScreen({ navigation }: any) {
  const { user, users, logout } = useAuth();
  const avatarStyle = getAvatarStyle(user?.name || '');
  const [chatText, setChatText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Welcome back! Ready to start learning today?' },
  ]);

  if (!user) return null;

  const handleSendChat = () => {
    if (!chatText.trim()) return;
    const msg = chatText;
    setChatHistory((prev) => [...prev, { sender: 'user', text: msg }]);
    setChatText('');

    setTimeout(() => {
      let reply = 'I am preparing your personalized AI practice question based on your profile...';
      if (msg.toLowerCase().includes('quiz')) {
        reply = 'Sure! Starting a practice quiz on React Native navigation. Question 1: How do you declare a Stack Navigator?';
      } else if (msg.toLowerCase().includes('hello') || msg.toLowerCase().includes('hi')) {
        reply = `Hello, ${user.name}! Let me know how I can coach you today.`;
      }
      setChatHistory((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.status === 'Active').length;
  const pendingUsersCount = users.filter((u) => u.status === 'Pending').length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.subGreeting}>Welcome back,</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Text style={styles.mainGreeting}>{user.name}</Text>
              <Ionicons name="sparkles" size={18} color="#D69E2E" style={{ marginLeft: 6 }} />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.profileBtn, { backgroundColor: avatarStyle.bg }]}
            onPress={() => navigation.navigate('UserProfile')}
          >
            <Text style={[styles.profileAvatarText, { color: avatarStyle.text }]}>
              {getInitials(user.name)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Banner */}
        <LinearGradient
          colors={
            user.role === 'Administrator'
              ? [COLORS.primary, COLORS.accent]
              : [COLORS.primary, COLORS.secondary]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>
            {user.role === 'Administrator' ? 'Console Control Panel' : 'AI-Powered Learning'}
          </Text>
          <Text style={styles.bannerSub}>
            {user.role === 'Administrator'
              ? 'Manage platform permissions, configurations, and user directories'
              : 'Empower your engineering skills with interactive, personalized lessons'}
          </Text>
          <View style={[styles.badge, styles.roleBadge]}>
            <Text style={styles.roleBadgeText}>{user.role}</Text>
          </View>
        </LinearGradient>

        {/* Dynamic Role-Based View */}
        {user.role === 'Administrator' ? (
          /* ADMIN DASHBOARD VIEW */
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>User Directory Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalUsersCount}</Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </View>
              <View style={[styles.statBox, { borderLeftColor: COLORS.success, borderLeftWidth: 3 }]}>
                <Text style={[styles.statNumber, { color: COLORS.success }]}>{activeUsersCount}</Text>
                <Text style={styles.statLabel}>Active Accounts</Text>
              </View>
              <View style={[styles.statBox, { borderLeftColor: COLORS.succeed, borderLeftWidth: 3 }]}>
                <Text style={[styles.statNumber, { color: COLORS.succeed }]}>{pendingUsersCount}</Text>
                <Text style={styles.statLabel}>Pending Invites</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Administrative Functions</Text>
            <View style={styles.adminMenu}>
              <TouchableOpacity
                style={styles.adminMenuItem}
                onPress={() => navigation.navigate('UserList')}
              >
                <View style={[styles.menuIconBg, { backgroundColor: '#EBF8FF' }]}>
                  <Ionicons name="people-outline" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Manage User Directory</Text>
                  <Text style={styles.menuSub}>Edit roles, block access, or delete users</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.adminMenuItem, { borderTopWidth: 1, borderTopColor: '#F1F5F9' }]}
                onPress={() => navigation.navigate('UserProfile')}
              >
                <View style={[styles.menuIconBg, { backgroundColor: '#FAF5FF' }]}>
                  <Ionicons name="person-outline" size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Personal Profile Details</Text>
                  <Text style={styles.menuSub}>Change avatar, email, or profile name</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* LEARNER / INSTRUCTOR DASHBOARD VIEW */
          <View style={styles.sectionContainer}>
            {/* Quick Stats Strip */}
            <Text style={styles.sectionTitle}>Learning Progress Overview (Tap for Center)</Text>
            <TouchableOpacity 
              style={styles.quickStatsRow}
              onPress={() => navigation.navigate('ProgressOverview')}
            >
              <View style={styles.quickStatBox}>
                <Text style={styles.quickStatValue}>15.2h</Text>
                <Text style={styles.quickStatLabel}>Study Time</Text>
              </View>
              <View style={styles.quickStatBox}>
                <Text style={styles.quickStatValue}>5 Days</Text>
                <Text style={styles.quickStatLabel}>Streak</Text>
              </View>
              <View style={styles.quickStatBox}>
                <Text style={styles.quickStatValue}>4 / 8</Text>
                <Text style={styles.quickStatLabel}>Courses Completed</Text>
              </View>
            </TouchableOpacity>

            {/* Learning Path Module Screens */}
            <Text style={styles.sectionTitle}>Learning Paths </Text>
            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.learn, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('LearningPathsList')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="git-network-outline" size={16} color={COLORS.learn} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Learning Paths</Text>
                </View>
                <Text style={styles.moduleDesc}>Explore interactive modules and curriculum guides.</Text>
                <Text style={styles.moduleMeta}>5 Courses Enrolled</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.practice, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('LearningRoadmap', {
                  path: { id: 'p1', title: 'Senior Care Professional', category: 'Clinical Care' }
                })}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="map-outline" size={16} color={COLORS.practice} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Roadmap Tracker</Text>
                </View>
                <Text style={styles.moduleDesc}>Track chronological milestones, active, and locked phases.</Text>
                <Text style={styles.moduleMeta}>Phase 2 Active</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.progress, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('LearningProgress', {
                  path: { id: 'p1', title: 'Senior Care Professional', category: 'Clinical Care' }
                })}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="checkmark-done-circle-outline" size={16} color={COLORS.progress} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Achievements</Text>
                </View>
                <Text style={styles.moduleDesc}>View earned credentials badges and skills checklists.</Text>
                <Text style={styles.moduleMeta}>4 Badges Earned</Text>
              </TouchableOpacity>
            </View>

            {/* Course Management Module Screens */}
            <Text style={styles.sectionTitle}>Course Management </Text>
            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.secondary, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('CourseCatalog')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="library-outline" size={16} color={COLORS.secondary} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Course Catalog</Text>
                </View>
                <Text style={styles.moduleDesc}>Discover and enroll in new professional training courses.</Text>
                <Text style={styles.moduleMeta}>10+ Courses Available</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.accent, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('MyCourses')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="school-outline" size={16} color={COLORS.accent} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>My Courses</Text>
                </View>
                <Text style={styles.moduleDesc}>View and manage all your active and enrolled courses.</Text>
                <Text style={styles.moduleMeta}>4 Enrolled Courses</Text>
              </TouchableOpacity>
            </View>

            {/* Core Study Hub */}
            <Text style={styles.sectionTitle}>Core Study Hub</Text>
            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.danger, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('AssignedCourses')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="clipboard-outline" size={16} color={COLORS.danger} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Assigned Work</Text>
                </View>
                <Text style={styles.moduleDesc}>Mandatory assignments and deadline submissions.</Text>
                <Text style={styles.moduleMeta}>1 Action Required</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.warning, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('ContinueLearning')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="play-circle-outline" size={16} color={COLORS.warning} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Active Lesson</Text>
                </View>
                <Text style={styles.moduleDesc}>Resume your last study session and interactive content.</Text>
                <Text style={styles.moduleMeta}>Active: Lesson 4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.success, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('LearningStatistics')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="bar-chart-outline" size={16} color={COLORS.success} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Analytics Reports</Text>
                </View>
                <Text style={styles.moduleDesc}>Review grades distribution, hours, and study statistics.</Text>
                <Text style={styles.moduleMeta}>Score Avg: 88%</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.succeed, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('UpcomingCertifications')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="trophy-outline" size={16} color={COLORS.succeed} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Certifications</Text>
                </View>
                <Text style={styles.moduleDesc}>Track pending qualifications and view unlocked diplomas.</Text>
                <Text style={styles.moduleMeta}>1 Certificate Earned</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.secondary, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('QuizList')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="checkbox-outline" size={16} color={COLORS.secondary} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Quizzes & Exams</Text>
                </View>
                <Text style={styles.moduleDesc}>Test your knowledge, earn points and claim XP ranks.</Text>
                <Text style={styles.moduleMeta}>3 Quizzes Available</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moduleCard, { borderLeftColor: COLORS.warning, borderLeftWidth: 4 }]}
                onPress={() => navigation.navigate('RecentActivity')}
              >
                <View style={styles.moduleTitleRow}>
                  <Ionicons name="time-outline" size={16} color={COLORS.warning} style={styles.moduleIcon} />
                  <Text style={styles.moduleTitle}>Activity Log</Text>
                </View>
                <Text style={styles.moduleDesc}>Chronological timeline of logins, lessons, and milestones.</Text>
                <Text style={styles.moduleMeta}>Updated 2h ago</Text>
              </TouchableOpacity>
            </View>

            {/* Chat Companion */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, paddingHorizontal: 4 }}>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>AI Coach Companion</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AvitaHome')}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.secondary }}>Open Hub →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chatCard}>
              <ScrollView style={styles.chatArea} nestedScrollEnabled>
                {chatHistory.map((chat, index) => (
                  <View
                    key={index}
                    style={[
                      styles.chatBubble,
                      chat.sender === 'user' ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatBubbleText,
                        chat.sender === 'user' ? styles.userBubbleText : styles.aiBubbleText,
                      ]}
                    >
                      {chat.text}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.chatInputRow}>
                <TextInput
                  style={styles.chatInput}
                  placeholder="Ask a question..."
                  placeholderTextColor={COLORS.textLight}
                  value={chatText}
                  onChangeText={setChatText}
                  onSubmitEditing={handleSendChat}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSendChat}>
                  <Ionicons name="send" size={14} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  menuButton: {
    padding: 6,
    marginRight: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  mainGreeting: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  profileAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  bannerSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
  },
  roleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  roleBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    ...SHADOWS.light,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '600',
  },
  adminMenu: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 8,
    ...SHADOWS.light,
  },
  adminMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconEmoji: {
    fontSize: 18,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  menuSub: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  quickStatBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.light,
  },
  quickStatValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  quickStatLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moduleCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  moduleIcon: {
    marginRight: 6,
  },
  moduleTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    flexShrink: 1,
  },
  moduleDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 14,
  },
  moduleMeta: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 10,
    fontWeight: '700',
  },
  chatCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...SHADOWS.light,
    height: 220,
    marginBottom: 20,
  },
  chatArea: {
    flex: 1,
    padding: 16,
  },
  chatBubble: {
    maxWidth: '80%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  aiBubble: {
    backgroundColor: '#EDF2F7',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  chatBubbleText: {
    fontSize: 12,
    lineHeight: 16,
  },
  aiBubbleText: {
    color: COLORS.textDark,
  },
  userBubbleText: {
    color: COLORS.white,
  },
  chatInputRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  chatInput: {
    flex: 1,
    height: 38,
    backgroundColor: COLORS.white,
    borderRadius: 19,
    paddingHorizontal: 15,
    fontSize: 12,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: COLORS.primary,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
