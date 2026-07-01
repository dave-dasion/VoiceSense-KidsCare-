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

interface TrustFactor {
  id: string;
  title: string;
  isPositive: boolean;
}

export default function RelationshipBuildingScreen({ navigation }: any) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const factors: TrustFactor[] = [
    { id: 'notes', title: 'Send personalized call notes within 2 hours of contact.', isPositive: true },
    { id: 'value', title: 'Provide free, low-friction guide templates without pitching.', isPositive: true },
    { id: 'hype', title: 'Over-promise software deliverables to close deals early.', isPositive: false },
    { id: 'news', title: 'Reference recent company news articles in discussion.', isPositive: true },
    { id: 'push', title: 'Spam prospect daily with phone calls to force response.', isPositive: false },
  ];

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const getRapportScore = () => {
    let score = 50; // baseline
    checkedIds.forEach((id) => {
      const f = factors.find((item) => item.id === id);
      if (f) {
        if (f.isPositive) score += 15;
        else score -= 20;
      }
    });
    return Math.max(0, Math.min(score, 100));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Relationship Building</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Long-term Trust Accumulation</Text>
          <Text style={styles.cardBody}>
            High-value enterprise sales cycles average 3-6 months. Securing deals requires consistent trust building. Avoid pushy sales behaviors or exaggerating product performance metrics.
          </Text>
        </View>

        {/* Builder Simulator */}
        <Text style={styles.sectionTitle}>Trust Activity Checklist</Text>
        <Text style={styles.sectionSubtitle}>Select the outreach touchpoints to schedule for your prospect account:</Text>

        <View style={styles.checklistPanel}>
          {factors.map((f) => {
            const isChecked = checkedIds.includes(f.id);
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.checkRow, isChecked && styles.checkRowActive]}
                onPress={() => toggleCheck(f.id)}
              >
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={20}
                  color={isChecked ? COLORS.secondary : COLORS.textLight}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.checkText}>{f.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Score display */}
        <View style={styles.scorePanel}>
          <Text style={styles.scoreTitle}>Account Relationship Trust Score</Text>
          <Text style={[styles.scoreNumber, { color: getRapportScore() >= 80 ? COLORS.success : getRapportScore() >= 50 ? COLORS.warning : COLORS.danger }]}>
            {getRapportScore()}%
          </Text>
          <Text style={styles.scoreDesc}>
            {getRapportScore() >= 80
              ? "Excellent account alignment. Your activities establish authority and maintain trust."
              : getRapportScore() >= 50
              ? "Moderate alignment. Be careful not to rush relationships or overuse high-pressure tactics."
              : "Toxic alignment. Spamming or exaggerating capabilities will lead to active blacklisting."}
          </Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('CommunicationPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Communication Practice</Text>
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
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  checklistPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  checkRowActive: {
    backgroundColor: '#FAFDFB',
  },
  checkText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  scorePanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  scoreTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
    fontFamily: FONTS.bold,
  },
  scoreDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
