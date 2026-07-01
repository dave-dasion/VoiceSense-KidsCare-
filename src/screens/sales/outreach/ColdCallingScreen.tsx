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

interface DialogNode {
  prospect: string;
  options: {
    text: string;
    score: number;
    feedback: string;
    nextKey: string;
  }[];
}

export default function ColdCallingScreen({ navigation }: any) {
  const [currentNodeKey, setCurrentNodeKey] = useState<string>('start');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedFeedback, setSelectedFeedback] = useState<string>('');

  const script: Record<string, DialogNode> = {
    start: {
      prospect: "John: 'Hello, John speaking.'",
      options: [
        {
          text: "1. 'Hi John, I am calling to pitch you our premium cloud dispatch software.'",
          score: 10,
          feedback: "Pitching too early causes immediate wall-up. Hook permission first.",
          nextKey: 'responseBusy',
        },
        {
          text: "2. 'Hi John, this is Alex from Metro. Did I catch you at a bad time?'",
          score: 50,
          feedback: "Great! Permission-based hooks show respect and lower resistance.",
          nextKey: 'responseHooked',
        },
        {
          text: "3. 'Hey John, hope you are doing well. I want to show you our platform.'",
          score: 20,
          feedback: "Familiar greeting feels like a typical sales script. Avoid generic greetings.",
          nextKey: 'responseBusy',
        },
      ],
    },
    responseBusy: {
      prospect: "John: 'Look, I am really busy right now. I don't buy software over the phone.'",
      options: [
        {
          text: "1. 'It will only take 2 minutes, please listen to my pitch.'",
          score: 10,
          feedback: "Begging for time lowers authority and results in a hang-up.",
          nextKey: 'fail',
        },
        {
          text: "2. 'Understand John. I know you run route dispatches; we cut routing error losses by 20%. I'll send an email. What is your address?'",
          score: 40,
          feedback: "Solid pivot. Transitioning to email preserves the contact opportunity.",
          nextKey: 'successEmail',
        },
      ],
    },
    responseHooked: {
      prospect: "John: 'Well, yes, I am in a meeting soon. What is this regarding?'",
      options: [
        {
          text: "1. 'I want to schedule a 30-minute demo to show you all our features.'",
          score: 20,
          feedback: "Asking for 30 minutes right away is too heavy. Keep initial asks light.",
          nextKey: 'responseBusy',
        },
        {
          text: "2. 'I noticed Metro Logistics recently opened 3 new hubs. Typically, scaling hubs increases dispatch errors by 15%. We help automate that. Do you have 3 minutes next Tuesday?'",
          score: 50,
          feedback: "Excellent value-based hook! Connects recent context with product utility.",
          nextKey: 'successMeeting',
        },
      ],
    },
  };

  const handleSelectOption = (score: number, feedback: string, nextKey: string) => {
    setTotalScore((prev) => prev + score);
    setSelectedFeedback(feedback);
    setCurrentNodeKey(nextKey);
  };

  const handleReset = () => {
    setCurrentNodeKey('start');
    setTotalScore(0);
    setSelectedFeedback('');
  };

  const renderOutcome = () => {
    if (currentNodeKey === 'successMeeting') {
      return (
        <View style={styles.outcomePanel}>
          <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
          <Text style={styles.outcomeTitle}>Outcome: Meeting Booked!</Text>
          <Text style={styles.outcomeDesc}>
            Fantastic! You hooked the prospect with relevance, respected their time, and secured a calendar event.
          </Text>
          <Text style={styles.scoreText}>Call Score: {totalScore} pts</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Restart Call Simulator</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentNodeKey === 'successEmail') {
      return (
        <View style={styles.outcomePanel}>
          <Ionicons name="mail-open" size={48} color={COLORS.warning} />
          <Text style={styles.outcomeTitle}>Outcome: Contact Saved!</Text>
          <Text style={styles.outcomeDesc}>
            Good pivot. When a prospect is busy, securing their direct email allows you to continue nurturing the lead.
          </Text>
          <Text style={styles.scoreText}>Call Score: {totalScore} pts</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Restart Call Simulator</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentNodeKey === 'fail') {
      return (
        <View style={styles.outcomePanel}>
          <Ionicons name="close-circle" size={48} color={COLORS.danger} />
          <Text style={styles.outcomeTitle}>Outcome: Hung Up</Text>
          <Text style={styles.outcomeDesc}>
            The prospect hung up. Avoid pushing too aggressively without stating value or establishing trust early.
          </Text>
          <Text style={styles.scoreText}>Call Score: {totalScore} pts</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Restart Call Simulator</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const node = script[currentNodeKey];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Cold Calling Pitch</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Cold Calling Fundamentals</Text>
          <Text style={styles.cardBody}>
            An effective cold call hook requires: permission to speak, clear context (why call them specifically), and a low-friction ask. Avoid immediate product pitching.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Interactive Phone Pitch Simulator</Text>
        <Text style={styles.sectionSubtitle}>
          The phone is ringing. Pick your statements to guide the discussion:
        </Text>

        {node ? (
          <View style={styles.callPanel}>
            <View style={styles.prospectVoiceBox}>
              <Ionicons name="call" size={16} color={COLORS.secondary} style={{ marginRight: 8 }} />
              <Text style={styles.prospectText}>{node.prospect}</Text>
            </View>

            {selectedFeedback !== '' && (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackText}>{selectedFeedback}</Text>
              </View>
            )}

            <Text style={styles.optionsHeader}>Your Response Options:</Text>
            {node.options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectOption(opt.score, opt.feedback, opt.nextKey)}
              >
                <Text style={styles.optionText}>{opt.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          renderOutcome()
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ColdEmail')}
        >
          <Text style={styles.nextButtonText}>Proceed to Cold Emailing</Text>
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
  callPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  prospectVoiceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  prospectText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
  },
  feedbackBox: {
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BEE3F8',
    marginBottom: 12,
  },
  feedbackText: {
    fontSize: 11,
    color: '#2B6CB0',
    lineHeight: 15,
  },
  optionsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    ...SHADOWS.light,
  },
  optionText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  outcomePanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  outcomeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 6,
  },
  outcomeDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 17,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
    marginTop: 12,
  },
  resetBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  resetText: {
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
