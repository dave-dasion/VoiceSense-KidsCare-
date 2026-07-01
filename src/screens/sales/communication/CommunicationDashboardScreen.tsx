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

export default function CommunicationDashboardScreen({ navigation }: any) {
  const steps = [
    {
      id: 'professional',
      number: '1',
      title: 'Professional Communication',
      desc: 'Clarity, structural pacing, and tone parameters in phone discussions.',
      screen: 'ProfessionalCommunication',
    },
    {
      id: 'etiquette',
      number: '2',
      title: 'Business Etiquette',
      desc: 'Corporate conversation boundaries, vocabulary protocols, and compliance.',
      screen: 'BusinessEtiquette',
    },
    {
      id: 'listening',
      number: '3',
      title: 'Active Listening',
      desc: 'Speech decoding challenges, clarifying requests, and echoing client needs.',
      screen: 'ActiveListening',
    },
    {
      id: 'relationship',
      number: '4',
      title: 'Relationship Building',
      desc: 'Establish personal connection timelines and coordinate trust score builder lists.',
      screen: 'RelationshipBuilding',
    },
    {
      id: 'practice',
      number: '5',
      title: 'Communication Practice',
      desc: 'Real-time pitch evaluations and structured conversation audits.',
      screen: 'CommunicationPractice',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SalesHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communication Skills</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Establish Professional Trust</Text>
          <Text style={styles.introText}>
            Pacing your voice, following standard business etiquette, practicing active echoing, and building professional rapport helps unlock client accounts.
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
