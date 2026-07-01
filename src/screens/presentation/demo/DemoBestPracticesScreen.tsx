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

export default function DemoBestPracticesScreen({ navigation }: any) {
  const [activeCardId, setActiveCardId] = useState<string>('sample');

  const cards = [
    {
      id: 'sample',
      title: '📂 Use Real Document Templates',
      desc: 'Generic invoices fail to wow buyers. Request sample files from the prospect team beforehand and upload them live during the presentation.',
    },
    {
      id: 'cursor',
      title: '🖱️ Standardize Cursor Speeds',
      desc: 'Avoid frantic mouse clicking and chaotic scrolling. Keep cursor movements slow, steady, and hover deliberate to prevent screen nausea.',
    },
    {
      id: 'outcome',
      title: '📈 Highlight Outcomes, Not Code',
      desc: 'Do not drill down into raw JSON lines or OCR coordinate vectors. Showcase the business benefits: automated database population and hourly savings.',
    },
  ];

  const active = cards.find((c) => c.id === activeCardId) || cards[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Demo Best Practices</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Interactive Flashcards</Text>
          <Text style={styles.cardBody}>
            Review the top demonstration rules. Select a flashcard topic below to review presentation guidelines:
          </Text>
        </View>

        {/* Card Selectors */}
        {cards.map((c) => {
          const isActive = c.id === activeCardId;
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.conceptBtn, isActive && styles.conceptBtnActive]}
              onPress={() => setActiveCardId(c.id)}
            >
              <Text style={[styles.conceptTitle, isActive && styles.conceptTitleActive]}>{c.title}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Guideline Detail Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsHeader}>Presentation Guideline</Text>
          <Text style={styles.detailsBody}>{active.desc}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DemoPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Demo Practice Quiz</Text>
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
  conceptBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    ...SHADOWS.light,
  },
  conceptBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '05',
    borderWidth: 1.5,
  },
  conceptTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  conceptTitleActive: {
    color: COLORS.secondary,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 14,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  detailsBody: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
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
