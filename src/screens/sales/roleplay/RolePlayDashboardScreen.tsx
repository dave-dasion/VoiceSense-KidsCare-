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

export default function RolePlayDashboardScreen({ navigation }: any) {
  const steps = [
    {
      id: 'mockcall',
      number: '1',
      title: 'Mock Discovery Call',
      desc: 'Simulate a live telephone conversation with a prospect utilizing conversational nodes.',
      screen: 'MockCall',
    },
    {
      id: 'mocknego',
      number: '2',
      title: 'Mock Negotiation Session',
      desc: 'Practice trade-offs and handle aggressive discount demands.',
      screen: 'MockNegotiation',
    },
    {
      id: 'assessment',
      number: '3',
      title: 'Final Sales Assessment',
      desc: 'Final test covering prospecting, discovery, objections, and follow-up.',
      screen: 'SalesAssessment',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SalesHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Role Play</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Interactive Performance Arena</Text>
          <Text style={styles.introText}>
            Test your pitch, discovery, active echoing, and objection handling skills under simulated sales calls and client negotiations.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Syllabus Roadmap</Text>

        {steps.map((step) => (
          <TouchableOpacity
            key={step.id}
            style={styles.stepCard}
            onPress={() => navigation.navigate(step.screen)}
          >
            <View style={styles.stepNumBadge}>
              <Text style={styles.stepNumText}>{step.number}</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
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
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  introText: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  stepCard: {
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
  stepNumBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  stepInfo: {
    flex: 1,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 2,
  },
});
