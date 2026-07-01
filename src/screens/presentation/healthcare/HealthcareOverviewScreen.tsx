import React from 'react';
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

export default function HealthcareOverviewScreen({ navigation }: any) {
  const lessons = [
    {
      id: 'usecases',
      number: '1',
      title: 'Healthcare Use Cases',
      desc: 'Learn about medical transcription, charting, and intake summaries.',
      screen: 'HealthcareUseCases',
    },
    {
      id: 'workflows',
      number: '2',
      title: 'Clinical Workflows',
      desc: 'Trace patient intake data pipelines with automated coding checks.',
      screen: 'ClinicalWorkflows',
    },
    {
      id: 'scenarios',
      number: '3',
      title: 'Hospital CIO Scenarios',
      desc: 'Practice handling enterprise hospital data security objections.',
      screen: 'HealthcareCustomerScenarios',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AIProductHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Healthcare Solutions</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Compliance Card */}
        <View style={styles.complianceCard}>
          <Text style={styles.complianceTitle}>🏥 HIPAA & PHI Data Standards</Text>
          <Text style={styles.complianceText}>
            Medical operations are bound by HIPAA. Customer data containing Protected Health Information (PHI) must be encrypted at rest (AES-256) and in transit (TLS 1.3) with local tenant partition isolation.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Healthcare syllabus</Text>

        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => navigation.navigate(lesson.screen)}
          >
            <View style={styles.numBadge}>
              <Text style={styles.numText}>{lesson.number}</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDesc}>{lesson.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
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
  complianceCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FED7D7',
    ...SHADOWS.light,
  },
  complianceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9B2C2C',
    marginBottom: 8,
  },
  complianceText: {
    fontSize: 12,
    color: '#9B2C2C',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  numBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  numText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  lessonInfo: {
    flex: 1,
    marginRight: 8,
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  lessonDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 2,
  },
});
