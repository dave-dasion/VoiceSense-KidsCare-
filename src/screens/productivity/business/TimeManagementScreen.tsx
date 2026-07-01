import React, { useState, useEffect } from 'react';
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

export default function TimeManagementScreen({ navigation }: any) {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setSecondsLeft(1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Time Management</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Eisenhower Priority Matrix</Text>
          <Text style={styles.cardBody}>
            The Eisenhower Matrix groups daily activities into four quadrants based on urgency and importance:
          </Text>
          <View style={styles.matrixContainer}>
            <View style={styles.matrixRow}>
              <View style={[styles.matrixQuadrant, { backgroundColor: '#FEEBC8' }]}>
                <Text style={styles.quadTitle}>Q1: DO</Text>
                <Text style={styles.quadDesc}>Urgent & Important</Text>
              </View>
              <View style={[styles.matrixQuadrant, { backgroundColor: '#EBF8FF' }]}>
                <Text style={styles.quadTitle}>Q2: SCHEDULE</Text>
                <Text style={styles.quadDesc}>Important, Not Urgent</Text>
              </View>
            </View>
            <View style={styles.matrixRow}>
              <View style={[styles.matrixQuadrant, { backgroundColor: '#E6FFFA' }]}>
                <Text style={styles.quadTitle}>Q3: DELEGATE</Text>
                <Text style={styles.quadDesc}>Urgent, Not Important</Text>
              </View>
              <View style={[styles.matrixQuadrant, { backgroundColor: '#FFF5F5' }]}>
                <Text style={styles.quadTitle}>Q4: ELIMINATE</Text>
                <Text style={styles.quadDesc}>Not Urgent/Important</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pomodoro Timer Simulator */}
        <Text style={styles.sectionTitle}>Interactive Pomodoro Focus Timer</Text>
        <Text style={styles.sectionSubtitle}>
          Use 25-minute intervals followed by 5-minute breaks to maintain focus:
        </Text>

        <View style={styles.timerPanel}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.timerLabel}>Focus Session Timer</Text>
          
          <View style={styles.timerControlRow}>
            <TouchableOpacity style={styles.timerBtn} onPress={toggleTimer}>
              <Ionicons
                name={timerActive ? 'pause-circle-outline' : 'play-circle-outline'}
                size={40}
                color={COLORS.secondary}
              />
              <Text style={styles.timerBtnText}>{timerActive ? 'Pause' : 'Start Focus'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timerBtn} onPress={resetTimer}>
              <Ionicons name="reload-circle-outline" size={40} color={COLORS.textLight} />
              <Text style={styles.timerBtnText}>Reset Session</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('WorkplaceOrganization')}
        >
          <Text style={styles.nextButtonText}>Proceed to Workplace Org</Text>
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
    marginBottom: 14,
  },
  matrixContainer: {
    marginTop: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  matrixQuadrant: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    height: 70,
    justifyContent: 'center',
  },
  quadTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  quadDesc: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 2,
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
  timerPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  timerText: {
    fontSize: 44,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  timerLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  timerControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  timerBtn: {
    alignItems: 'center',
  },
  timerBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 4,
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
