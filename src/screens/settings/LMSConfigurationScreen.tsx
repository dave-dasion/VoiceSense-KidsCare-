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
import { DEFAULT_LMS_CONFIG } from './mockSettingsData';

export default function LMSConfigurationScreen({ navigation }: any) {
  const [passingScore, setPassingScore] = useState(DEFAULT_LMS_CONFIG.passingScore.toString());
  const [attemptsLimit, setAttemptsLimit] = useState(DEFAULT_LMS_CONFIG.maxQuizAttempts.toString());
  const [renewalInterval, setRenewalInterval] = useState(DEFAULT_LMS_CONFIG.autoRenewIntervalDays.toString());

  const handleSave = () => {
    const score = parseInt(passingScore);
    if (isNaN(score) || score < 50 || score > 100) {
      Alert.alert('Validation Error', 'Passing score must be a number between 50 and 100.');
      return;
    }
    Alert.alert('LMS Config Saved', 'System learning parameters successfully updated!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LMS Configurations</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Course Passing Thresholds</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Passing Score Percentage (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={passingScore}
            onChangeText={setPassingScore}
          />
          <Text style={styles.subtext}>Minimum grade required to unlock badges and credentials.</Text>

          <Text style={styles.label}>Max Quiz Attempts Limit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={attemptsLimit}
            onChangeText={setAttemptsLimit}
          />
          <Text style={styles.subtext}>Number of times a student can retake a certification exam.</Text>
        </View>

        <Text style={styles.sectionTitle}>Compliance Renewal Term</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Auto-Renew Interval (Days)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={renewalInterval}
            onChangeText={setRenewalInterval}
          />
          <Text style={styles.subtext}>Time period after which clinical certificates mark as expiring.</Text>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    marginTop: 18,
    fontFamily: FONTS.bold,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
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
