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

export default function ActiveListeningScreen({ navigation }: any) {
  const [echo1, setEcho1] = useState<string>('');
  const [echo2, setEcho2] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const checkScore = () => {
    if (!echo1 || !echo2) return;
    setSubmitted(true);
  };

  const getScore = () => {
    let pts = 0;
    if (echo1 === 'driver') pts += 50;
    if (echo2 === 'compliance') pts += 50;
    return pts;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Active Echoing Drill</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Echoing & Validation</Text>
          <Text style={styles.cardBody}>
            Active listening means repeating the prospect's concern in your own words before pitching. It proves you understand their pain and makes them feel heard.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Listening Simulator</Text>
        <Text style={styles.sectionSubtitle}>Choose the response that correctly echoes the prospect's underlying concern:</Text>

        {/* Client Quote 1 */}
        <View style={styles.quoteCard}>
          <Text style={styles.speakerLabel}>Client Statement A:</Text>
          <Text style={styles.quoteText}>
            "We want to track route updates, but our drivers hate complex apps. If it requires typing or multiple menus, they simply won't use it."
          </Text>
          <Text style={styles.optionLabel}>Choose your Echo Response:</Text>
          <TouchableOpacity
            style={[styles.echoBtn, echo1 === 'feature' && styles.echoBtnActive]}
            onPress={() => { setEcho1('feature'); setSubmitted(false); }}
          >
            <Text style={styles.echoBtnText}>
              "Understood. Our application has GPS map integration, cloud backups, and a dashboard." (Feature dumping - ignores concern)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.echoBtn, echo1 === 'driver' && styles.echoBtnActive]}
            onPress={() => { setEcho1('driver'); setSubmitted(false); }}
          >
            <Text style={styles.echoBtnText}>
              "It sounds like driver adoption and simplicity are key for you. If we show a simple one-click check-in, would that address driver friction?" (Reflective active listening)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Client Quote 2 */}
        <View style={styles.quoteCard}>
          <Text style={styles.speakerLabel}>Client Statement B:</Text>
          <Text style={styles.quoteText}>
            "We have the budget, but our state compliance manager requires all invoices to split regional sales taxes separately."
          </Text>
          <Text style={styles.optionLabel}>Choose your Echo Response:</Text>
          <TouchableOpacity
            style={[styles.echoBtn, echo2 === 'compliance' && styles.echoBtnActive]}
            onPress={() => { setEcho2('compliance'); setSubmitted(false); }}
          >
            <Text style={styles.echoBtnText}>
              "Got it. Custom tax splits are important. We can configure our billing dashboard to generate region-specific compliance invoices." (Reflective active listening)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.echoBtn, echo2 === 'checkout' && styles.echoBtnActive]}
            onPress={() => { setEcho2('checkout'); setSubmitted(false); }}
          >
            <Text style={styles.echoBtnText}>
              "Billing is handled on our checkout page where you can pay by standard credit card." (Weak echo - ignores compliance split request)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!echo1 || !echo2) && styles.submitBtnDisabled]}
            disabled={!echo1 || !echo2}
            onPress={checkScore}
          >
            <Text style={styles.submitBtnText}>Validate Listening Accuracy</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackPanel}>
            <Text style={styles.feedbackTitle}>Echo Score: {getScore()}%</Text>
            <Text style={styles.feedbackDesc}>
              - Echoing A should address **driver adoption**. Focusing on feature lists pushes away prospects who fear complexity.{"\n"}
              - Echoing B must acknowledge the **compliance invoice split**. Solving administrative blockers builds high-trust commercial pipelines.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setEcho1(''); setEcho2(''); }}>
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('RelationshipBuilding')}
        >
          <Text style={styles.nextButtonText}>Proceed to Relationship Building</Text>
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
  quoteCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  speakerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  quoteText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  echoBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  echoBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
  },
  echoBtnText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
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
