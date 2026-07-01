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

export default function FAQScreen({ navigation }: any) {
  const [expandedId, setExpandedId] = useState<string | null>('handwriting');

  const faqs = [
    {
      id: 'handwriting',
      q: "✍️ Does the model support handwriting OCR extraction?",
      a: "Yes. The transformer visual embeddings parse hand-printed clinical margin notes with 89% character-level accuracy.",
    },
    {
      id: 'timeframe',
      q: "⏱️ What is the typical setup timeframe?",
      a: "Managed Cloud APIs are active instantly. Private dedicated VPC Docker clusters require 2 hours to 1 day for network routing and script checks.",
    },
    {
      id: 'limits',
      q: "📊 Are there transaction scaling limits?",
      a: "Standard platforms process up to 100,000 pages per day. Custom enterprise GPU pipelines scale beyond 1 Million documents daily.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AIProductHub')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Product FAQs</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Handling Standard Queries</Text>
          <Text style={styles.cardBody}>
            Prospects ask similar questions during initial calls. Memorize these standard FAQ answers to present prompt technical validation:
          </Text>
        </View>

        {/* FAQ list */}
        <Text style={styles.sectionTitle}>Collapsible FAQ Guide</Text>
        
        {faqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => setExpandedId(isOpen ? null : faq.id)}
              >
                <Text style={styles.faqQuestion}>{faq.q}</Text>
                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={COLORS.textLight} />
              </TouchableOpacity>
              {isOpen && (
                <View style={styles.faqBody}>
                  <Text style={styles.faqAnswer}>{faq.a}</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('TechnicalQuestions')}
        >
          <Text style={styles.nextButtonText}>Proceed to Technical Q&A</Text>
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
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 0.95,
  },
  faqBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    backgroundColor: '#FAFDFB',
  },
  faqAnswer: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
