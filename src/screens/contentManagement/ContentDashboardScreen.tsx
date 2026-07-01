import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CMS_COURSES, MOCK_CMS_MEDIA, MOCK_APPROVAL_ITEMS } from './mockContentData';

export default function ContentDashboardScreen({ navigation }: any) {
  
  const cmsActions = [
    {
      title: 'Course Builder',
      desc: 'Create and structure course headers, categories, and tags.',
      icon: 'journal-outline',
      color: COLORS.primary,
      route: 'CourseBuilder',
    },
    {
      title: 'Lesson Builder',
      desc: 'Compose lesson contents, markdown layouts, and text.',
      icon: 'document-text-outline',
      color: COLORS.secondary,
      route: 'LessonBuilder',
    },
    {
      title: 'Quiz Builder',
      desc: 'Add assessment questions, incorrect options, and critiques.',
      icon: 'checkbox-outline',
      color: COLORS.accent,
      route: 'QuizBuilder',
    },
    {
      title: 'Media Library',
      desc: 'Upload, manage, and audit clinical diagrams, guides, or videos.',
      icon: 'images-outline',
      color: COLORS.warning,
      route: 'MediaLibrary',
    },
    {
      title: 'Content Approvals',
      desc: 'Review, approve, or reject pending submissions from staff.',
      icon: 'checkmark-circle-outline',
      color: COLORS.danger,
      route: 'ContentApproval',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Content Manager</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>CMS Hub Portal</Text>
          <Text style={styles.introBody}>
            Manage learning resources, draft assessment quizzes, upload instructional media files, and audit pending staff submissions.
          </Text>
        </View>

        {/* Stats Summary */}
        <Text style={styles.sectionTitle}>Library Metrics</Text>
        <View style={styles.statsRow}>
          
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{MOCK_CMS_COURSES.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: COLORS.danger }]}>{MOCK_APPROVAL_ITEMS.length}</Text>
            <Text style={styles.statLabel}>Pending Approvals</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{MOCK_CMS_MEDIA.length}</Text>
            <Text style={styles.statLabel}>Media Files</Text>
          </View>

        </View>

        {/* CMS Builders List */}
        <Text style={styles.sectionTitle}>Publishing & Builders Tools</Text>
        {cmsActions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.actionCard, { borderLeftColor: action.color, borderLeftWidth: 4 }]}
            onPress={() => navigation.navigate(action.route)}
          >
            <View style={styles.actionHeader}>
              <View style={[styles.iconBg, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon as any} size={22} color={action.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{action.title}</Text>
                <Text style={styles.cardDesc}>{action.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
            </View>
          </TouchableOpacity>
        ))}

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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  introTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  introBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  statLabel: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    marginTop: 2,
    fontWeight: '500',
  },
});
