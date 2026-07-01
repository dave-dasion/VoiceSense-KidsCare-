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

export default function DiscoveryQuestionsScreen({ navigation }: any) {
  const [q1, setQ1] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const checkSorting = () => {
    if (!q1 || !q2 || !q3) return;
    setSubmitted(true);
  };

  const getScore = () => {
    let pts = 0;
    if (q1 === 'Closed') pts += 33;
    if (q2 === 'Open') pts += 33;
    if (q3 === 'Probing') pts += 34;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Question Sorter</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Question Types in Discovery</Text>
          <Text style={styles.cardBody}>
            Active discovery balances three question types:{"\n"}
            1. **Closed**: Simple data collection ("How many drivers?").{"\n"}
            2. **Open-ended**: Explores feelings, workflow, and pain ("What happens when...").{"\n"}
            3. **Probing**: Drills into specific numbers or details ("Can you break down...").
          </Text>
        </View>

        {/* Sorting Game */}
        <Text style={styles.sectionTitle}>Question Sorter Challenge</Text>
        <Text style={styles.sectionSubtitle}>Classify each of the sales questions below:</Text>

        {/* Question 1 */}
        <View style={styles.sortCard}>
          <Text style={styles.questionText}>"How many dispatch hubs do you currently operate?"</Text>
          <View style={styles.btnRow}>
            {['Open', 'Probing', 'Closed'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.sortBtn, q1 === type && styles.sortBtnActive]}
                onPress={() => { setQ1(type); setSubmitted(false); }}
              >
                <Text style={styles.sortBtnText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 2 */}
        <View style={styles.sortCard}>
          <Text style={styles.questionText}>"What happens when a route goes offline? How does that impact customer satisfaction?"</Text>
          <View style={styles.btnRow}>
            {['Open', 'Probing', 'Closed'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.sortBtn, q2 === type && styles.sortBtnActive]}
                onPress={() => { setQ2(type); setSubmitted(false); }}
              >
                <Text style={styles.sortBtnText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 3 */}
        <View style={styles.sortCard}>
          <Text style={styles.questionText}>"You mentioned losing $4,000 monthly due to route errors. Can you break down where those losses occur?"</Text>
          <View style={styles.btnRow}>
            {['Open', 'Probing', 'Closed'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.sortBtn, q3 === type && styles.sortBtnActive]}
                onPress={() => { setQ3(type); setSubmitted(false); }}
              >
                <Text style={styles.sortBtnText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!q1 || !q2 || !q3) && styles.submitBtnDisabled]}
            disabled={!q1 || !q2 || !q3}
            onPress={checkSorting}
          >
            <Text style={styles.submitBtnText}>Verify Classifications</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Sorter Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - **"How many hubs?"** is a **Closed** question (simple data point).{"\n"}
              - **"What happens when...?"** is an **Open-ended** question (explores process & impact).{"\n"}
              - **"Can you break down...?"** is a **Probing** question (digs deeper into an identified issue).
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setQ1(''); setQ2(''); setQ3(''); }}>
              <Text style={styles.resetText}>Reset Sorter</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('PainPointIdentification')}
        >
          <Text style={styles.nextButtonText}>Proceed to Pain Mapping</Text>
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
  sortCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  questionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 17,
    marginBottom: 12,
  },
  btnRow: {
    flexDirection: 'row',
  },
  sortBtn: {
    flex: 1,
    height: 32,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  sortBtnText: {
    fontSize: 10,
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
