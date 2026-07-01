import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function BusinessDocumentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'Letter' | 'Memo'>('Letter');

  const letterStructure = [
    { label: 'Sender Address', desc: 'Your details at the top right or left side.', icon: 'home-outline' },
    { label: 'Date', desc: 'Clearly written full date (e.g. October 24, 2026).', icon: 'calendar-outline' },
    { label: 'Recipient Address', desc: 'Official title and delivery address.', icon: 'mail-open-outline' },
    { label: 'Salutation', desc: 'Formal opening (e.g., Dear Mr. Smith or To Whom It May Concern).', icon: 'chatbox-outline' },
    { label: 'Body Paragraphs', desc: 'Clear, concise purpose followed by call-to-action details.', icon: 'text-outline' },
    { label: 'Sign-off & Closing', desc: 'Professional closing (Yours sincerely, Warm regards) followed by signature.', icon: 'create-outline' },
  ];

  const memoStructure = [
    { label: 'TO Field', desc: 'Specifies the target audience or individuals.', icon: 'person-outline' },
    { label: 'FROM Field', desc: 'Identifies the sender and their official title.', icon: 'business-outline' },
    { label: 'DATE Field', desc: 'Date of release for record keeping.', icon: 'time-outline' },
    { label: 'SUBJECT Field', desc: 'A short, descriptive headline describing the memo contents.', icon: 'bookmark-outline' },
    { label: 'Body Statement', desc: 'The core announcement, instruction, or policy update.', icon: 'alert-circle-outline' },
  ];

  const currentStructure = activeTab === 'Letter' ? letterStructure : memoStructure;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Business Documents</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Structuring Professional Content</Text>
          <Text style={styles.cardBody}>
            Business documents must follow precise structures to maintain legal, formal, and corporate compliance.
          </Text>
          <Text style={styles.cardBody}>
            A <Text style={{ fontWeight: '800' }}>Formal Letter</Text> is external-facing and contains full postal addresses. A <Text style={{ fontWeight: '800' }}>Memo</Text> is internal-facing, brief, and is headed by a TO/FROM block.
          </Text>
        </View>

        {/* Tab Control */}
        <Text style={styles.sectionTitle}>Tap to Inspect Layout Formats</Text>
        <View style={styles.tabContainer}>
          {(['Letter', 'Memo'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab === 'Letter' ? 'Formal Business Letter' : 'Internal Memo'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Structure Roadmap */}
        {currentStructure.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepIconContainer}>
                <Ionicons name={step.icon as any} size={16} color={COLORS.secondary} />
              </View>
              <Text style={styles.stepLabel}>{step.label}</Text>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Part {index + 1}</Text>
              </View>
            </View>
            <Text style={styles.stepDesc}>{step.desc}</Text>
          </View>
        ))}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Templates')}
        >
          <Text style={styles.nextButtonText}>Proceed to Templates</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
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
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.secondary,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1,
  },
  stepBadge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginLeft: 38,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
