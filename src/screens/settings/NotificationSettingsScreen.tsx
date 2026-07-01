import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_NOTIFICATION_SETTINGS } from './mockSettingsData';

export default function NotificationSettingsScreen({ navigation }: any) {
  const [pushEnabled, setPushEnabled] = useState(DEFAULT_NOTIFICATION_SETTINGS.pushEnabled);
  const [emailEnabled, setEmailEnabled] = useState(DEFAULT_NOTIFICATION_SETTINGS.emailEnabled);
  const [streakReminders, setStreakReminders] = useState(DEFAULT_NOTIFICATION_SETTINGS.streakReminders);
  const [complianceAlerts, setComplianceAlerts] = useState(DEFAULT_NOTIFICATION_SETTINGS.complianceAlerts);

  const handleSave = () => {
    Alert.alert('Settings Saved', 'Notification thresholds successfully updated!');
  };

  const handleTestAlert = () => {
    Alert.alert(
      'Test Broadcast 🔔',
      'This is a sample clinical compliance notification alert.',
      [{ text: 'Dismiss' }]
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
        <Text style={styles.headerTitle}>Alert Preferences</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Channel Settings</Text>

        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingSub}>Receive updates on mobile device locks</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ true: COLORS.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Email Updates</Text>
              <Text style={styles.settingSub}>Get weekly progress checklists in inbox</Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Learning Alerts</Text>

        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Daily Streak Reminders</Text>
              <Text style={styles.settingSub}>Remind me to complete daily micro-learning before 8 PM</Text>
            </View>
            <Switch
              value={streakReminders}
              onValueChange={setStreakReminders}
              trackColor={{ true: COLORS.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Compliance Expirations</Text>
              <Text style={styles.settingSub}>High-priority alerts for credentials renewing in 30 days</Text>
            </View>
            <Switch
              value={complianceAlerts}
              onValueChange={setComplianceAlerts}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
        </View>

        {/* Test Alert Button */}
        <TouchableOpacity style={styles.testBtn} onPress={handleTestAlert}>
          <Text style={styles.testBtnText}>Dispatch Test Alert Broadcast</Text>
          <Ionicons name="megaphone-outline" size={16} color={COLORS.primary} style={{ marginLeft: 6 }} />
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
  groupCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  settingSub: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
  },
  testBtn: {
    height: 44,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  testBtnText: {
    color: COLORS.primary,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
