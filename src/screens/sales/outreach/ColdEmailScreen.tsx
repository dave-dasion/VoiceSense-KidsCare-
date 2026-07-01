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

export default function ColdEmailScreen({ navigation }: any) {
  const [subject, setSubject] = useState<string>('');
  const [hook, setHook] = useState<string>('');
  const [cta, setCta] = useState<string>('');
  const [results, setResults] = useState<{ open: number; reply: number } | null>(null);

  const calculateRates = () => {
    if (!subject || !hook || !cta) return;
    let open = 15; // baseline open rate
    let reply = 2;  // baseline reply rate

    // Subject scoring
    if (subject === 'dispatch') open += 50; // Context based
    else if (subject === 'question') open += 30; // Casual
    else open += 5; // generic

    // Hook scoring
    if (hook === 'context') reply += 15; // context hook
    else reply += 2; // sales pitch

    // CTA scoring
    if (cta === 'light') reply += 10; // Low friction
    else reply += 1; // High commitment

    setResults({
      open: Math.min(open, 100),
      reply: Math.min(reply, 100),
    });
  };

  const handleReset = () => {
    setSubject('');
    setHook('');
    setCta('');
    setResults(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Cold Email Copywriting</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Cold Email Structures</Text>
          <Text style={styles.cardBody}>
            High-converting cold emails are short, personalized, and call-to-actions are simple. Subject lines should look casual, not like promotional ads.
          </Text>
        </View>

        {/* Email Editor Simulator */}
        <Text style={styles.sectionTitle}>Interactive Email Template Editor</Text>
        <Text style={styles.sectionSubtitle}>Select sentences to construct your email pitch:</Text>

        <View style={styles.editorPanel}>
          {/* Subject choice */}
          <Text style={styles.fieldLabel}>Subject Line:</Text>
          <View style={styles.btnColumn}>
            <TouchableOpacity
              style={[styles.choiceBtn, subject === 'dispatch' && styles.choiceBtnActive]}
              onPress={() => { setSubject('dispatch'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Re: Metro hub dispatch bottleneck?" (Context-Based)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, subject === 'question' && styles.choiceBtnActive]}
              onPress={() => { setSubject('question'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Quick question for John" (Casual/Curiosity)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, subject === 'sales' && styles.choiceBtnActive]}
              onPress={() => { setSubject('sales'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Metro logistics software upgrade services" (Pitchy)</Text>
            </TouchableOpacity>
          </View>

          {/* Body Hook choice */}
          <Text style={styles.fieldLabel}>Opening Hook:</Text>
          <View style={styles.btnColumn}>
            <TouchableOpacity
              style={[styles.choiceBtn, hook === 'context' && styles.choiceBtnActive]}
              onPress={() => { setHook('context'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Hi John, noticed Metro opened 3 new dispatch hubs. Typically, expanding fleet size causes routing bottlenecks..."</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, hook === 'intro' && styles.choiceBtnActive]}
              onPress={() => { setHook('intro'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Hi John, I am Alex from Metro Soft. We are the leading logistics provider in North America. Let me explain why..."</Text>
            </TouchableOpacity>
          </View>

          {/* CTA choice */}
          <Text style={styles.fieldLabel}>Call-to-Action (CTA):</Text>
          <View style={styles.btnColumn}>
            <TouchableOpacity
              style={[styles.choiceBtn, cta === 'light' && styles.choiceBtnActive]}
              onPress={() => { setCta('light'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Are you open to checking if this would help streamline dispatch bottlenecks next week?" (Low-friction request)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, cta === 'heavy' && styles.choiceBtnActive]}
              onPress={() => { setCta('heavy'); setResults(null); }}
            >
              <Text style={styles.choiceText}>"Please click this link to schedule a 30-minute product demonstration dashboard review." (High commitment)</Text>
            </TouchableOpacity>
          </View>

          {/* Send Btn */}
          <TouchableOpacity
            style={[styles.sendBtn, (!subject || !hook || !cta) && styles.sendBtnDisabled]}
            disabled={!subject || !hook || !cta}
            onPress={calculateRates}
          >
            <Ionicons name="send" size={14} color={COLORS.white} style={{ marginRight: 8 }} />
            <Text style={styles.sendBtnText}>Submit Pitch to Test Simulator</Text>
          </TouchableOpacity>
        </View>

        {/* Results Panel */}
        {results !== null && (
          <View style={styles.resultsPanel}>
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>{results.open}%</Text>
                <Text style={styles.metricTitle}>Est. Open Rate</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>{results.reply}%</Text>
                <Text style={styles.metricTitle}>Est. Reply Rate</Text>
              </View>
            </View>
            <Text style={styles.critiqueText}>
              {results.reply >= 20
                ? "Excellent draft! Your email combines localized context, soft positioning, and low-friction CTA to invite replies."
                : "Weak performance. Avoid generic headers or aggressive CTAs. Make it easy for them to say yes."}
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Reset Template</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('LinkedInOutreach')}
        >
          <Text style={styles.nextButtonText}>Proceed to LinkedIn Outreach</Text>
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
  editorPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginTop: 10,
  },
  btnColumn: {
    marginBottom: 12,
  },
  choiceBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    backgroundColor: '#F8FAFC',
  },
  choiceBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
  },
  choiceText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
  },
  sendBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    ...SHADOWS.light,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  sendBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  resultsPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  metricTitle: {
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  critiqueText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
    textAlign: 'center',
  },
  resetBtn: {
    alignSelf: 'center',
    marginTop: 14,
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
