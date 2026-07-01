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

export default function WordExercisesScreen({ navigation }: any) {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  const checkCompletion = () => {
    if (step1Done && step2Done && step3Done) {
      Alert.alert('Congratulations!', 'You successfully configured all layout and styling specifications.');
    } else {
      Alert.alert('Incomplete', 'Please check off all formatting instructions before finishing.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Word Exercises</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Guided Office Document Formatting</Text>
          <Text style={styles.infoBody}>
            Follow the steps below to prepare a business memorandum. Read each layout specification and check it off once completed.
          </Text>
        </View>

        {/* Task Checklist */}
        <Text style={styles.sectionTitle}>Formatting checklist:</Text>

        {/* Step 1 */}
        <TouchableOpacity
          style={[styles.taskCard, step1Done && styles.taskCardDone]}
          onPress={() => setStep1Done(!step1Done)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, step1Done && styles.checkboxSelected]}>
            {step1Done && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
          </View>
          <View style={styles.taskTextContainer}>
            <Text style={[styles.taskLabel, step1Done && styles.taskLabelDone]}>
              Step 1: Set Layout Margins & Orientation
            </Text>
            <Text style={styles.taskDesc}>
              Configure your page to Portrait orientation with 1-inch (Normal) margins on all sides.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Step 2 */}
        <TouchableOpacity
          style={[styles.taskCard, step2Done && styles.taskCardDone]}
          onPress={() => setStep2Done(!step2Done)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, step2Done && styles.checkboxSelected]}>
            {step2Done && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
          </View>
          <View style={styles.taskTextContainer}>
            <Text style={[styles.taskLabel, step2Done && styles.taskLabelDone]}>
              Step 2: Enforce Typography Styles
            </Text>
            <Text style={styles.taskDesc}>
              Set heading font-weight to Bold and apply 1.15 line spacing across the document paragraphs.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Step 3 */}
        <TouchableOpacity
          style={[styles.taskCard, step3Done && styles.taskCardDone]}
          onPress={() => setStep3Done(!step3Done)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, step3Done && styles.checkboxSelected]}>
            {step3Done && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
          </View>
          <View style={styles.taskTextContainer}>
            <Text style={[styles.taskLabel, step3Done && styles.taskLabelDone]}>
              Step 3: Insert Review Comments
            </Text>
            <Text style={styles.taskDesc}>
              Add review comments in the reviewing pane advising co-authors to verify pricing numbers before publication.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Finish CTA */}
        {step1Done && step2Done && step3Done ? (
          <TouchableOpacity style={styles.finishBtn} onPress={checkCompletion}>
            <Text style={styles.finishBtnText}>Finish Exercise</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.disabledBtn}>
            <Text style={styles.disabledBtnText}>Complete all steps to finish</Text>
          </View>
        )}

        {(step1Done && step2Done && step3Done) && (
          <TouchableOpacity
            style={[styles.finishBtn, { backgroundColor: COLORS.success, marginTop: 12 }]}
            onPress={() => navigation.navigate('WordAssessment')}
          >
            <Text style={styles.finishBtnText}>Go to Assessment</Text>
            <Ionicons name="ribbon-outline" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
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
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  infoBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  taskCardDone: {
    borderColor: COLORS.success,
    backgroundColor: '#FAFDFB',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  taskLabelDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  taskDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 3,
  },
  finishBtn: {
    backgroundColor: COLORS.secondary,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
    ...SHADOWS.light,
  },
  finishBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  disabledBtn: {
    backgroundColor: '#E2E8F0',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  disabledBtnText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '700',
  },
});
