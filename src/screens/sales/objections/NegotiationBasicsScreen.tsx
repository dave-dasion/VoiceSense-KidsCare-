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

export default function NegotiationBasicsScreen({ navigation }: any) {
  const [concessions, setConcessions] = useState<Record<string, string>>({
    price: '',
    sla: '',
    payment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (key: string, rank: string) => {
    if (submitted) return;
    setConcessions({
      ...concessions,
      [key]: rank,
    });
  };

  const getScore = () => {
    let pts = 0;
    // Price discount = Last Resort
    if (concessions.price === 'Last Resort') pts += 34;
    // Custom SLA = Medium Priority
    if (concessions.sla === 'Medium Priority') pts += 33;
    // Extended payment window = First Line
    if (concessions.payment === 'First Line') pts += 33;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Negotiation Concessions</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Concession Prioritization</Text>
          <Text style={styles.cardBody}>
            Negotiation is an exchange of value. Never give a concession without getting one in return ("If you can sign by Thursday, we can extend billing terms"). Rank concessions to protect profit margins.
          </Text>
        </View>

        {/* Priority Sorter */}
        <Text style={styles.sectionTitle}>Concession Strategy Sorter</Text>
        <Text style={styles.sectionSubtitle}>Assign priority rankings to the concessions below:</Text>

        {/* Price discount */}
        <View style={styles.concessionCard}>
          <Text style={styles.conTitle}>Concession A: "Give 20% price discount on annual license fee."</Text>
          <View style={styles.rankRow}>
            {['First Line', 'Medium Priority', 'Last Resort'].map((rank) => (
              <TouchableOpacity
                key={rank}
                style={[styles.rankBtn, concessions.price === rank && styles.rankBtnActive]}
                onPress={() => handleSelect('price', rank)}
              >
                <Text style={styles.rankBtnText}>{rank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom SLA */}
        <View style={styles.concessionCard}>
          <Text style={styles.conTitle}>Concession B: "Offer a custom 1-hour critical response SLA."</Text>
          <View style={styles.rankRow}>
            {['First Line', 'Medium Priority', 'Last Resort'].map((rank) => (
              <TouchableOpacity
                key={rank}
                style={[styles.rankBtn, concessions.sla === rank && styles.rankBtnActive]}
                onPress={() => handleSelect('sla', rank)}
              >
                <Text style={styles.rankBtnText}>{rank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Extended payment */}
        <View style={styles.concessionCard}>
          <Text style={styles.conTitle}>Concession C: "Extend billing invoice window from 30 days to 60 days."</Text>
          <View style={styles.rankRow}>
            {['First Line', 'Medium Priority', 'Last Resort'].map((rank) => (
              <TouchableOpacity
                key={rank}
                style={[styles.rankBtn, concessions.payment === rank && styles.rankBtnActive]}
                onPress={() => handleSelect('payment', rank)}
              >
                <Text style={styles.rankBtnText}>{rank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!concessions.price || !concessions.sla || !concessions.payment) && styles.submitBtnDisabled]}
            disabled={!concessions.price || !concessions.sla || !concessions.payment}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Verify Strategy Quality</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Concession Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - **Price Discounts** must be a **Last Resort**. Discounting too early devalues your software in the buyer's eyes.{"\n"}
              - **Extended billing windows** (60 days) are a great **First Line** concession; they cost you nothing but help corporate accountants manage cash flow.{"\n"}
              - **Custom SLAs** fall into **Medium Priority** because they require operational support resource allocation.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setConcessions({ price: '', sla: '', payment: '' }); }}>
              <Text style={styles.resetText}>Reset Sorter</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ObjectionPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Objection Practice</Text>
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
  concessionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  conTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 17,
    marginBottom: 12,
  },
  rankRow: {
    flexDirection: 'row',
  },
  rankBtn: {
    flex: 1,
    height: 32,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  rankBtnText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  feedbackPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  feedbackDesc: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  resetBtn: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textDecorationLine: 'underline',
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
