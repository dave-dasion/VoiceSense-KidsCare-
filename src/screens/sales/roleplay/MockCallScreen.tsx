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

export default function MockCallScreen({ navigation }: any) {
  const [node, setNode] = useState<'intro' | 'pain' | 'calendar' | 'success' | 'fail'>('intro');
  const [feedback, setFeedback] = useState<string>('');

  const handleChoice = (currentNode: string, choice: 'correct' | 'wrong') => {
    if (choice === 'wrong') {
      setFeedback("That response triggered client resistance. Rushing features or aggressive language caused a hang up.");
      setNode('fail');
      return;
    }

    if (currentNode === 'intro') {
      setFeedback("Great pitch! Stating value quickly and respecting their calendar constraint kept the call active.");
      setNode('pain');
    } else if (currentNode === 'pain') {
      setFeedback("Excellent active listening. Echoing the manual log pain and offering a simple solution secured interest.");
      setNode('calendar');
    } else if (currentNode === 'calendar') {
      setFeedback("Perfect. Meeting details locked in and calendar invite dispatched.");
      setNode('success');
    }
  };

  const restartCall = () => {
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
        <Text style={styles.headerTitle}>1. Mock Discovery Call</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Call Status Header */}
        <View style={styles.callStatusBox}>
          <Ionicons name="call" size={24} color={COLORS.success} style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.callTitle}>Active Cold Call Simulator</Text>
            <Text style={styles.callSubtitle}>Target: Mark (Director of Fleet Operations)</Text>
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
            <Text style={styles.speakerLabel}>Mark (Director):</Text>
            <Text style={styles.dialogQuote}>
              "Hi, this is Mark. I have about 3 minutes before my daily fleet routing sync. What's this about?"
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('intro', 'wrong')}>
              <Text style={styles.optionText}>
                "We built a logistics platform with full cloud integration. Let me walk you through our 40-slide presentation." (Feature dump)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('intro', 'correct')}>
              <Text style={styles.optionText}>
                "I'll be super brief. We help medical fleets cut route delays by 20%. Knowing you have a meeting, can we book 10 minutes next Tuesday?" (Stated value + Respects time)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {node === 'pain' && (
          <View style={styles.dialogPanel}>
            <Text style={styles.speakerLabel}>Mark (Director):</Text>
            <Text style={styles.dialogQuote}>
              "We actually manage everything using manual spreadsheet driver check-in logs. It takes time but it gets the job done."
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('pain', 'correct')}>
              <Text style={styles.optionText}>
                "Manual check-ins typically cost dispatchers 10 hours weekly. If we can show you a one-click check-in driver template, would that save time?" (Echoes pain + Value mapping)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('pain', 'wrong')}>
              <Text style={styles.optionText}>
                "Manual spreadsheets are incredibly outdated. You are wasting thousands of dollars using Excel." (Insults client methodology)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {node === 'calendar' && (
          <View style={styles.dialogPanel}>
            <Text style={styles.speakerLabel}>Mark (Director):</Text>
            <Text style={styles.dialogQuote}>
              "Alright, that check-in automation does sound interesting. Go ahead and put something on my calendar for Tuesday at 2 PM."
            </Text>
            <Text style={styles.optionLabel}>Choose your response:</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('calendar', 'correct')}>
              <Text style={styles.optionText}>
                "Perfect. I am sending the calendar invite to your inbox now. Have a great fleet routing sync!" (Locks meeting + Ends call)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleChoice('calendar', 'wrong')}>
              <Text style={styles.optionText}>
                "Great! Wait, before you go, let me ask you about your regional tax invoice configuration settings first." (Over-complicates and violates timing contract)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Fail State */}
        {node === 'fail' && (
          <View style={styles.failPanel}>
            <Ionicons name="close-circle" size={48} color={COLORS.danger} />
            <Text style={styles.failTitle}>Call Disconnected (Hang Up)</Text>
            <TouchableOpacity style={styles.restartBtn} onPress={restartCall}>
              <Text style={styles.restartBtnText}>Restart Call</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Success State */}
        {node === 'success' && (
          <View style={styles.successPanel}>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
            <Text style={styles.successTitle}>Meeting Secured!</Text>
            <Text style={styles.successDesc}>
              Fantastic work. You successfully booked a qualified discovery call with a fleet decision-maker.
            </Text>
            <TouchableOpacity style={styles.restartBtn} onPress={restartCall}>
              <Text style={styles.restartBtnText}>Practice Call Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('MockNegotiation')}
        >
          <Text style={styles.nextButtonText}>Proceed to Mock Negotiation</Text>
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
