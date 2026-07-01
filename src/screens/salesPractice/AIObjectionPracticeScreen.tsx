import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { OBJECTION_CHALLENGES } from './mockSalesPracticeData';

export default function AIObjectionPracticeScreen({ navigation }: any) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const challenge = OBJECTION_CHALLENGES[currentIdx];

  const handleSelectOption = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent double taps
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentIdx < OBJECTION_CHALLENGES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0); // Cycle back
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Objection Drill</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Progress Tracker */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Challenge {currentIdx + 1} of {OBJECTION_CHALLENGES.length}
          </Text>
          <Text style={styles.categoryBadge}>{challenge.category}</Text>
        </View>

        {/* Objection Card */}
        <View style={styles.objectionCard}>
          <View style={styles.quoteRow}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.objectionText}>{challenge.objectionText}</Text>
            <Text style={styles.quoteMark}>”</Text>
          </View>
          <Text style={styles.cardInstruction}>How would you de-escalate this concern?</Text>
        </View>

        {/* Multiple Choice Options */}
        <View style={styles.optionsContainer}>
          {challenge.bestResponses.map((response, index) => {
            const isCorrect = index === challenge.correctAnswerIndex;
            const isSelected = index === selectedAnswer;

            let cardStyle: any = styles.optionBtn;
            let iconName: any = 'ellipse-outline';
            let iconColor = COLORS.border;
            let textColor = COLORS.textDark;

            if (selectedAnswer !== null) {
              if (isCorrect) {
                cardStyle = [styles.optionBtn, styles.optionBtnCorrect];
                iconName = 'checkmark-circle';
                iconColor = COLORS.success;
                textColor = '#22543D';
              } else if (isSelected) {
                cardStyle = [styles.optionBtn, styles.optionBtnWrong];
                iconName = 'close-circle';
                iconColor = COLORS.danger;
                textColor = '#742A2A';
              } else {
                cardStyle = [styles.optionBtn, styles.optionBtnDisabled];
                textColor = COLORS.textLight;
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={cardStyle}
                onPress={() => handleSelectOption(index)}
                disabled={selectedAnswer !== null}
              >
                <Ionicons name={iconName} size={22} color={iconColor} style={{ marginRight: 12 }} />
                <Text style={[styles.optionText, { color: textColor }]}>{response}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation Block */}
        {showExplanation && (
          <View style={[
            styles.explanationCard,
            selectedAnswer === challenge.correctAnswerIndex ? styles.expCardSuccess : styles.expCardWrong
          ]}>
            <View style={styles.explanationHeader}>
              <Ionicons
                name={selectedAnswer === challenge.correctAnswerIndex ? 'sparkles' : 'alert-circle'}
                size={18}
                color={selectedAnswer === challenge.correctAnswerIndex ? COLORS.success : COLORS.danger}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.explanationTitle}>
                {selectedAnswer === challenge.correctAnswerIndex ? 'Correct Strategy!' : 'Review Strategy'}
              </Text>
            </View>
            <Text style={styles.explanationBody}>{challenge.explanation}</Text>

            <TouchableOpacity style={styles.nextBtn} onPress={handleNextChallenge}>
              <Text style={styles.nextBtnText}>
                {currentIdx < OBJECTION_CHALLENGES.length - 1 ? 'Next Challenge' : 'Restart Drills'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        )}

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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  objectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  quoteRow: {
    flexDirection: 'row',
  },
  quoteMark: {
    fontSize: 32,
    fontWeight: '800',
    color: '#CBD5E0',
    marginTop: -10,
    marginHorizontal: 4,
  },
  objectionText: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardInstruction: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  optionBtnCorrect: {
    borderColor: '#C6F6D5',
    backgroundColor: '#F0FFF4',
  },
  optionBtnWrong: {
    borderColor: '#FED7D7',
    backgroundColor: '#FFF5F5',
  },
  optionBtnDisabled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  optionText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
  },
  explanationCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  expCardSuccess: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  expCardWrong: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  explanationBody: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 17,
    fontWeight: '500',
  },
  nextBtn: {
    height: 38,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
