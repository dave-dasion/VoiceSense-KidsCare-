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

export default function TechnicalQuestionsScreen({ navigation }: any) {
  const [node, setNode] = useState<'question' | 'success' | 'fail'>('question');
  const [feedback, setFeedback] = useState<string>('');

  const handleChoice = (choice: 'correct' | 'wrong') => {
    if (choice === 'wrong') {
      setFeedback("Incorrect. Restarting servers hourly is not a valid scaling policy and violates enterprise SLA guarantees.");
      setNode('fail');
    } else {
      setFeedback("Correct! Emphasizing message queues (RabbitMQ) and autoscaling Kubernetes nodes satisfies IT architects.");
      setNode('success');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Technical Objection Q&A</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Scenario Header */}
        <View style={styles.statusBox}>
          <Ionicons name="construct" size={24} color={COLORS.secondary} style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.statusTitle}>IT Security Architecture Review</Text>
            <Text style={styles.statusSubtitle}>Client: Tech Logistics Corp</Text>
          </View>
        </View>

        {/* Question dialog */}
        {node === 'question' && (
          <View style={styles.dialogCard}>
            <Text style={styles.speakerLabel}>IT Director:</Text>
            <Text style={styles.quote}>
              "During peak sales periods, our daily ingestion volumes jump by 10x. How do you prevent API timeouts and model bottleneck crashes?"
            </Text>

            <Text style={styles.choiceTitle}>Select the correct response:</Text>

            <TouchableOpacity style={styles.choiceBtn} onPress={() => handleChoice('wrong')}>
              <Text style={styles.choiceText}>
                "We manually run a cron job to reboot the ingestion server nodes every hour to flush the GPU cache." (Unstable setup)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.choiceBtn} onPress={() => handleChoice('correct')}>
              <Text style={styles.choiceText}>
                "We buffer incoming webhooks via RabbitMQ queues. Kubernetes then autoscales GPU replica pods based on queue length thresholds." (Scalable architecture)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Feedback display */}
        {feedback !== '' && (
          <View style={[styles.feedbackPanel, node === 'fail' ? styles.panelWrong : styles.panelCorrect]}>
            <Ionicons
              name={node === 'fail' ? "close-circle" : "checkmark-circle"}
              size={36}
              color={node === 'fail' ? COLORS.danger : COLORS.success}
              style={{ marginBottom: 10 }}
            />
            <Text style={[styles.feedbackText, node === 'fail' ? styles.textWrong : styles.textCorrect]}>
              {feedback}
            </Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => { setNode('question'); setFeedback(''); }}
            >
              <Text style={styles.retryText}>Restart Scenario</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BusinessQuestions')}
        >
          <Text style={styles.nextButtonText}>Proceed to Business Q&A</Text>
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
  statusBox: {
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
  statusTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statusSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  dialogCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
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
  quote: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  choiceTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  choiceBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  feedbackPanel: {
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  panelCorrect: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  panelWrong: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  feedbackText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  textCorrect: {
    color: '#22543D',
  },
  textWrong: {
    color: '#9B2C2C',
  },
  retryBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: COLORS.white,
    fontSize: 11,
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
