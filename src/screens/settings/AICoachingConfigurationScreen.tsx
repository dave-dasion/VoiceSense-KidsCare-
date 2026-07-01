import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_AI_COACH_CONFIG, AICoachConfig } from './mockSettingsData';

export default function AICoachingConfigurationScreen({ navigation }: any) {
  const [coachingTone, setCoachingTone] = useState<AICoachConfig['coachingTone']>(DEFAULT_AI_COACH_CONFIG.coachingTone);
  const [modelName, setModelName] = useState(DEFAULT_AI_COACH_CONFIG.llmModelName);
  const [verbosity, setVerbosity] = useState<AICoachConfig['feedbackVerbosity']>(DEFAULT_AI_COACH_CONFIG.feedbackVerbosity);

  const tones: AICoachConfig['coachingTone'][] = ['Friendly', 'Professional', 'Rigorous'];
  const verbosities: AICoachConfig['feedbackVerbosity'][] = ['Short', 'Detailed', 'Comprehensive'];

  const handleSave = () => {
    Alert.alert('AI Settings Saved', 'Avita model configuration updated successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Coach Config</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Coaching Tone */}
        <Text style={styles.label}>Coaching Temperament Tone</Text>
        <View style={styles.selectorRow}>
          {tones.map((t) => {
            const isSelected = coachingTone === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.selectorBtn, isSelected && styles.selectorBtnSelected]}
                onPress={() => setCoachingTone(t)}
              >
                <Text style={[styles.selectorText, isSelected && styles.selectorTextSelected]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Model Selection */}
        <Text style={styles.label}>LLM Engine Model</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. gpt-4o-care"
          value={modelName}
          onChangeText={setModelName}
        />
        <Text style={styles.subtext}>Specific LLM model routing caregiver replies.</Text>

        {/* Verbosity Mode */}
        <Text style={styles.label}>Feedback Verbosity Mode</Text>
        <View style={styles.selectorRow}>
          {verbosities.map((v) => {
            const isSelected = verbosity === v;
            return (
              <TouchableOpacity
                key={v}
                style={[styles.selectorBtn, isSelected && styles.selectorBtnSelected]}
                onPress={() => setVerbosity(v)}
              >
                <Text style={[styles.selectorText, isSelected && styles.selectorTextSelected]}>
                  {v}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
  saveBtn: {
    padding: 6,
  },
  saveBtnText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
    marginTop: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectorBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  selectorBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  selectorText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  selectorTextSelected: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 12.5,
    color: COLORS.textDark,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 16,
  },
});
