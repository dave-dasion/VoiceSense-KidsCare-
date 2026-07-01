import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function MultiChannelOutreachScreen({ navigation }: any) {
  const [day1, setDay1] = useState<string>('');
  const [day3, setDay3] = useState<string>('');
  const [day5, setDay5] = useState<string>('');
  const [day8, setDay8] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const channels = ['Email', 'Phone Call', 'LinkedIn Connect', 'Wait/Nurture'];

  const checkSequence = () => {
    if (!day1 || !day3 || !day5 || !day8) {
      Alert.alert('Incomplete', 'Please assign an outreach action for all days.');
      return;
    }
    setSubmitted(true);
  };

  const getSequenceReport = () => {
    // Check if they start with connection, then follow up
    const isSoftStart = day1 === 'LinkedIn Connect';
    const hasEmail = day3 === 'Email' || day5 === 'Email';
    const hasCall = day3 === 'Phone Call' || day5 === 'Phone Call';
    const isNurtureEnd = day8 === 'Wait/Nurture' || day8 === 'Email';

    if (isSoftStart && hasEmail && hasCall && isNurtureEnd) {
      return {
        label: 'Optimized Sequence Layout (100% Score)',
        desc: 'Perfect balance! Starting with a soft LinkedIn touch establishes familiarity. Following up with value email and follow-up phone calls ensures multi-channel coverage without spamming.',
        color: COLORS.success,
      };
    } else {
      return {
        label: 'Sub-Optimal Sequence Layout (50% Score)',
        desc: 'Make sure you start with a low-friction connection request (like LinkedIn), mix both phone calls and emails to expand channel coverage, and insert rest periods to avoid fatiguing your prospect.',
        color: COLORS.warning,
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Sequence Schedulers</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Cadence Scheduling</Text>
          <Text style={styles.cardBody}>
            Prospects require multiple touches across various channels before responding. A high-conversion cadence coordinates LinkedIn connection points, email updates, and voice calls to increase reply probability.
          </Text>
        </View>

        {/* Sequence Designer Simulator */}
        <Text style={styles.sectionTitle}>Interactive Sequence Designer</Text>
        <Text style={styles.sectionSubtitle}>Select the outreach action for each step of your pipeline cadence:</Text>

        <View style={styles.designerPanel}>
          {/* Day 1 */}
          <Text style={styles.dayLabel}>Day 1: Initial Touch</Text>
          <View style={styles.channelRow}>
            {channels.map((ch) => (
              <TouchableOpacity
                key={ch}
                style={[styles.chanBtn, day1 === ch && styles.chanBtnActive]}
                onPress={() => { setDay1(ch); setSubmitted(false); }}
              >
                <Text style={[styles.chanText, day1 === ch && styles.chanTextActive]}>{ch}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Day 3 */}
          <Text style={styles.dayLabel}>Day 3: Follow-Up Touch</Text>
          <View style={styles.channelRow}>
            {channels.map((ch) => (
              <TouchableOpacity
                key={ch}
                style={[styles.chanBtn, day3 === ch && styles.chanBtnActive]}
                onPress={() => { setDay3(ch); setSubmitted(false); }}
              >
                <Text style={[styles.chanText, day3 === ch && styles.chanTextActive]}>{ch}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Day 5 */}
          <Text style={styles.dayLabel}>Day 5: Verification Touch</Text>
          <View style={styles.channelRow}>
            {channels.map((ch) => (
              <TouchableOpacity
                key={ch}
                style={[styles.chanBtn, day5 === ch && styles.chanBtnActive]}
                onPress={() => { setDay5(ch); setSubmitted(false); }}
              >
                <Text style={[styles.chanText, day5 === ch && styles.chanTextActive]}>{ch}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Day 8 */}
          <Text style={styles.dayLabel}>Day 8: Nurture Pivot</Text>
          <View style={styles.channelRow}>
            {channels.map((ch) => (
              <TouchableOpacity
                key={ch}
                style={[styles.chanBtn, day8 === ch && styles.chanBtnActive]}
                onPress={() => { setDay8(ch); setSubmitted(false); }}
              >
                <Text style={[styles.chanText, day8 === ch && styles.chanTextActive]}>{ch}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.checkBtn} onPress={checkSequence}>
            <Text style={styles.checkText}>Analyze Cadence Quality</Text>
          </TouchableOpacity>
        </View>

        {/* Report Card */}
        {submitted && (
          <View style={styles.reportPanel}>
            <Text style={styles.reportHeader}>Sequence Quality Report</Text>
            <Text style={[styles.reportTitle, { color: getSequenceReport().color }]}>
              {getSequenceReport().label}
            </Text>
            <Text style={styles.reportDesc}>{getSequenceReport().desc}</Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('OutreachPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Practice Exercise</Text>
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
  designerPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 4,
  },
  channelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chanBtn: {
    height: 30,
    backgroundColor: '#EDF2F7',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chanBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
  },
  chanText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  chanTextActive: {
    color: COLORS.secondary,
  },
  checkBtn: {
    backgroundColor: COLORS.secondary,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.light,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  reportPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  reportHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginVertical: 4,
  },
  reportDesc: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
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
