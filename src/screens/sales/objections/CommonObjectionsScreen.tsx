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

interface Flashcard {
  id: string;
  objection: string;
  strategy: string;
  response: string;
}

export default function CommonObjectionsScreen({ navigation }: any) {
  const [activeCardId, setActiveCardId] = useState<string>('');
  const [flipped, setFlipped] = useState(false);

  const cards: Flashcard[] = [
    {
      id: 'price',
      objection: '"Your software is too expensive. We don\'t have budget."',
      strategy: "Pivot from Cost to Waste savings. Highlight the gap cost.",
      response: "Compare their manual labor waste ($3,000/mo) against your software fee ($500/mo) to prove the system pays for itself.",
    },
    {
      id: 'time',
      objection: '"We don\'t have time to onboard or train our operators now."',
      strategy: "Minimize friction. Highlight simple onboarding setup timelines.",
      response: "Show them our quick 2-hour onboarding checklist. The 160 manual dispatch hours saved monthly immediately covers the setup time.",
    },
    {
      id: 'need',
      objection: '"Our manual excel sheets work fine. We don\'t need automation."',
      strategy: "Highlight hidden administrative risks and audit liabilities.",
      response: "Explain that manual bookkeeping risks severe regional compliance tax fines during corporate audits.",
    },
  ];

  const handleSelectCard = (id: string) => {
    setActiveCardId(id);
    setFlipped(false);
  };

  const currentCard = cards.find((c) => c.id === activeCardId);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Objection Cards</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Reframing Objections</Text>
          <Text style={styles.cardBody}>
            When a buyer says "too expensive" or "no time," they are really saying: "I don't see enough value yet to justify the cost/effort." Reframe objections by showing the cost of inaction.
          </Text>
        </View>

        {/* Selection buttons */}
        <Text style={styles.sectionTitle}>Objection Selector</Text>
        <Text style={styles.sectionSubtitle}>Select an objection to inspect its resolution strategy:</Text>

        <View style={styles.cardGrid}>
          {cards.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.selectBtn,
                activeCardId === c.id && styles.selectBtnActive,
              ]}
              onPress={() => handleSelectCard(c.id)}
            >
              <Text style={[styles.selectBtnText, activeCardId === c.id && styles.selectBtnTextActive]}>
                {c.id.toUpperCase()} OBJECTION
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Flashcard container */}
        {currentCard ? (
          <View style={styles.flashcardContainer}>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => setFlipped(!flipped)}
              activeOpacity={0.9}
            >
              {!flipped ? (
                <View style={styles.cardFront}>
                  <Ionicons name="help-circle-outline" size={36} color={COLORS.secondary} style={{ marginBottom: 12 }} />
                  <Text style={styles.cardLabel}>The Objection:</Text>
                  <Text style={styles.cardObjectionText}>{currentCard.objection}</Text>
                  <Text style={styles.tapText}>Tap Card to Flip & Reveal Response</Text>
                </View>
              ) : (
                <View style={styles.cardBack}>
                  <Ionicons name="bulb-outline" size={36} color={COLORS.success} style={{ marginBottom: 12 }} />
                  <Text style={styles.cardLabel}>Pivot Strategy:</Text>
                  <Text style={styles.strategyText}>{currentCard.strategy}</Text>
                  <Text style={styles.cardLabel}>Suggested Script Response:</Text>
                  <Text style={styles.responseText}>"{currentCard.response}"</Text>
                  <Text style={styles.tapText}>Tap to View Objection Statement</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholderCard}>
            <Ionicons name="chatbubbles-outline" size={36} color={COLORS.border} />
            <Text style={styles.placeholderText}>Select an objection card above to practice reframing.</Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ResponseTechniques')}
        >
          <Text style={styles.nextButtonText}>Proceed to Response Techniques (LAER)</Text>
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
  cardGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectBtn: {
    flex: 1,
    height: 38,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  selectBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  selectBtnTextActive: {
    color: COLORS.secondary,
  },
  flashcardContainer: {
    marginBottom: 24,
  },
  cardBox: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 220,
    padding: 20,
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  cardFront: {
    alignItems: 'center',
  },
  cardBack: {
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardObjectionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 14,
  },
  strategyText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 10,
  },
  responseText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  tapText: {
    fontSize: 10,
    color: COLORS.textLight,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 6,
  },
  placeholderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
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
