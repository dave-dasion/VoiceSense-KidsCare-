import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleTriggerScreen({ navigation }: any) {
  const [frequency, setFrequency] = useState<'minute' | 'hourly' | 'daily' | 'weekly' | 'cron'>('daily');
  const [cronExpression, setCronExpression] = useState('0 9 * * 1-5');
  const [timezone, setTimezone] = useState('GMT -5:00 (EST)');
  const [excludeHolidays, setExcludeHolidays] = useState(false);
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true);

  const handleSave = () => {
    Alert.alert('Trigger Saved', 'Schedule configuration has been saved. Next run is queued.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleTestTrigger = () => {
    Alert.alert('Testing Schedule', 'Executing a mock cron run now. Payload: { triggeredBy: "Scheduler", timestamp: 1782907270 }');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configure Schedule</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestTrigger}>
          <Text style={styles.testBtnText}>Test</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Frequency Row */}
        <Text style={styles.sectionTitle}>Execution Frequency</Text>
        <View style={styles.freqContainer}>
          {(['minute', 'hourly', 'daily', 'weekly', 'cron'] as const).map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[styles.freqBadge, frequency === freq && styles.freqBadgeActive]}
              onPress={() => setFrequency(freq)}
            >
              <Text style={[styles.freqText, frequency === freq && styles.freqTextActive]}>
                {freq.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Frequency Detail inputs */}
        {frequency === 'cron' ? (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Custom Cron Expression</Text>
            <TextInput
              style={styles.inputField}
              value={cronExpression}
              onChangeText={setCronExpression}
              placeholder="e.g. 0 9 * * 1-5"
              placeholderTextColor={COLORS.textLight}
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Standard cron syntax. This matches 09:00 AM, Monday through Friday.
            </Text>
          </View>
        ) : (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Execution Time</Text>
            <View style={styles.rowInputs}>
              <View style={styles.timeWrapper}>
                <Ionicons name="time-outline" size={18} color={COLORS.textLight} style={{ marginRight: 6 }} />
                <Text style={styles.timeValueText}>09:00 AM</Text>
              </View>
              {frequency === 'weekly' && (
                <View style={[styles.timeWrapper, { marginLeft: 12 }]}>
                  <Text style={styles.timeValueText}>Mon, Wed, Fri</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Timezone Selection details */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Time Zone</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Select timezone', 'Timezone lists coming soon.')}
          >
            <Text style={styles.dropdownText}>{timezone}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Condition Switches */}
        <Text style={styles.sectionTitle}>Holiday & Constraints</Text>
        
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Business Hours Only</Text>
            <Text style={styles.switchSub}>Only trigger between 09:00 AM and 05:00 PM.</Text>
          </View>
          <Switch
            value={businessHoursOnly}
            onValueChange={setBusinessHoursOnly}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Exclude National Holidays</Text>
            <Text style={styles.switchSub}>Ignore scheduled executions falling on holidays.</Text>
          </View>
          <Switch
            value={excludeHolidays}
            onValueChange={setExcludeHolidays}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        {/* Next Run schedule summary preview */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Next Run Schedule Preview</Text>
          <View style={styles.previewStep}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.secondary} style={{ marginRight: 8 }} />
            <Text style={styles.previewText}>Run 1: Tomorrow, 09:00:00 AM EST</Text>
          </View>
          <View style={[styles.previewStep, { marginTop: 6 }]}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.secondary} style={{ marginRight: 8 }} />
            <Text style={styles.previewText}>Run 2: Friday, July 3rd, 09:00:00 AM EST</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Schedule Trigger</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  testBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.cardBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  testBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  freqContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  freqBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.cardBg,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  freqBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  freqText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  freqTextActive: {
    color: COLORS.white,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  inputField: {
    height: 48,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  helperText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 6,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  timeValueText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 12,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  switchSub: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  previewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginTop: 12,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  previewStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  saveBtn: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
