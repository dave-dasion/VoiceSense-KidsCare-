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

export default function MockNegotiationScreen({ navigation }: any) {
  const [node, setNode] = useState<'intro' | 'onboard' | 'agreement' | 'success' | 'fail'>('intro');
  const [feedback, setFeedback] = useState<string>('');

  const handleChoice = (currentNode: string, choice: 'correct' | 'wrong') => {
    if (choice === 'wrong') {
      setFeedback("Negotiation failed. Yielding price discounts instantly or adding high fee hurdles caused the buyer to walk.");
      setNode('fail');
      return;
    }

    if (currentNode === 'intro') {
      setFeedback("Great strategic move! Offering extended billing terms protected contract value while solving accounting concerns.");
      setNode('onboard');
    } else if (currentNode === 'onboard') {
      setFeedback("Perfect. Providing template setup support matches their needs without adding licensing discounts.");
      setNode('agreement');
    } else if (currentNode === 'agreement') {
      setFeedback("Contract finalized! Deal terms sheets signed and locked.");
      setNode('success');
    }
  };

  const restartNego = () => {
    setNode('intro');
    setFeedback('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Mock Negotiation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Call Status Header */}
        <View style={styles.callStatusBox}>
          <Ionicons name="business" size={24} color={COLORS.secondary} style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.callTitle}>Active Negotiation Room</Text>
            <Text style={styles.callSubtitle}>Target: Finance VP & Operations Director</Text>
          </View>
        </View>

        {/* Feedback box */}
        {feedback !== '' && (
          <View style={[styles.feedbackBox, node === 'fail' ? styles.feedbackWrong : styles.feedbackCorrect]}>
            <Text style={[styles.feedbackText, node === 'fail' ? styles.textWrong : styles.textCorrect]}>
              {feedback}
            </Text>
          </View>
        )}

        {/* Dialog bubble */}
        {node === 'intro' && (
          <View style={styles.dialogPanel}>
            <Text style={styles.speakerLabel}>Finance VP:</Text>
            <Text style={styles.dialogQuote}>
              "We like the routing portal, but we need you to match Competitor Y's price of $400/mo. Your quote is $600/mo."
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('intro', 'wrong')}>
              <Text style={styles.optionText}>
                "Okay, we can discount the license price to $400/mo if you sign the order sheet right now." (Immediate price yield)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('intro', 'correct')}>
              <Text style={styles.optionText}>
                "We can extend billing payment terms from 30 to 60 days to help your cash flow, but we must protect the $600/mo rate to support your custom SLA." (Pivots concession)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {node === 'onboard' && (
          <View style={styles.dialogPanel}>
            <Text style={styles.speakerLabel}>Operations Director:</Text>
            <Text style={styles.dialogQuote}>
              "Extended terms help. But who configures our regional invoice tax splits? We don't have developers for setup."
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('onboard', 'correct')}>
              <Text style={styles.optionText}>
                "We include 3 customized onboarding templates to build out your regional split rules during your first month." (Free onboarding value)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('onboard', 'wrong')}>
              <Text style={styles.optionText}>
                "Technical configuration setup requires our engineering staff. We charge a flat $2,500 onboarding integration fee." (Adds price blocker)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {node === 'agreement' && (
          <View style={styles.dialogPanel}>
            <Text style={styles.speakerLabel}>Finance VP:</Text>
            <Text style={styles.dialogQuote}>
              "Fair enough. Send over the final order terms sheet. We'll get this signed and back to you by tomorrow."
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('agreement', 'correct')}>
              <Text style={styles.optionText}>
                "Sending the agreement contract terms now. We are looking forward to automating your dispatch systems!" (Locks order)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('agreement', 'wrong')}>
              <Text style={styles.optionText}>
                "Wait, let me see if I can run this by my manager to verify if we can get you another 5% discount." (Devalues own offering)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Fail State */}
        {node === 'fail' && (
          <View style={styles.failPanel}>
            <Ionicons name="close-circle" size={48} color={COLORS.danger} />
            <Text style={styles.failTitle}>Negotiation Stalled (No Deal)</Text>
            <TouchableOpacity style={styles.restartBtn} onPress={restartNego}>
              <Text style={styles.restartBtnText}>Restart Negotiation</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Success State */}
        {node === 'success' && (
          <View style={styles.successPanel}>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
            <Text style={styles.successTitle}>Deal Closed & Won!</Text>
            <Text style={styles.successDesc}>
              Fantastic negotiation strategy. You defended contract pricing and secured enterprise buy-in.
            </Text>
            <TouchableOpacity style={styles.restartBtn} onPress={restartNego}>
              <Text style={styles.restartBtnText}>Practice Negotiation Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SalesAssessment')}
        >
          <Text style={styles.nextButtonText}>Proceed to Final Sales Assessment</Text>
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
  callStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  callTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  callSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  feedbackBox: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  feedbackWrong: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  feedbackText: {
    fontSize: 11,
    lineHeight: 15,
  },
  textCorrect: {
    color: '#22543D',
  },
  textWrong: {
    color: '#9B2C2C',
  },
  dialogPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  speakerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  dialogQuote: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  optionBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  failPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  failTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.danger,
    marginTop: 12,
    marginBottom: 16,
  },
  successPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.success,
    marginTop: 12,
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    textAlign: 'center',
  },
  restartBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  restartBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
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
