import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ExcelExercisesScreen({ navigation }: any) {
  const [q1Input, setQ1Input] = useState('');
  const [q2Input, setQ2Input] = useState('');
  const [q1Solved, setQ1Solved] = useState(false);
  const [q2Solved, setQ2Solved] = useState(false);
  const [showQ1Hint, setShowQ1Hint] = useState(false);
  const [showQ2Hint, setShowQ2Hint] = useState(false);

  const checkQ1 = () => {
    const formatInput = q1Input.replace(/\s+/g, '').toUpperCase();
    if (formatInput === '=B2+C2' || formatInput === '=C2+B2') {
      setQ1Solved(true);
      Alert.alert('Correct!', 'Awesome! You successfully entered a reference addition formula.');
    } else {
      Alert.alert('Incorrect', "Try again. Remember formulas start with '=' and use uppercase cell letters.");
    }
  };

  const checkQ2 = () => {
    const formatInput = q2Input.replace(/\s+/g, '').toUpperCase();
    if (formatInput.startsWith('=AVERAGE(') && formatInput.endsWith(')')) {
      const range = formatInput.substring(9, formatInput.length - 1);
      if (range === 'B2:B5' || range === 'B2,B3,B4,B5' || range === 'B5:B2') {
        setQ2Solved(true);
        Alert.alert('Correct!', 'Perfect! You successfully wrote the AVERAGE range function.');
        return;
      }
    }
    Alert.alert('Incorrect', "Try again. Hint: Write '=AVERAGE(start_cell:end_cell)'");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Excel Exercises</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Practice Challenges</Text>
          <Text style={styles.infoBody}>
            Apply your knowledge of formulas and functions. Solve the challenges below by typing the exact formula into the input bars.
          </Text>
        </View>

        {/* Exercise 1 */}
        <View style={[styles.exerciseCard, q1Solved && styles.solvedCard]}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>Challenge 1: Basic Addition</Text>
            {q1Solved && <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />}
          </View>
          <Text style={styles.exerciseDesc}>
            Write a formula to add the contents of cell <Text style={{ fontWeight: '800' }}>B2</Text> and cell <Text style={{ fontWeight: '800' }}>C2</Text> together.
          </Text>

          <TextInput
            style={[styles.inputField, q1Solved && styles.solvedInputField]}
            value={q1Input}
            onChangeText={setQ1Input}
            placeholder="Type your formula here (e.g. =A1+A2)"
            placeholderTextColor={COLORS.textLight}
            editable={!q1Solved}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {!q1Solved && (
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => setShowQ1Hint(!showQ1Hint)} style={styles.hintBtn}>
                <Text style={styles.hintBtnText}>{showQ1Hint ? 'Hide Hint' : 'Show Hint'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={checkQ1} style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Check Answer</Text>
              </TouchableOpacity>
            </View>
          )}

          {showQ1Hint && !q1Solved && (
            <Text style={styles.hintText}>
              Hint: Start with an equals sign (=), then specify the first cell, the plus operator (+), and the second cell. Keep it in uppercase: =B2+C2.
            </Text>
          )}
        </View>

        {/* Exercise 2 */}
        <View style={[styles.exerciseCard, q2Solved && styles.solvedCard]}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>Challenge 2: Average Range</Text>
            {q2Solved && <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />}
          </View>
          <Text style={styles.exerciseDesc}>
            Write a function to calculate the average value of the range starting at cell <Text style={{ fontWeight: '800' }}>B2</Text> through cell <Text style={{ fontWeight: '800' }}>B5</Text>.
          </Text>

          <TextInput
            style={[styles.inputField, q2Solved && styles.solvedInputField]}
            value={q2Input}
            onChangeText={setQ2Input}
            placeholder="Type your function here (e.g. =SUM(A1:A5))"
            placeholderTextColor={COLORS.textLight}
            editable={!q2Solved}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {!q2Solved && (
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => setShowQ2Hint(!showQ2Hint)} style={styles.hintBtn}>
                <Text style={styles.hintBtnText}>{showQ2Hint ? 'Hide Hint' : 'Show Hint'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={checkQ2} style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Check Answer</Text>
              </TouchableOpacity>
            </View>
          )}

          {showQ2Hint && !q2Solved && (
            <Text style={styles.hintText}>
              Hint: Use the built-in AVERAGE function. Use a colon (:) to define the range from B2 to B5: =AVERAGE(B2:B5).
            </Text>
          )}
        </View>

        {/* Finish CTA */}
        {(q1Solved && q2Solved) && (
          <TouchableOpacity
            style={styles.finishBtn}
            onPress={() => navigation.navigate('ExcelAssessment')}
          >
            <Text style={styles.finishBtnText}>Go to Excel Assessment</Text>
            <Ionicons name="trophy-outline" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
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
  exerciseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  solvedCard: {
    borderColor: COLORS.success,
    backgroundColor: '#FAFDFB',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  exerciseDesc: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 12,
  },
  inputField: {
    height: 44,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: 'System',
    marginBottom: 12,
  },
  solvedInputField: {
    backgroundColor: '#E6FFFA',
    color: COLORS.success,
    borderColor: COLORS.success,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hintBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  hintBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  hintText: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginTop: 10,
    backgroundColor: '#F7FAFC',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
  },
  finishBtn: {
    backgroundColor: COLORS.success,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    ...SHADOWS.light,
  },
  finishBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
