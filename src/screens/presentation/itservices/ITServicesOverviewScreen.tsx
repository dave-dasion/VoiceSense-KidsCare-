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

export default function ITServicesOverviewScreen({ navigation }: any) {
  const lessons = [
    {
      id: 'managed',
      number: '1',
      title: 'Managed Services & Hosting',
      desc: 'Compare cloud, hybrid, and local Docker GPU deployment footprints.',
      screen: 'ManagedServices',
    },
    {
      id: 'workflows',
      number: '2',
      title: 'IT Data Workflows',
      desc: 'Map webhook events to extraction tasks and indexing engines.',
      screen: 'ITWorkflows',
    },
    {
      id: 'solutions',
      number: '3',
      title: 'Technology Proposals',
      desc: 'Build custom integration outlines for enterprise CTO reviews.',
      screen: 'TechnologySolutions',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AIProductHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IT Services Training</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* SLA Card */}
        <View style={styles.slaCard}>
          <Text style={styles.slaTitle}>⚡ Service Level Agreements & Uptime</Text>
          <Text style={styles.slaText}>
            Enterprise IT buyers demand **99.99% system uptime** and latency guarantees. Under standard SLAs, API timeouts exceeding 2 seconds for more than 5 consecutive minutes trigger billing credits.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>IT Training Syllabus</Text>

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
  slaCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    ...SHADOWS.light,
  },
  slaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0369A1',
    marginBottom: 8,
  },
  slaText: {
    fontSize: 12,
    color: '#0369A1',
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
