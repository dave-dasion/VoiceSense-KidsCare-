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

export default function QuizBuilderScreen({ navigation }: any) {
  const [course, setCourse] = useState('');
  const [question, setQuestion] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [critique, setCritique] = useState('');

  const handleSave = () => {
    if (!course.trim() || !question.trim() || !optA.trim() || !optB.trim() || !critique.trim()) {
      Alert.alert('Validation Error', 'Please complete the question, at least options A & B, and the critique.');
      return;
    }
    Alert.alert(
      'Success 🎉',
      'Quiz question successfully compiled!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Builder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Parent Course</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Advanced Dementia Care Practices"
          value={course}
          onChangeText={setCourse}
        />

        <Text style={styles.label}>Question Text</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Write the quiz question here..."
          multiline
          value={question}
          onChangeText={setQuestion}
        />

        {/* Option Inputs */}
        <Text style={styles.label}>Answer Options</Text>
        
        <View style={styles.optionRow}>
          <Text style={styles.optLetter}>A</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Option A"
            value={optA}
            onChangeText={setOptA}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optLetter}>B</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Option B"
            value={optB}
            onChangeText={setOptB}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optLetter}>C</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Option C (Optional)"
            value={optC}
            onChangeText={setOptC}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optLetter}>D</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Option D (Optional)"
            value={optD}
            onChangeText={setOptD}
          />
        </View>

        {/* Correct option selector */}
        <Text style={styles.label}>Correct Option</Text>
        <View style={styles.selectorRow}>
          {(['A', 'B', 'C', 'D'] as const).map((letter) => {
            const isSelected = correctOption === letter;
            return (
              <TouchableOpacity
                key={letter}
                style={[styles.selectorBtn, isSelected && styles.selectorBtnSelected]}
                onPress={() => setCorrectOption(letter)}
              >
                <Text style={[styles.selectorText, isSelected && styles.selectorTextSelected]}>
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Explanation & Critique Rationale</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Explain why the selected option is correct for learning verification..."
          multiline
          numberOfLines={4}
          value={critique}
          onChangeText={setCritique}
        />

        {/* Submit */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Compile Assessment Item</Text>
          <Ionicons name="checkbox-outline" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 16,
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
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optLetter: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    width: 28,
    textAlign: 'center',
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorBtn: {
    flex: 1,
    height: 38,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  saveBtn: {
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    ...SHADOWS.medium,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
